import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import FeedbackForm from './FeedbackForm';

function App() {
  const [data, setData] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  // Close on ESC, unlock body scroll, and handle resize
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

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = element.offsetTop - headerHeight - 20;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  // Global theme and mode functions
  useEffect(() => {
    window.__setAppTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      const buttons = document.querySelectorAll('.socials button, .theme-selector button');
      buttons.forEach(btn => {
        btn.classList.remove('is-active');
        if (btn.classList.contains(theme)) btn.classList.add('is-active');
      });
    };

    window.__setAppMode = (mode) => {
      document.documentElement.setAttribute('data-mode', mode);
      localStorage.setItem('mode', mode);
    };

    // Apply saved theme and mode on load
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedMode = localStorage.getItem('mode') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-mode', savedMode);
  }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="logo" aria-label="Cakra Digital Innovation">
          <Link to="/" className="site-logo" aria-label="Beranda">
            <img
              src={`${process.env.PUBLIC_URL}/images/cakra-logo.png`}
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
            <li className={activeSection === 'home' ? 'active' : ''}>
              <a
                href="#home"
                onClick={() => scrollToSection('home')}
              >
                Home
              </a>
            </li>
            <li className={`has-sub ${activeSection === 'services' ? 'active' : ''} ${desktopServicesOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="submenu-toggle-desktop"
                aria-expanded={desktopServicesOpen}
                onClick={(e) => { e.stopPropagation(); setDesktopServicesOpen(!desktopServicesOpen); }}
              >
                Layanan
              </button>
              <ul className="submenu">
                <li><Link to="/pricing?tab=website">Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo">SEO Bergaransi</Link></li>
                <li><Link to="/consultation">Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software">Software Installation</Link></li>
              </ul>
            </li>
            <li className={activeSection === 'portfolio' ? 'active' : ''}>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li className={activeSection === 'about' ? 'active' : ''}>
              <a
                href="#tentang"
                onClick={() => scrollToSection('tentang')}
              >
                Tentang Kami
              </a>
            </li>
            <li className={activeSection === 'clients' ? 'active' : ''}>
              <Link to="/client">Klien</Link>
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
          onClick={(e) => {
            if (e.target.id === 'mobile-nav') setMobileOpen(false);
          }}
        >
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <a href="#home" onClick={() => { scrollToSection('home'); setMobileOpen(false); }}>Home</a>
            </li>
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
            <li className={activeSection === 'portfolio' ? 'active' : ''}>
              <Link to="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link>
            </li>
            <li className={activeSection === 'about' ? 'active' : ''}>
              <a href="#tentang" onClick={() => { scrollToSection('tentang'); setMobileOpen(false); }}>Tentang Kami</a>
            </li>
            <li className={activeSection === 'clients' ? 'active' : ''}>
              <Link to="/client" onClick={() => setMobileOpen(false)}>Klien</Link>
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

      <main className="main">
        <section id="home" className="hero">
          <div className="hero__inner">
            <div className="hero__content">
              <h1 className="hero__title">
                Jasa Pembuatan Website & SEO Bergaransi
                <span className="hero__title-accent"> Profesional</span>
              </h1>
              <p className="hero__subtitle">
                Solusi digital terintegrasi untuk bisnis modern di Indonesia. Website berkualitas, SEO terjamin, aplikasi custom, dan instalasi software profesional.
              </p>
              <div className="hero__actions">
                <Link to="/consultation" className="btn btn--primary">
                  <span className="btn__icon">💬</span>
                  <span>Konsultasi Gratis</span>
                </Link>
                <Link to="/pricing?tab=website" className="btn btn--secondary">
                  <span className="btn__icon">📋</span>
                  <span>Lihat Paket Harga</span>
                </Link>
              </div>
            </div>
            <div className="hero__visual">
              <div className="hero__card">
                <div className="hero__card-header">
                  <div className="hero__card-icon">🚀</div>
                  <div className="hero__card-title">Digital Solution</div>
                </div>
                <div className="hero__card-content">
                  <div className="hero__stat">
                    <div className="hero__stat-number">500+</div>
                    <div className="hero__stat-label">Proyek Selesai</div>
                  </div>
                  <div className="hero__stat">
                    <div className="hero__stat-number">100%</div>
                    <div className="hero__stat-label">Kepuasan Klien</div>
                  </div>
                  <div className="hero__stat">
                    <div className="hero__stat-number">24/7</div>
                    <div className="hero__stat-label">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="services__inner">
            <div className="section-header">
              <h2 className="section-title">Layanan Kami</h2>
              <p className="section-subtitle">Solusi digital lengkap untuk kebutuhan bisnis Anda</p>
            </div>
            <div className="services__grid">
              <div className="service-card">
                <div className="service-card__icon">🌐</div>
                <h3 className="service-card__title">Jasa Pembuatan Website</h3>
                <p className="service-card__description">Website profesional, responsif, dan SEO-friendly untuk meningkatkan kehadiran online bisnis Anda.</p>
                <Link to="/pricing?tab=website" className="service-card__link">Pelajari Lebih Lanjut</Link>
              </div>
              <div className="service-card">
                <div className="service-card__icon">🔍</div>
                <h3 className="service-card__title">SEO Bergaransi</h3>
                <p className="service-card__description">Optimasi mesin pencari dengan garansi ranking untuk meningkatkan traffic dan konversi.</p>
                <Link to="/seo" className="service-card__link">Pelajari Lebih Lanjut</Link>
              </div>
              <div className="service-card">
                <div className="service-card__icon">📱</div>
                <h3 className="service-card__title">Pembuatan Aplikasi</h3>
                <p className="service-card__description">Aplikasi mobile dan desktop custom sesuai kebutuhan bisnis Anda.</p>
                <Link to="/consultation" className="service-card__link">Pelajari Lebih Lanjut</Link>
              </div>
              <div className="service-card">
                <div className="service-card__icon">⚙️</div>
                <h3 className="service-card__title">Software Installation</h3>
                <p className="service-card__description">Instalasi dan konfigurasi software untuk meningkatkan produktivitas bisnis.</p>
                <Link to="/pricing?tab=software" className="service-card__link">Pelajari Lebih Lanjut</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="tentang" className="about">
          <div className="about__inner">
            <div className="about__content">
              <div className="section-header">
                <h2 className="section-title">Tentang Cakra Digital Innovation</h2>
                <p className="section-subtitle">Partner digital terpercaya untuk bisnis modern</p>
              </div>
              <div className="about__text">
                <p>
                  Cakra Digital Innovation adalah perusahaan teknologi yang berfokus pada penyediaan solusi digital terintegrasi untuk bisnis di Indonesia. Dengan pengalaman lebih dari 5 tahun, kami telah membantu ratusan klien dari berbagai industri untuk mengembangkan kehadiran digital mereka.
                </p>
                <p>
                  Kami mengkhususkan diri dalam jasa pembuatan website profesional, SEO bergaransi, pengembangan aplikasi custom, dan instalasi software. Setiap proyek dikerjakan oleh tim profesional yang berpengalaman dan menggunakan teknologi terkini untuk memastikan hasil terbaik.
                </p>
              </div>
              <div className="about__stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Proyek Selesai</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Kepuasan Klien</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta__inner">
            <div className="cta__content">
              <h2 className="cta__title">Siap Membangun Kehadiran Digital Anda?</h2>
              <p className="cta__subtitle">Mari diskusikan kebutuhan digital Anda dan wujudkan solusi yang tepat untuk bisnis Anda.</p>
              <div className="cta__actions">
                <Link to="/consultation" className="btn btn--primary">
                  <span className="btn__icon">💬</span>
                  <span>Konsultasi Gratis</span>
                </Link>
                <Link to="/pricing?tab=website" className="btn btn--secondary">
                  <span className="btn__icon">📋</span>
                  <span>Lihat Paket Kami</span>
                </Link>
              </div>
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
            <div className="footer-column">
              <h4>Layanan</h4>
              <ul>
                <li><Link to="/pricing?tab=website">Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo">SEO Bergaransi</Link></li>
                <li><Link to="/consultation">Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software">Software Installation</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Perusahaan</h4>
              <ul>
                <li><Link to="/tentang">Tentang Kami</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/client">Klien</Link></li>
                <li><Link to="/consultation">Kontak</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Hubungi Kami</h4>
              <ul>
                <li><a href="tel:+6285852345718">+62 858-5234-5718</a></li>
                <li><a href="mailto:cdiyunoru@gmail.com">cdiyunoru@gmail.com</a></li>
                <li><a href="https://wa.me/6285852345718" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
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

      <FeedbackForm />
    </div>
  );
}

export default App;
