import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './Portfolio.css';

function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);

  // Portfolio projects data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Fashion',
      category: 'website',
      client: 'Fashion Store Indonesia',
      description: 'Platform e-commerce modern dengan fitur lengkap untuk fashion retail online.',
      image: '/images/ampul_Cakra_Digital_Innovation.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: [
        'Shopping cart & checkout',
        'Payment gateway integration',
        'Product management',
        'Order tracking',
        'Mobile responsive design'
      ],
      color: '#FF6B6B',
      year: '2024'
    },
    {
      id: 2,
      title: 'Klinik Kesehatan',
      category: 'website',
      client: 'Klinik Sehat Sejahtera',
      description: 'Website profil klinik dengan sistem appointment booking dan manajemen pasien.',
      image: '/images/ampul_Cakra_Digital_Innovation.png',
      tags: ['React', 'Firebase', 'Tailwind CSS', 'Google Calendar'],
      features: [
        'Online appointment booking',
        'Patient management system',
        'Doctor schedule management',
        'Medical records',
        'Telemedicine integration'
      ],
      color: '#10B981',
      year: '2024'
    },
    {
      id: 3,
      title: 'Distribusi Logistik',
      category: 'application',
      client: 'Logistik Cepat Indonesia',
      description: 'Aplikasi tracking armada real-time dengan dashboard analytics dan otomatisasi laporan.',
      image: '/images/ampul_Cakra_Digital_Innovation.png',
      tags: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps'],
      features: [
        'Real-time GPS tracking',
        'Fleet management',
        'Route optimization',
        'Analytics dashboard',
        'Automated reporting'
      ],
      color: '#3B82F6',
      year: '2023'
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua', icon: '🎯' },
    { id: 'website', name: 'Website', icon: '🌐' },
    { id: 'application', name: 'Aplikasi', icon: '📱' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const toggleProjectExpansion = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
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
    <div className="App portfolio-page">
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
                <li><Link to="/consultation">Contact</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/tentang">Tentang Kami</Link>
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
            <li><Link to="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link></li>
            <li><Link to="/tentang" onClick={() => setMobileOpen(false)}>Tentang Kami
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

      <main className="portfolio-main">
        <section className="portfolio-hero">
          <div className="portfolio-hero__inner">
            <div className="portfolio-hero__copy">
              <span className="portfolio-eyebrow">Portfolio Kami</span>
              <h1 className="portfolio-title">Karya Digital Terbaik untuk Bisnis Modern</h1>
              <p className="portfolio-subtitle">Eksplorasi proyek-proyek terbaik kami yang menggabungkan inovasi teknologi dengan desain yang memukau.</p>
              <div className="portfolio-stats">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
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

        <section className="portfolio-filters">
          <div className="portfolio-filters__inner">
            <h2 className="filters-title">Filter Kategori</h2>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                  onClick={() => setFilter(category.id)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-text">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-grid">
          <div className="portfolio-grid__inner">
            {filteredProjects.map(project => (
              <article key={project.id} className="portfolio-card">
                <div className="portfolio-card__image-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}${project.image}`}
                    alt={project.title}
                    className="portfolio-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="portfolio-card__overlay">
                    <button
                      className="portfolio-card__expand-btn"
                      onClick={() => toggleProjectExpansion(project.id)}
                      aria-expanded={expandedProject === project.id}
                      aria-label={`Expand ${project.title} details`}
                    >
                      <span className="expand-icon">{expandedProject === project.id ? '✕' : '+'}</span>
                    </button>
                  </div>
                </div>
                
                <div className="portfolio-card__content">
                  <div className="portfolio-card__header">
                    <h3 className="portfolio-card__title">{project.title}</h3>
                    <div className="portfolio-card__client">Klien: {project.client}</div>
                  </div>
                  
                  <p className="portfolio-card__description">{project.description}</p>
                  
                  <div className="portfolio-card__tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>

                  {expandedProject === project.id && (
                    <div className="portfolio-card__details">
                      <h4>Fitur Utama:</h4>
                      <ul>
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                      <div className="portfolio-card__meta">
                        <span className="year">Tahun: {project.year}</span>
                        <span className="category" style={{ backgroundColor: project.color }}>
                          {project.category === 'website' ? 'Website' : 'Aplikasi'}
                        </span>
                      </div>
                      <div className="portfolio-card__actions">
                        <Link to="/consultation" className="btn-contact">
                          Diskusi Proyek Serupa
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-cta">
          <div className="portfolio-cta__inner">
            <h2 className="cta-title">Siap Mewujudkan Proyek Impian Anda?</h2>
            <p className="cta-subtitle">Mari diskusikan kebutuhan digital Anda dan wujudkan solusi yang tepat untuk bisnis Anda.</p>
            <div className="cta-actions">
              <Link to="/consultation" className="cta-btn cta-btn--primary">
                <span className="cta-btn-icon">💬</span>
                <span>Konsultasi Gratis</span>
              </Link>
              <Link to="/pricing?tab=website" className="cta-btn cta-btn--secondary">
                <span className="cta-btn-icon">📋</span>
                <span>Lihat Paket Kami</span>
              </Link>
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
    </div>
  );
}

export default Portfolio;
