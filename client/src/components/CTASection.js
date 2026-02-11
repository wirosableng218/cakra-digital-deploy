import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = ({ 
  title, 
  subtitle, 
  primaryText = 'Konsultasi Gratis', 
  secondaryText = 'Lihat Paket Kami',
  primaryLink = '/consultation',
  secondaryLink = '/pricing?tab=website'
}) => {
  return (
    <section className="cta-section">
      <div className="cta-section__inner">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-subtitle">{subtitle}</p>
        <div className="cta-actions">
          <Link to={primaryLink} className="cta-btn cta-btn--primary">
            <span className="cta-btn-icon">💬</span>
            <span>{primaryText}</span>
          </Link>
          <Link to={secondaryLink} className="cta-btn cta-btn--secondary">
            <span className="cta-btn-icon">📋</span>
            <span>{secondaryText}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
