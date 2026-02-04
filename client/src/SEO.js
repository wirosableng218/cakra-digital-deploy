import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './Pricing.css';
import './SEO.css';

function SEO() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

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

  const seoPackages = [
    {
      name: 'SEO Starter',
      price: '1.200.000',
      period: 'per bulan',
      features: [
        'Audit SEO dasar',
        'Riset kata kunci (10 keyword)',
        'Optimasi on-page (5 halaman)',
        'Setup Search Console & Analytics',
        'Laporan bulanan',
      ],
      popular: false,
      color: '#16a34a',
    },
    {
      name: 'SEO Pro',
      price: '2.750.000',
      period: 'per bulan',
      features: [
        'Audit teknis lengkap',
        'Riset kata kunci (25 keyword)',
        'Optimasi on-page (15 halaman)',
        'Content plan + 4 artikel/bulan',
        'Backlink outreach ringan',
        'Monitoring & reporting',
      ],
      popular: true,
      color: '#2563eb',
    },
    {
      name: 'SEO Enterprise',
      price: '5.900.000',
      period: 'per bulan',
      features: [
        'Audit teknis mendalam + perbaikan prioritas',
        'Riset kata kunci (50+ keyword)',
        'Optimasi on-page (30+ halaman)',
        'Content plan + 8 artikel/bulan',
        'Backlink outreach menengah',
        'Local SEO + Schema markup',
        'Dedicated account manager',
        'Weekly KPI review',
      ],
      popular: false,
      color: '#f59e0b',
    },
  ];

  return (
    <div className="App">
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
            <li><Link to="/">Home</Link></li>
            <li className={`has-sub ${desktopServicesOpen ? 'open' : ''}`}>
              <button type="button" className="submenu-toggle-desktop" aria-expanded={desktopServicesOpen} onClick={(e) => { e.stopPropagation(); setDesktopServicesOpen(!desktopServicesOpen); }}>Layanan</button>
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
        <div id="mobile-nav" className={`mobile-nav ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true" onClick={(e) => { if (e.target.id === 'mobile-nav') setMobileOpen(false); }}>
          <ul>
            <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
            <li className="has-sub">
              <button type="button" className="submenu-toggle" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}>Layanan</button>
              <ul className={`submenu ${servicesOpen ? 'open' : ''}`}>
                <li><Link to="/pricing?tab=website" onClick={() => setMobileOpen(false)}>Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo" onClick={() => setMobileOpen(false)}>SEO Bergaransi</Link></li>
                <li><Link to="/consultation" onClick={() => setMobileOpen(false)}>Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software" onClick={() => setMobileOpen(false)}>Software Installation</Link></li>
              </ul>
            </li>
            <li><Link to="/tentang" onClick={() => setMobileOpen(false)}>Tentang Kami</Link></li>
            <li><Link to="/consultation" onClick={() => setMobileOpen(false)}>Contact</Link></li>
            <li className="mode-item">
              <button type="button" className="mode-btn" aria-label="Toggle light/dark mode" onClick={() => {
                const cur = document.documentElement.getAttribute('data-mode') || 'light';
                const next = cur === 'dark' ? 'light' : 'dark';
                window.__setAppMode && window.__setAppMode(next);
              }}>
                <span className="icon">🌓</span>
              </button>
            </li>
          </ul>
        </div>
      </header>

      <section className="seo-hero">
        <div className="seo-hero__inner">
          <div className="seo-hero__copy">
            <span className="seo-eyebrow">SEO Bergaransi</span>
            <h1 className="seo-title">Naikkan Ranking & Trafik Organik Secara Terukur</h1>
            <p className="seo-subtitle">Paket SEO modern berfokus pada hasil: riset, eksekusi, dan pelaporan yang transparan.</p>
            <div className="seo-cta-row">
              <Link className="c-btn c-btn--secondary" to="/">Ke Beranda</Link>
              <Link className="c-btn c-btn--primary" to="/consultation">Konsultasi</Link>
            </div>
          </div>
          <div className="seo-hero__stats">
            <div className="seo-stat"><div className="seo-stat__value">A+</div><div className="seo-stat__label">Skor SEO</div></div>
            <div className="seo-stat"><div className="seo-stat__value">100%</div><div className="seo-stat__label">Kepuasan</div></div>
            <div className="seo-stat"><div className="seo-stat__value">24/7</div><div className="seo-stat__label">Support</div></div>
          </div>
        </div>
      </section>

      <section className="seo-pricing">
        <header className="seo-pricing__header">
          <h2>Paket Harga SEO</h2>
          <p>Pilih paket yang sesuai dengan target bisnis Anda</p>
        </header>
        <div className="seo-grid">
          {seoPackages.map((pkg, index) => (
            <div key={index} className={`seo-card ${pkg.popular ? 'is-popular' : ''}`} style={{ '--accent-color': pkg.color }}>
              {pkg.popular && <div className="seo-card__badge">Paling Populer</div>}
              <div className="seo-card__header">
                <h3 className="seo-card__title">{pkg.name}</h3>
                <div className="seo-card__price">
                  <span className="currency">Rp</span>
                  <span className="amount">{pkg.price}</span>
                  <span className="period">/{pkg.period}</span>
                </div>
              </div>
              <ul className="seo-card__features">
                {pkg.features.map((f, i) => (
                  <li key={i} className="feature"><i className="check">✓</i>{f}</li>
                ))}
              </ul>
              <button 
                className="seo-card__cta" 
                onClick={() => {
                  const message = `Halo, saya tertarik dengan paket ${pkg.name}. Mohon informasi lebih lanjut.`;
                  const whatsappUrl = `https://wa.me/6285852345718?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                Pilih Paket Ini
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="seo-benefits">
        <div className="seo-benefits__grid">
          <div className="benefit">
            <div className="benefit__icon">🔎</div>
            <h3 className="benefit__title">Riset & Audit Menyeluruh</h3>
            <p className="benefit__desc">Kupas tuntas hambatan teknis, kompetitor, dan peluang keyword untuk strategi yang tepat sasaran.</p>
          </div>
          <div className="benefit">
            <div className="benefit__icon">⚙️</div>
            <h3 className="benefit__title">Eksekusi On-page & Konten</h3>
            <p className="benefit__desc">Optimasi struktur, konten, dan internal link berorientasi performa serta pengalaman pengguna.</p>
          </div>
          <div className="benefit">
            <div className="benefit__icon">📈</div>
            <h3 className="benefit__title">Laporan Hasil Transparan</h3>
            <p className="benefit__desc">Pantau metrik utama: ranking, trafik, CTR, dan konversi dengan laporan periodik.</p>
          </div>
        </div>
      </section>

      <section className="seo-faq">
        <div className="seo-faq__inner">
          <h2 className="seo-faq__title">Pertanyaan Umum</h2>
          <div className="seo-faq__list">
            <details>
              <summary>Berapa lama hasil SEO terlihat?</summary>
              <p>Biasanya 4–12 minggu untuk perubahan awal pada ranking/impresi. Hasil optimal bergantung pada kompetisi dan kondisi awal website.</p>
            </details>
            <details>
              <summary>Apa arti "bergaransi"?</summary>
              <p>Garansi berupa komitmen perbaikan berkelanjutan. Jika target KPI tidak tercapai, kami lakukan penyesuaian strategi tanpa biaya tambahan di periode berikutnya.</p>
            </details>
            <details>
              <summary>Apakah konten termasuk?</summary>
              <p>Paket Pro/Enterprise termasuk rencana konten dan produksi artikel bulanan sesuai scope paket.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="seo-cta">
        <div className="seo-cta__inner">
          <h3>Ayo mulai tingkatkan trafik organik Anda</h3>
          <div className="seo-cta__actions">
            <Link className="c-btn c-btn--primary" to="/consultation">Diskusi Gratis</Link>
            <Link className="c-btn c-btn--secondary" to="/pricing?tab=website">Lihat Paket Website</Link>
          </div>
        </div>
      </section>

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
                <button type="button" className="whatsapp" aria-label="WhatsApp">🟢</button>
                <button type="button" className="instagram" aria-label="Instagram">🟣</button>
                <button type="button" className="linkedin" aria-label="LinkedIn">🔵</button>
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

export default SEO;
