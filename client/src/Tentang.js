import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './Tentang.css';

function Tentang() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    const onResize = () => { if (window.innerWidth >= 901) setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    if (mobileOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
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

  // Close services submenu when mobile panel closes
  useEffect(() => {
    if (!mobileOpen) setServicesOpen(false);
  }, [mobileOpen]);

  useEffect(() => {
  const theme = document.documentElement.getAttribute('data-theme');
  const footer = document.querySelector('.footer');
  if (!footer) return;
  const buttons = footer.querySelectorAll('.socials button');
  buttons.forEach(b => b.classList.remove('is-active'));
  if (theme) {
    const active = footer.querySelector(`.socials button.${theme}`);
    if (active) active.classList.add('is-active');
  }
}, []);

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
            <li>
              <Link to="/tentang">Tentang Kami</Link>
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
            <li>
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
            </li>
            <li className="has-sub">
              <button type="button" className="submenu-toggle" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}>Layanan</button>
              <ul className={`submenu ${servicesOpen ? 'open' : ''}`}>
                <li><Link to="/pricing?tab=website" onClick={() => setMobileOpen(false)}>Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo" onClick={() => setMobileOpen(false)}>SEO Bergaransi</Link></li>
                <li><Link to="/pricing?tab=apps" onClick={() => setMobileOpen(false)}>Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software" onClick={() => setMobileOpen(false)}>Software Installation</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/tentang" onClick={() => setMobileOpen(false)}>Tentang Kami</Link>
            </li>
            <li>
              <Link to="/client" onClick={() => setMobileOpen(false)}>Client</Link>
            </li>
            <li>
              <Link to="/consultation" onClick={() => setMobileOpen(false)}>Contact</Link>
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

      <main>
        <section className="c-hero about-hero">
  <div className="c-container">
    <div className="c-hero-copy">
      <span className="c-eyebrow">Tentang Kami</span>
      <div className="breadcrumb" aria-label="Breadcrumb">
        {/* opsional: <Link to="/">Home</Link><span className="sep" aria-hidden>/</span><span>Tentang Kami</span> */}
      </div>
    </div>
  </div>
</section>
        <section className="about-welcome">
  <div className="c-container welcome-grid">
    <div className="welcome-copy">
      <h1 className="welcome-title">Selamat Datang di Cakra Digital Innovation</h1>
      <p className="welcome-lead">
        Cakra Digital Innovation adalah perusahaan terkemuka yang bergerak di bidang jasa pembuatan website profesional dan layanan SEO bergaransi.
      </p>
      <p className="welcome-lead">
        Kami berdedikasi untuk membantu bisnis dari berbagai skala dan industri untuk membangun kehadiran digital yang kuat dan efektif. Dengan tim yang terdiri dari para ahli desain, pengembang, dan spesialis SEO, kami menggabungkan kreativitas dengan teknologi mutakhir untuk menciptakan solusi digital yang tidak hanya memenuhi tetapi melampaui harapan klien kami.
      </p>
    </div>
    <div className="welcome-visual" aria-hidden="true">
      <img
        className="welcome-image"
        src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation.svg`}
        alt="Cakra Digital Innovation"
        loading="lazy"
      />
    </div>
  </div>
        </section>
        <section className="team-section" aria-labelledby="team-title">
          <div className="c-container">
            <div className="team-banner">
              <div className="team-banner-left">
                <span className="team-eyebrow">OUR TEAM</span>
                <h2 id="team-title">Tim Profesional Cakra Digital Innovation</h2>
              </div>
              <p className="team-banner-right">
                Tim Cakra Digital Innovation adalah mitra terbaik untuk membangun, mengelola, dan mengembangkan website serta kehadiran digital bisnis Anda.
              </p>
            </div>

            <div className="team-grid">
              <div className="team-card">
                <img src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation.svg`} alt="Tim Marketing" className="team-avatar" loading="lazy" />
                <h3>Tim Marketing</h3>
                <p>Melayani setiap klien dengan layanan online 24 jam.</p>
              </div>
              <div className="team-card">
                <img src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation.svg`} alt="Tim Web Design" className="team-avatar" loading="lazy" />
                <h3>Tim Web Design</h3>
                <p>Merancang website dengan tampilan menarik dan responsif.</p>
              </div>
              <div className="team-card">
                <img src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation.svg`} alt="Tim ADS" className="team-avatar" loading="lazy" />
                <h3>Tim ADS</h3>
                <p>Jasa iklan digital untuk strategi pemasaran terbaik.</p>
              </div>
              <div className="team-card">
                <img src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation.svg`} alt="Tim SEO" className="team-avatar" loading="lazy" />
                <h3>Tim SEO</h3>
                <p>Optimasi mesin pencari untuk trafik yang berkualitas.</p>
              </div>
              <div className="team-card">
                <img src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation.svg`} alt="Tim Programmer" className="team-avatar" loading="lazy" />
                <h3>Tim Programmer</h3>
                <p>Membangun fitur yang andal, aman, dan scalable.</p>
              </div>
              <div className="team-card">
                <img src={`${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation.svg`} alt="Tim Server" className="team-avatar" loading="lazy" />
                <h3>Tim Server</h3>
                <p>Pengelolaan server dan infrastruktur dengan performa tinggi.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-stats" aria-label="Statistik Singkat">
          <div className="c-container statbar">
            <div className="stat">
              <div className="value">120+</div>
              <div className="label">Proyek Selesai</div>
            </div>
            <div className="stat">
              <div className="value">95%</div>
              <div className="label">Kepuasan Klien</div>
            </div>
            <div className="stat">
              <div className="value">24/7</div>
              <div className="label">Dukungan</div>
            </div>
            <div className="stat">
              <div className="value">A+</div>
              <div className="label">Skor SEO</div>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="c-container c-cta-row">
            <Link className="c-btn c-btn--primary" to="/pricing">Mulai Sekarang</Link>
            <Link className="c-btn c-btn--secondary" to="/consultation">Jadwalkan Konsultasi</Link>
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
                      <li><Link to="/pricing?tab=apps">Pembuatan Aplikasi</Link></li>
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
                          console.log('Clicked theme', 'whatsapp', document.documentElement.getAttribute('data-theme'));
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
                          console.log('Clicked theme', 'instagram', document.documentElement.getAttribute('data-theme'));
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
                          console.log('Clicked theme', 'linkedin', document.documentElement.getAttribute('data-theme'));
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

export default Tentang;
