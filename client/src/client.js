import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import './App.css';
import './client.css';

function Client() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const testiRef = useRef(null);
  const [pauseTesti, setPauseTesti] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Client logos from public/Logo-Perusahan
  const logos = [
    { name: 'Acme', file: 'acme.png' },
    { name: 'Nusantara', file: 'Logo_Nusantara.png' },
    { name: 'Garuda', file: 'garuda.png' },
    { name: 'Mandiri', file: 'mandiri.png' },
    { name: 'Sejahtera', file: 'Sejahtera.png' },
    { name: 'Primadata', file: 'primadata.png' },
    { name: 'Orbit', file: 'orbit.png' },
    { name: 'Sentosa', file: 'sentosa.png' },
  ];

  // Testimonials built from the same logo assets
  const testimonials = [
    { name: 'Acme', file: 'acme.png', quote: 'Respon cepat, solusi tepat. KPI digital kami tercapai lebih cepat dari rencana.' },
    { name: 'Nusantara', file: 'Logo_Nusantara.png', quote: 'Traffic organik dan leads meningkat signifikan setelah optimasi website & SEO.' },
    { name: 'Garuda', file: 'garuda.png', quote: 'Pengembangan berjalan mulus. Performa situs dan stabilitas aplikasi meningkat.' },
    { name: 'Mandiri', file: 'mandiri.png', quote: 'Implementasi tepat waktu dengan kualitas tinggi. Komunikasi tim sangat baik.' },
    { name: 'Sejahtera', file: 'Sejahtera.png', quote: 'Antarmuka modern dan cepat. Tim memahami kebutuhan kami dengan akurat.' },
    { name: 'Primadata', file: 'primadata.png', quote: 'Proses internal lebih efisien. Integrasi berjalan mulus tanpa downtime.' },
    { name: 'Orbit', file: 'orbit.png', quote: 'Branding dan UX terasa lebih kuat. Conversion rate naik signifikan.' },
    { name: 'Sentosa', file: 'sentosa.png', quote: 'Kolaborasi menyenangkan dan profesional. Hasil melampaui ekspektasi.' },
  ];
  const visibleTestimonials = testimonials.slice(0, 6);

  // Slideshow: snap-per-card so all testimonials are shown over time
  useEffect(() => {
    const el = testiRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let timer;
    const intervalMs = 3000; // change slide every 3s

    const getStep = () => {
      const cards = el.querySelectorAll('.testimonial');
      if (cards.length < 2) return cards[0]?.getBoundingClientRect().width || el.clientWidth;
      const a = cards[0].getBoundingClientRect();
      const b = cards[1].getBoundingClientRect();
      const delta = Math.round(b.left - a.left) || Math.round(a.width);
      return Math.max(delta, 1);
    };

    const syncIndex = () => {
      const step = getStep();
      const idx = Math.round(el.scrollLeft / step);
      setCurrentSlide(Math.min(idx, testimonials.length - 1));
    };

    const goTo = (idx) => {
      const step = getStep();
      const target = Math.max(0, Math.min(idx, testimonials.length - 1)) * step;
      el.scrollTo({ left: target, behavior: 'smooth' });
      setCurrentSlide(Math.max(0, Math.min(idx, testimonials.length - 1)));
    };

    const goNext = () => {
      if (pauseTesti) return; // paused by hover
      const next = (currentSlide + 1) % testimonials.length;
      goTo(next);
    };

    timer = setInterval(goNext, intervalMs);

    const onResize = () => {
      // align to nearest snap step when resizing
      const step = getStep();
      const aligned = Math.round(el.scrollLeft / step) * step;
      el.scrollLeft = aligned;
      syncIndex();
    };
    const onScroll = () => { syncIndex(); };
    window.addEventListener('resize', onResize);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => { clearInterval(timer); window.removeEventListener('resize', onResize); el.removeEventListener('scroll', onScroll); };
  }, [pauseTesti, currentSlide, testimonials.length]);

  // Reveal on scroll for testimonials with GSAP bounce effect
  useEffect(() => {
    const root = testiRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(root.querySelectorAll('.testimonial'));
    if (!cards.length) return;

    if (prefersReduced) {
      cards.forEach(c => c.classList.add('is-inview'));
      return;
    }

    // Set initial state for GSAP (ensure consistent)
    gsap.set(cards, { opacity: 0, y: 24, scale: 0.94 });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          if (el.dataset.animated === '1') return; // avoid re-animating
          el.dataset.animated = '1';
          el.classList.add('is-inview');
          // Stronger bounce + stagger based on index
          const idx = Number(el.dataset.idx || '0');
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'bounce.out',
            delay: (idx % 5) * 0.06
          });
          io.unobserve(el);
        });
      },
      { root, threshold: 0.2 }
    );
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);

  // Hover bounce for each testimonial card
  const onCardEnter = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    gsap.to(el, { y: -6, scale: 1.04, duration: 0.28, ease: 'bounce.out' });
  };
  const onCardLeave = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
  };

  // Handle ESC key, resize, and lock body scroll for mobile drawer
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    const onResize = () => { if (window.innerWidth >= 901) setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    if (mobileOpen) document.body.classList.add('no-scroll'); else document.body.classList.remove('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('no-scroll');
    };
  }, [mobileOpen]);

  // Close desktop submenu on outside click or ESC
  useEffect(() => {
    const onDocClick = (e) => {
      const nav = document.querySelector('.header .nav');
      if (!nav) return;
      const hasSub = nav.querySelector('li.has-sub');
      if (hasSub && !hasSub.contains(e.target)) setDesktopServicesOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setDesktopServicesOpen(false); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => { if (!mobileOpen) setServicesOpen(false); }, [mobileOpen]);

  return (
    <div className="App client-page">
      <header className="header">
        <div className="logo" aria-label="Cakra Digital Innovation">
          <Link to="/" className="site-logo" aria-label="Beranda">
            <img
              src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation-viewBox-fixed.svg`}
              alt="Cakra Digital Innovation"
              className="site-logo__img"
              decoding="async"
              loading="eager"
            />
            <div className="site-logo__text" aria-label="Cakra Digital Innovation">
              <span className="site-logo__line site-logo__line--top">Cakra Digital</span>
              <span className="site-logo__line site-logo__line--bottom">Innovation</span>
            </div>
          </Link>
        </div>

        <button
          className={`hamburger ${mobileOpen ? 'is-active' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className={`has-sub ${desktopServicesOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="submenu-toggle-desktop"
                aria-expanded={desktopServicesOpen}
                onClick={(e) => { e.stopPropagation(); setDesktopServicesOpen(!desktopServicesOpen); }}
              >
                Layanan
              </button>
              <ul className="submenu">
                <li><Link to="/pricing?tab=website" onClick={() => setDesktopServicesOpen(false)}>Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo" onClick={() => setDesktopServicesOpen(false)}>SEO Bergaransi</Link></li>
                <li><Link to="/consultation" onClick={() => setDesktopServicesOpen(false)}>Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software" onClick={() => setDesktopServicesOpen(false)}>Software Installation</Link></li>
              </ul>
            </li>
            <li><Link to="/tentang">Tentang Kami</Link>
            </li>
            <li>
              <Link to="/client">Client</Link>
            </li>
            <li>
              <Link to="/consultation">Contact</Link>
            </li>
            <li className="mode-item">
              <button
                type="button"
                className="mode-btn"
                aria-label="Toggle light/dark mode"
                title="Toggle theme"
                onClick={() => {
                  const cur = document.documentElement.getAttribute('data-mode') || 'light';
                  const next = cur === 'dark' ? 'light' : 'dark';
                  window.__setAppMode && window.__setAppMode(next);
                }}
              >
                <span className="icon">🌓</span>
              </button>
            </li>
          </ul>
        </nav>

        <div
          id="mobile-nav"
          className={`mobile-nav ${mobileOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target.id === 'mobile-nav') setMobileOpen(false); }}
        >
          <ul>
            <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
            <li className="has-sub">
              <button
                type="button"
                className="submenu-toggle"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Layanan
              </button>
              <ul className={`submenu ${servicesOpen ? 'open' : ''}`}>
                <li><Link to="/pricing?tab=website" onClick={() => setMobileOpen(false)}>Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo" onClick={() => setMobileOpen(false)}>SEO Bergaransi</Link></li>
                <li><Link to="/consultation" onClick={() => setMobileOpen(false)}>Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software" onClick={() => setMobileOpen(false)}>Software Installation</Link></li>
              </ul>
            </li>
            <li><Link to="/tentang" onClick={() => setMobileOpen(false)}>Tentang Kami
            </Link>
            </li>
            <li>
              <Link to="/client" onClick={() => setMobileOpen(false)}>Client
              </Link>
            </li>
            <li><Link to="/consultation" onClick={() => setMobileOpen(false)}>Contact</Link>
            </li>
            <li className="mode-item">
              <button
                type="button"
                className="mode-btn"
                aria-label="Toggle light/dark mode"
                onClick={() => {
                  const cur = document.documentElement.getAttribute('data-mode') || 'light';
                  const next = cur === 'dark' ? 'light' : 'dark';
                  window.__setAppMode && window.__setAppMode(next);
                }}
              >
                <span className="icon">🌓</span>
              </button>
            </li>
          </ul>
        </div>
      </header>

      <main className="client-main">
        <section className="client-hero">
          <div className="client-hero__inner">
            <div className="client-hero__copy">
              <span className="client-eyebrow">Klien & Portofolio</span>
              <h1 className="client-title">Dipercaya Bisnis untuk Solusi Digital Modern</h1>
              <p className="client-subtitle">Kami membantu perusahaan membangun kehadiran online, meningkatkan performa SEO, dan mengoptimalkan proses melalui aplikasi yang tepat.</p>
              <div className="client-cta-row">
                <Link className="c-btn c-btn--primary" to="/consultation">Konsultasi Gratis</Link>
                <Link className="c-btn c-btn--secondary" to="/pricing?tab=website">Lihat Paket</Link>
              </div>
            </div>
            <div className="client-hero__badges">
              <div className="client-badge"><div className="val">50+</div><div className="lbl">Klien Aktif</div></div>
              <div className="client-badge"><div className="val">100%</div><div className="lbl">Proyek Selesai</div></div>
              <div className="client-badge"><div className="val">A+</div><div className="lbl">Kepuasan</div></div>
            </div>
          </div>
          <div className="client-testimonials__dots" role="tablist" aria-label="Posisi slide">
            {visibleTestimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={Math.min(currentSlide, visibleTestimonials.length - 1) === i}
                aria-label={`Slide ${i + 1} dari ${visibleTestimonials.length}`}
                className={"dot" + (Math.min(currentSlide, visibleTestimonials.length - 1) === i ? " is-active" : "")}
                onClick={() => { setPauseTesti(true); const el = testiRef.current; if (!el) return; const step = (()=>{ const cards = el.querySelectorAll('.testimonial'); if(cards.length<2) return cards[0]?.getBoundingClientRect().width || el.clientWidth; const a = cards[0].getBoundingClientRect(); const b = cards[1].getBoundingClientRect(); return Math.max(Math.round(b.left - a.left) || Math.round(a.width),1); })(); el.scrollTo({ left: i * step, behavior: 'smooth' }); setCurrentSlide(i); setTimeout(()=>setPauseTesti(false), 2000); }}
              />
            ))}
            <span className="dot-counter" aria-hidden="true">{Math.min(currentSlide + 1, testimonials.length)}/{testimonials.length}</span>
          </div>
        </section>

        <section className="client-logos" aria-label="Logo Klien">
          <div className="client-logos__marquee" role="region" aria-roledescription="marquee" aria-label="Deretan logo klien">
            <div className="client-logos__track">
              {logos.concat(logos).map((l, i) => (
                <img
                  key={`${l.name}-${i}`}
                  className="client-logo"
                  src={`${process.env.PUBLIC_URL}/Logo-Perusahan/${l.file}`}
                  alt={`${l.name} logo`}
                  title={l.name}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="client-grid" aria-label="Studi Kasus">
          <header className="client-grid__header">
            <h2>Studi Kasus Terpilih</h2>
            <p>Ringkasan hasil dan dampak yang kami berikan.</p>
          </header>
          <div className="client-cards">
            {[
              { title: 'E-Commerce Fashion', desc: 'Peningkatan konversi 28% melalui UX dan optimasi kecepatan.', tag: 'Website' },
              { title: 'Klinik Kesehatan', desc: 'Rank #1 untuk 12 keyword lokal dalam 8 minggu.', tag: 'SEO' },
              { title: 'Distribusi Logistik', desc: 'Aplikasi tracking armada real-time & otomatisasi laporan.', tag: 'Aplikasi' },
              { title: 'Kursus Online', desc: 'Integrasi pembayaran dan LMS kustom, uptime 99.99%.', tag: 'Website' },
            ].map((c, i) => (
              <article key={i} className="client-card">
                <div className="client-card__tag">{c.tag}</div>
                <h3 className="client-card__title">{c.title}</h3>
                <p className="client-card__desc">{c.desc}</p>
                <div className="client-card__actions">
                  <a className="link" href="/consultation">Pelajari</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="client-testimonials" aria-label="Testimoni">
          <header className="client-testimonials__header">
            <h2>Apa Kata Klien</h2>
            <p className="client-testimonials__sub">Dipercaya oleh brand-brand ini</p>
          </header>
          <div
            className="client-testimonials__dots"
            role="tablist"
            aria-label="Posisi slide"
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={currentSlide === i}
                aria-label={`Slide ${i + 1} dari ${testimonials.length}`}
                className={"dot" + (currentSlide === i ? " is-active" : "")}
                onClick={() => { setPauseTesti(true); const el = testiRef.current; if (!el) return; const step = (()=>{ const cards = el.querySelectorAll('.testimonial'); if(cards.length<2) return cards[0]?.getBoundingClientRect().width || el.clientWidth; const a = cards[0].getBoundingClientRect(); const b = cards[1].getBoundingClientRect(); return Math.max(Math.round(b.left - a.left) || Math.round(a.width),1); })(); el.scrollTo({ left: i * step, behavior: 'smooth' }); setCurrentSlide(i); setTimeout(()=>setPauseTesti(false), 2000); }}
              />
            ))}
            <span className="dot-counter" aria-hidden="true">{currentSlide + 1}/{testimonials.length}</span>
          </div>
          <div
            className="client-testimonials__list"
            ref={testiRef}
            onMouseEnter={() => setPauseTesti(true)}
            onMouseLeave={() => setPauseTesti(false)}
            role="list"
            aria-label="Testimoni klien"
          >
            {testimonials.map((t, i) => (
              <figure className="testimonial" key={i} data-idx={i} onMouseEnter={onCardEnter} onMouseLeave={onCardLeave}>
                <div className="testimonial__head">
                  <img
                    className="avatar"
                    src={`${process.env.PUBLIC_URL}/Logo-Perusahan/${t.file}`}
                    alt={`${t.name} logo`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="meta">
                    <div className="company">{t.name}</div>
                    <div className="role">Klien</div>
                  </div>
                  <div className="stars" aria-label="Rating 5 dari 5">★★★★★</div>
                </div>
                <blockquote>“{t.quote}”</blockquote>
              </figure>
            ))}
          </div>
        </section>

        <section className="client-cta">
          <div className="client-cta__inner">
            <h3>Siap tingkatkan performa bisnis Anda?</h3>
            <div className="client-cta__actions">
              <Link className="c-btn c-btn--primary" to="/consultation">Diskusi Gratis</Link>
              <Link className="c-btn c-btn--secondary" to="/pricing?tab=website">Lihat Paket</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" aria-label="Situs Footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Cakra Digital Innovation</h3>
            <p>Solusi digital profesional untuk website dan instalasi software bisnis Anda.</p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Layanan</h4>
              <ul>
                <li><Link to="/pricing?tab=website">Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo">SEO Bergaransi</Link></li>
                <li><Link to="/consultation">Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software">Software Installation</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Navigasi</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="/#services">Layanan</a></li>
                <li><Link to="/consultation">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Kontak</h4>
              <ul className="contact-list">
                <li><a href="mailto:cdiyunoru@gmail.com">cdiyunoru@gmail.com</a></li>
                <li><a href="tel:+6285852345718">+6285852345718</a></li>
                <li>Tangerang Banten, Indonesia</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Berlangganan</h4>
              <form className="newsletter" onSubmit={(e) => e.preventDefault()} aria-label="Form Newsletter">
                <input type="email" placeholder="Email Anda" aria-label="Email" required />
                <button type="submit" className="newsletter-btn">Kirim</button>
              </form>
              <div className="socials" aria-label="Sosial Media">
                <button
                  type="button"
                  className="whatsapp"
                  aria-label="WhatsApp"
                  onClick={(e) => {
                    window.__setAppTheme && window.__setAppTheme('whatsapp');
                    const parent = e.currentTarget.closest('.socials');
                    parent && parent.querySelectorAll('a,button').forEach(el => el.classList.remove('is-active'));
                    e.currentTarget.classList.add('is-active');
                  }}
                >🟢</button>
                <button
                  type="button"
                  className="instagram"
                  aria-label="Instagram"
                  onClick={(e) => {
                    window.__setAppTheme && window.__setAppTheme('instagram');
                    const parent = e.currentTarget.closest('.socials');
                    parent && parent.querySelectorAll('a,button').forEach(el => el.classList.remove('is-active'));
                    e.currentTarget.classList.add('is-active');
                  }}
                >🟣</button>
                <button
                  type="button"
                  className="linkedin"
                  aria-label="LinkedIn"
                  onClick={(e) => {
                    window.__setAppTheme && window.__setAppTheme('linkedin');
                    const parent = e.currentTarget.closest('.socials');
                    parent && parent.querySelectorAll('a,button').forEach(el => el.classList.remove('is-active'));
                    e.currentTarget.classList.add('is-active');
                  }}
                >🔵</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2025 Cakra Digital Innovation</span>
          <div className="legal">
            <a href="/privacy">Kebijakan Privasi</a>
            <span className="dot" aria-hidden>•</span>
            <a href="/terms">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Client;
