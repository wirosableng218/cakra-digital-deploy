import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm'; // Komponen form feedback

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

  useEffect(() => {
    fetch('/api/data')
      .then(async (response) => {
        const contentType = response.headers.get('content-type') || '';
        if (!response.ok || !contentType.includes('application/json')) {
          const text = await response.text().catch(() => '');
          console.error('API not OK/JSON', {
            status: response.status,
            statusText: response.statusText,
            contentType,
            snippet: (text || '').slice(0, 200)
          });
          return [];
        }
        return response.json();
      })
      .then((data) => setData(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Sync active social theme icon based on current theme
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    const footer = document.querySelector('.footer');
    if (!footer) return;
    const icons = footer.querySelectorAll('.socials a');
    icons.forEach(a => a.classList.remove('is-active'));
    if (theme) {
      const active = footer.querySelector(`.socials a.${theme}`);
      if (active) active.classList.add('is-active');
    }
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMobileOpen(false);
  };

  const wmRef = useRef(null);

  useEffect(() => {
    const el = wmRef.current;
    if (!el) return;
    const supportsMask =
      (typeof CSS !== 'undefined' && CSS.supports && (CSS.supports('mask-image', 'url("")') || CSS.supports('-webkit-mask-image', 'url("")')));
    if (!supportsMask) {
      el.classList.add('no-mask');
      el.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation-viewBox-fixed.svg)`;
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundPosition = 'center';
      el.style.backgroundSize = 'contain';
      el.style.backgroundColor = 'transparent';
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
                onClick={(e) => {
                  e.stopPropagation();
                  setDesktopServicesOpen(!desktopServicesOpen);
                }}
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
              <Link to="/tentang">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to="/api-test">
                API Test
              </Link>
            </li>
            <li>
              <Link to="/payment">
                Payment
              </Link>
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
          onClick={(e) => {
            if (e.target.id === 'mobile-nav') setMobileOpen(false);
          }}
        >
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
            </li>
            <li className={`has-sub ${activeSection === 'services' ? 'active' : ''}`}>
              <button type="button" className="submenu-toggle" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}>Layanan</button>
              <ul className={`submenu ${servicesOpen ? 'open' : ''}`}>
                <li><Link to="/pricing?tab=website" onClick={() => setMobileOpen(false)}>Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo" onClick={() => setMobileOpen(false)}>SEO Bergaransi</Link></li>
                <li><Link to="/consultation" onClick={() => setMobileOpen(false)}>Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software" onClick={() => setMobileOpen(false)}>Software Installation</Link></li>
                <li><Link to="/pricing?tab=design" onClick={() => setMobileOpen(false)}>Desain Grafis</Link></li>
                <li><Link to="/pricing?tab=video" onClick={() => setMobileOpen(false)}>Produksi Video</Link></li>
                <li><Link to="/pricing?tab=photography" onClick={() => setMobileOpen(false)}>Jasa Fotografi</Link></li>
                <li><Link to="/pricing?tab=consulting" onClick={() => setMobileOpen(false)}>Konsultasi Digital</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/tentang" onClick={() => setMobileOpen(false)}>Tentang Kami</Link>
            </li>
            <li>
              <Link to="/api-test" onClick={() => setMobileOpen(false)}>API Test</Link>
            </li>
            <li>
              <Link to="/payment" onClick={() => setMobileOpen(false)}>Payment</Link>
            </li>
            <li>
              <Link to="/client" onClick={() => setMobileOpen(false)}>Client</Link>
            </li>
            <li>
              <Link to="/consultation">Contact</Link>
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
        <section
          id="home"
          className="hero"
        >
          <div
            aria-hidden="true"
            className="hero-watermark"
            ref={wmRef}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/Cakra-Digital-Innovation-viewBox-fixed.svg)`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain'
            }}
          />
          <div className="hero-content">
            <h2>Selamat Datang di Jasa Pembuatan Website & Instalasi Software</h2>
            <p>Kami menyediakan solusi digital yang inovatif, profesional, dan terpercaya untuk bisnis Anda.</p>
            <div className="hero-buttons">
              <Link className="cta-button primary" to="/pricing">
                Lihat Harga
              </Link>
              <button
                className="cta-button secondary"
                onClick={() => scrollToSection('services')}
              >
                Pelajari Layanan
              </button>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="services"
        >
          <h2>Layanan Kami</h2>
          <div className="service-grid">
            <Link to="/pricing?tab=website" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>Jasa Pembuatan Website</h3>
              <p>Pembuatan website modern, cepat, dan mobile-friendly untuk bisnis Anda.</p>
            </Link>
            <Link to="/seo" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>SEO Bergaransi</h3>
              <p>Optimasi mesin pencari dengan target hasil yang terukur dan bergaransi.</p>
            </Link>
            <Link to="/consultation" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>Pembuatan Aplikasi</h3>
              <p>Pengembangan aplikasi web dan mobile sesuai kebutuhan operasional Anda.</p>
            </Link>
            <Link to="/pricing?tab=software" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>Software Installation</h3>
              <p>Layanan instalasi dan konfigurasi software yang aman dan efisien.</p>
            </Link>
          </div>
          <h3>Data Layanan dari Backend:</h3>
          <ul className="data-list">
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </section>


        <section
          id="contact"
          className="contact"
        >
          <h2>Hubungi Kami</h2>
          <p>Email: cdiyunoru@gmail.com | Telepon: +6285852345718</p>
          <FeedbackForm />
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
                <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
                <li><a href="#services" onClick={() => scrollToSection('services')}>Services</a></li>
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

export default App;
