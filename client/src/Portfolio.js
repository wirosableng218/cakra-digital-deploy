import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from './components/SEOHead';
import CTASection from './components/CTASection';
import './App.css';
import './Portfolio.css';
import './components/CTASection.css';

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
      image: '/images/portfolio/ecommerce-fashion.jpg',
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
      image: '/images/portfolio/klinik-kesehatan.jpg',
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
      image: '/images/portfolio/logistik-app.jpg',
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
    },
    {
      id: 4,
      title: 'Kursus Online',
      category: 'website',
      client: 'EduTech Indonesia',
      description: 'Platform LMS (Learning Management System) dengan integrasi pembayaran dan video conference.',
      image: '/images/portfolio/kursus-online.jpg',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebRTC'],
      features: [
        'Video conference integration',
        'Payment gateway',
        'Course management',
        'Student progress tracking',
        'Certificate generation'
      ],
      color: '#8B5CF6',
      year: '2023'
    },
    {
      id: 5,
      title: 'Manufacturing ERP',
      category: 'application',
      client: 'PT. Manufaktur Maju',
      description: 'Sistem ERP terintegrasi untuk manajemen produksi, inventory, dan distribusi.',
      image: '/images/portfolio/manufacturing-erp.jpg',
      tags: ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
      features: [
        'Production planning',
        'Inventory management',
        'Quality control',
        'Supply chain management',
        'Business intelligence'
      ],
      color: '#6366F1',
      year: '2023'
    },
    {
      id: 6,
      title: 'Restaurant Management',
      category: 'website',
      client: 'Warung Nusantara',
      description: 'Website restoran dengan sistem pemesanan online, manajemen menu, dan tracking delivery.',
      image: '/images/portfolio/restaurant-management.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      features: [
        'Online ordering system',
        'Menu management',
        'Delivery tracking',
        'Customer reviews',
        'Table reservation'
      ],
      color: '#F59E0B',
      year: '2024'
    }
  ];

  const categories = ['all', 'website', 'application'];

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

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const toggleProjectExpansion = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <>
      <SEOHead 
        title="Portfolio - Karya Digital Terbaik | Cakra Digital Innovation"
        description="Lihat portfolio proyek digital terbaik kami: website, aplikasi, dan solusi digital untuk bisnis modern. Karya inovatif dengan teknologi terkini."
        keywords="portfolio digital, karya website, proyek aplikasi, solusi digital, web development, aplikasi mobile, Tangerang, Jakarta, Indonesia"
        canonicalUrl="/portfolio"
        ogImage="/images/portfolio/ecommerce-fashion.jpg"
      />
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
                <li><Link to="/pricing?tab=website" onClick={() => setDesktopServicesOpen(false)}>Jasa Pembuatan Website</Link></li>
                <li><Link to="/seo" onClick={() => setDesktopServicesOpen(false)}>SEO Bergaransi</Link></li>
                <li><Link to="/consultation" onClick={() => setDesktopServicesOpen(false)}>Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software" onClick={() => setDesktopServicesOpen(false)}>Software Installation</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/portfolio" className="active">Portfolio</Link>
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
                <li><Link to="/consultation" onClick={() => setMobileOpen(false)}>Pembuatan Aplikasi</Link></li>
                <li><Link to="/pricing?tab=software" onClick={() => setMobileOpen(false)}>Software Installation</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/portfolio" onClick={() => setMobileOpen(false)} className="active">Portfolio</Link>
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
                  <div className="stat-number">A+</div>
                  <div className="stat-label">Kualitas Premium</div>
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
                  key={category}
                  className={`filter-btn ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category === 'all' ? 'Semua' : 
                   category === 'website' ? 'Website' : 
                   category === 'application' ? 'Aplikasi' : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-grid">
          <div className="portfolio-grid__inner">
            {filteredProjects.map((project, index) => (
              <article 
                key={project.id} 
                className={`portfolio-card ${expandedProject === project.id ? 'expanded' : ''}`}
                style={{ '--accent-color': project.color }}
              >
                <div className="portfolio-card__image-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}${project.image}`}
                    alt={project.title}
                    className="portfolio-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="portfolio-card__overlay">
                    <div className="portfolio-card__category">{project.category}</div>
                    <div className="portfolio-card__year">{project.year}</div>
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
                  
                  <div className="portfolio-card__features">
                    <h4>Fitur Utama:</h4>
                    <ul>
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="feature-item">
                          <span className="check-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="portfolio-card__actions">
                    <button 
                      className="btn-details"
                      onClick={() => toggleProjectExpansion(project.id)}
                    >
                      {expandedProject === project.id ? 'Tutup Detail' : 'Lihat Detail'}
                    </button>
                    <Link to="/consultation" className="btn-contact">
                      Diskusi Proyek Serupa
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CTASection 
          title="Siap Mewujudkan Proyek Impian Anda?"
          subtitle="Mari diskusikan kebutuhan digital Anda dan wujudkan solusi yang tepat untuk bisnis Anda."
          primaryText="Konsultasi Gratis"
          secondaryText="Lihat Paket Kami"
        />

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
                <li><Link to="/portfolio">Portfolio</Link></li>
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
    </>
  );
}

export default Portfolio;
