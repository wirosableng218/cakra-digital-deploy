import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl,
  ogImage = '/images/cakra-logo.png',
  ogType = 'website'
}) => {
  const siteTitle = 'Cakra Digital Innovation';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = 'https://cakra-digital-deploy.vercel.app';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:site" content="@CakraDigitalID" />
      
      {/* Additional SEO Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Cakra Digital Innovation" />
      <meta name="language" content="id" />
      <meta name="geo.region" content="ID" />
      <meta name="geo.placename" content="Tangerang, Banten, Indonesia" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Cakra Digital Innovation",
          "url": siteUrl,
          "logo": `${siteUrl}/images/cakra-logo.png`,
          "description": "Solusi digital profesional untuk website dan instalasi software bisnis Anda.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tangerang",
            "addressRegion": "Banten",
            "addressCountry": "Indonesia",
            "postalCode": "15540"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+6285852345718",
            "contactType": "customer service",
            "email": "cdiyunoru@gmail.com",
            "availableLanguage": ["Indonesian", "English"]
          },
          "sameAs": [
            "https://wa.me/6285852345718",
            "https://www.instagram.com/cakradigital",
            "https://www.linkedin.com/company/cakra-digital-innovation"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
