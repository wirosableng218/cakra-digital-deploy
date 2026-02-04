import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import './Pricing.css';

// Sync active social theme icon on mount for this page
function useSyncFooterThemeIcon() {
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
}

function Pricing() {
  const [activeTab, setActiveTab] = useState('website');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const location = useLocation();
  useSyncFooterThemeIcon();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'website' || tab === 'software' || tab === 'seo') setActiveTab(tab);
  }, [location.search]);

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

  const websitePackages = [
    {
      name: 'Basic',
      price: '699.000',
      period: 'one-time',
      features: [
        'Website 5 halaman',
        'Design responsif',
        '500mb disk space + unlimited bandwidth',
        '1 email accounts',
        'SEO dasar',
        'Free Domain my.id',
        'Shared Hosting',
        '1x revisi gratis (1x per bulan)',
        'Bonus: Dukungan teknis gratis 1 bulan',
      ],
      popular: false,
      color: '#4CAF50',
    },
    {
      name: 'Standard',
      price: '1.199.000',
      period: 'one-time',
      features: [
        'Website 10 halaman',
        'Design custom premium',
        'Responsif & mobile-friendly',
        'Optimasi SEO dasar (On-page)',
        'Disk space hingga 1GB + unlimited bandwidth',
        '1 akun email profesional',
        'Free domain .my.id (aktif 1 tahun)',
        'Shared hosting',
        '2x revisi gratis',
        'Estimasi pengerjaan: 5–10 hari kerja',
        'Bonus: Dukungan teknis gratis 30 hari',
      ],
      popular: true,
      color: '#2196F3',
    },
    {
      name: 'Pro',
      price: '2.775.000',
      period: 'one-time',
      features: [
        'Website unlimited halaman',
        'Premium template design',
        'Responsive & SEO on-page',
        'Disk space hingga 10GB + unlimited bandwidth',
        'Free email accounts',
        'Free domain .COM',
        'Shared hosting / CPanel',
        'Free revisi 3x',
        'Estimasi pengerjaan: 7–14 hari kerja',
        'Harga: Rp 2.775.000 (Diskon 44.5% dari Rp 4.999.000)',
      ],
      popular: false,
      color: '#FF9800',
    },
    {
      name: 'Business',
      price: '4.785.000',
      period: 'one-time',
      features: [
        'Website unlimited halaman',
        'Custom design & mobile optimization',
        'Disk space hingga 10GB + unlimited bandwidth',
        'Free email accounts',
        'Free domain pilihan (.COM / .CO.ID / .ID / .NET)',
        'Private CPanel',
        'Free revisi 10x',
        'Estimasi pengerjaan: 14–21 hari kerja',
        'Harga: Rp 4.785.000 (Diskon 38.5% dari Rp 7.785.000)',
        'Bonus: Setup pro + Iklan Google 1 bulan (senilai Rp 1.400.000)',
      ],
      popular: false,
      color: '#2E7D32',
    },
  ];

  const seoPackages = [
    {
      name: 'SEO Starter',
      price: '1.200.000',
      period: 'per bulan',
      features: [
        'Audit SEO dasar',
        'Riset kata kunci (10 keyword)',
        'Optimasi on-page (5 halaman)',
        'Setup Google Search Console & Analytics',
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
        'Monitoring & reporting komprehensif',
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

  const softwarePackages = [
    {
      name: 'Basic Installation',
      price: '500.000',
      period: 'one-time',
      features: ['Instalasi software standar', 'Konfigurasi dasar', 'Testing fungsi', 'Dokumentasi instalasi', 'Support 1 bulan'],
      popular: false,
      color: '#4CAF50',
    },
    {
      name: 'Professional Setup',
      price: '1.200.000',
      period: 'one-time',
      features: ['Instalasi software premium', 'Konfigurasi advanced', 'Optimasi performa', 'Security setup', 'Backup configuration', 'Training penggunaan', 'Support 3 bulan'],
      popular: true,
      color: '#2196F3',
    },
    {
      name: 'Enterprise Solution',
      price: '2.500.000',
      period: 'one-time',
      features: [
        'Instalasi software enterprise',
        'Konfigurasi custom',
        'Integration dengan sistem',
        'Security hardening',
        'Monitoring setup',
        'Backup & recovery',
        'Training lengkap',
        'Support 6 bulan',
        'Maintenance 3 bulan',
      ],
      popular: false,
      color: '#FF9800',
    },
  ];

  const currentPackages = activeTab === 'website' ? websitePackages : activeTab === 'software' ? softwarePackages : seoPackages;

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

      <section className="c-hero">
        <div className="c-hero-copy">
          <span className="c-eyebrow">Pricing</span>
          <h1>Paket Harga Layanan</h1>
          <p>Pilih paket terbaik tanpa perlu kembali ke halaman sebelumnya.</p>
          <div className="c-cta-row">
            <Link className="c-btn c-btn--secondary" to="/">Ke Beranda</Link>
            <Link className="c-btn c-btn--primary" to="/consultation">Konsultasi</Link>
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
      </section>

      <div className="pricing-container">
        <div className="pricing-header">
          <h2>Paket Harga Layanan</h2>
          <p>Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>

          <div className="tab-switcher">
            <button
              className={`tab-button ${activeTab === 'website' ? 'active' : ''}`}
              onClick={() => setActiveTab('website')}
            >
              <i className="icon">🌐</i>
              Website Development
            </button>
            <button
              className={`tab-button ${activeTab === 'seo' ? 'active' : ''}`}
              onClick={() => setActiveTab('seo')}
            >
              <i className="icon">🔍</i>
              SEO Bergaransi
            </button>
            <button
              className={`tab-button ${activeTab === 'software' ? 'active' : ''}`}
              onClick={() => setActiveTab('software')}
            >
              <i className="icon">💻</i>
              Software Installation
            </button>
          </div>
        </div>

        <div className="pricing-grid">
        {currentPackages.map((pkg, index) => (
          <div
            key={index}
            className={`pricing-card ${pkg.popular ? 'popular' : ''}`}
            style={{ '--accent-color': pkg.color }}
          >
            {pkg.popular && <div className="popular-badge">Paling Populer</div>}

            <div className="package-header">
              <h3>{pkg.name}</h3>
              <div className="price">
                <span className="currency">Rp</span>
                <span className="amount">{pkg.price}</span>
                <span className="period">/{pkg.period}</span>
              </div>
            </div>

            <div className="features">
              <ul id={`features-${index}`}>
                {(expanded[index] ? pkg.features : pkg.features.slice(0, 5)).map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <i className="check-icon">✓</i>
                    {feature}
                  </li>
                ))}
              </ul>
              {pkg.features.length > 5 && (
                <button
                  type="button"
                  className="features-toggle"
                  aria-expanded={!!expanded[index]}
                  aria-controls={`features-${index}`}
                  onClick={() => setExpanded(prev => ({ ...prev, [index]: !prev[index] }))}
                >
                  {expanded[index] ? 'Sembunyikan fitur' : 'Lihat semua fitur'}
                </button>
              )}
            </div>

            <button
              className="cta-button"
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

        <div className="pricing-footer">
          <div className="guarantee">
            <h3>🛡️ Garansi Kepuasan</h3>
            <p>100% uang kembali jika tidak puas dengan hasil kerja kami</p>
          </div>
        </div>
      </div>

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
                <li><Link to="/tentang">Tentang Kami</Link></li>
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

export default Pricing;
