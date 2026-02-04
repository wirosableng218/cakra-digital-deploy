 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './Consultation.css';

function Consultation() {
  const whatsappNumber = '6285852345718';
  const whatsappText = encodeURIComponent('Halo, saya ingin konsultasi mengenai layanan Cakra Digital Innovation.');
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  const email = 'cdiyunoru@gmail.com';
  const emailSubject = encodeURIComponent('Konsultasi Digital');
  const emailBody = encodeURIComponent(
    'Halo Tim Cakra Digital Innovation,\n\nSaya ingin konsultasi mengenai kebutuhan digital saya.\n\nTerima kasih.'
  );
  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${emailSubject}&body=${emailBody}`;

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
              <a href="/consultation">Contact</a>
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
                <li><Link to="/consultation" onClick={() => setMobileOpen(false)}>Pembuatan Aplikasi</Link></li>
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
              <a href="/consultation#contact" onClick={() => setMobileOpen(false)}>Contact</a>
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
      <section className="c-hero">
        <div className="c-container">
          <div className="c-hero-copy">
            <span className="c-eyebrow">Konsultasi Digital</span>
            <h1>Strategi Tepat. Eksekusi Rapi. Hasil Terukur.</h1>
            <p>Kami bantu Anda merumuskan solusi digital yang profesional, scalable, dan berorientasi hasil untuk bisnis Anda.</p>
            <div className="c-cta-row">
              <a className="c-btn c-btn--primary" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Konsultasi via WhatsApp">
                <span className="c-btn-icon">📱</span>
                <span>Chat WhatsApp</span>
              </a>
              <a className="c-btn c-btn--secondary" href={emailHref} target="_blank" rel="noreferrer" aria-label="Konsultasi via Email">
                <span className="c-btn-icon">📧</span>
                <span>Kirim Email</span>
              </a>
              <Link className="c-btn c-btn--secondary" to="/">Ke Beranda</Link>
              <Link className="c-btn c-btn--primary" to="/pricing?tab=website">Lihat Pricing</Link>
            </div>
          </div>
          <div className="c-hero-card">
            <div className="c-stats">
              <div className="c-stat">
                <div className="c-stat-value">24/7</div>
                <div className="c-stat-label">Support</div>
              </div>
              <div className="c-stat">
                <div className="c-stat-value">100%</div>
                <div className="c-stat-label">Kepuasan</div>
              </div>
              <div className="c-stat">
                <div className="c-stat-value">+SEO</div>
                <div className="c-stat-label">Siap Skalasi</div>
              </div>
            </div>
          </div>

          <div className="c-map-card" aria-label="Peta Lokasi Kantor">
            <div className="c-map-embed">
              <iframe
                title="Lokasi Cakra Digital Innovation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.984743640613!2d106.52561840000001!3d-6.1327517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a010fd9984015%3A0xf30939cfa9cbb97f!2sCakra%20Digital%20Innovation!5e0!3m2!1sid!2sid!4v1762007659701!5m2!1sid!2sid"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="c-highlights">
        <div className="c-container c-grid">
          <div className="c-card">
            <div className="c-card-icon">🔎</div>
            <h3>Analisis Kebutuhan</h3>
            <p>Audit singkat untuk memetakan tujuan, hambatan, dan prioritas agar solusi tepat sasaran.</p>
          </div>
          <div className="c-card">
            <div className="c-card-icon">🧭</div>
            <h3>Rekomendasi Solusi</h3>
            <p>Roadmap dan pilihan teknologi yang seimbang antara kualitas, waktu, dan biaya.</p>
          </div>
          <div className="c-card">
            <div className="c-card-icon">🤝</div>
            <h3>Pendampingan Implementasi</h3>
            <p>Dukungan end-to-end untuk memastikan hasil optimal dan berkelanjutan.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="c-contact" aria-labelledby="c-contact-title">
        <div className="c-container">
          <div className="c-contact-card">
            <div className="c-contact-header">
              <h2 id="c-contact-title">Hubungi Kami</h2>
              <p>Konsultasi awal gratis. Respon cepat pada jam kerja.</p>
            </div>
            <div className="c-contact-grid">
              <div className="c-contact-info">
                <div className="c-info-item">
                  <span className="c-info-label">Alamat Kantor</span>
                  <p className="c-info-value">Taman Raya Rajeg Blok K16/21, Kec. Rajeg, Des. Mekarsari, Kab. Tangerang 15540</p>
                </div>
                <div className="c-info-item">
                  <span className="c-info-label">WhatsApp</span>
                  <p className="c-info-value"><a href={whatsappHref} target="_blank" rel="noreferrer">0858-5234-5718</a></p>
                </div>
                <div className="c-info-item">
                  <span className="c-info-label">Email</span>
                  <p className="c-info-value"><a href={emailHref} target="_blank" rel="noreferrer">cdiyunoru@gmail.com</a></p>
                </div>
              </div>
              <div className="c-contact-actions">
                <a className="c-btn c-btn--primary c-btn--lg" href={whatsappHref} target="_blank" rel="noreferrer">
                  <span className="c-btn-icon">💬</span>
                  <span>Mulai Konsultasi via WhatsApp</span>
                </a>
                <a className="c-btn c-btn--secondary c-btn--lg" href={emailHref} target="_blank" rel="noreferrer">
                  <span className="c-btn-icon">✉️</span>
                  <span>Kirim Detail via Email</span>
                </a>
                <p className="c-note">Kerahasiaan data terjamin. Kami hanya gunakan info Anda untuk keperluan konsultasi.</p>
              </div>
            </div>
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
                <li><Link to="/pricing?tab=apps">Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software">Software Installation</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Navigasi</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="/#services">Layanan</a></li>
                <li><a href="/consultation#contact">Contact</a></li>
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
                <button type="button" className="whatsapp" aria-label="WhatsApp" onClick={(e) => { window.__setAppTheme && window.__setAppTheme('whatsapp'); const parent = e.currentTarget.closest('.socials'); parent && parent.querySelectorAll('a,button').forEach(el => el.classList.remove('is-active')); e.currentTarget.classList.add('is-active'); }}>🟢</button>
                <button type="button" className="instagram" aria-label="Instagram" onClick={(e) => { window.__setAppTheme && window.__setAppTheme('instagram'); const parent = e.currentTarget.closest('.socials'); parent && parent.querySelectorAll('a,button').forEach(el => el.classList.remove('is-active')); e.currentTarget.classList.add('is-active'); }}>🟣</button>
                <button type="button" className="linkedin" aria-label="LinkedIn" onClick={(e) => { window.__setAppTheme && window.__setAppTheme('linkedin'); const parent = e.currentTarget.closest('.socials'); parent && parent.querySelectorAll('a,button').forEach(el => el.classList.remove('is-active')); e.currentTarget.classList.add('is-active'); }}>🔵</button>
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

export default Consultation;