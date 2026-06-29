import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
}

const SITE = {
  name: 'Z-TECH',
  url: 'https://z-tech.cm',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@ztech_cm',
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  image = SITE.defaultImage,
  url,
  type = 'website',
  noIndex = false,
}) => {
  const fullTitle = `${title} | ${SITE.name}`;
  const canonicalUrl = url ? `${SITE.url}${url}` : SITE.url;
  const ogImage = image.startsWith('http') ? image : `${SITE.url}${image}`;

  return (
    <Helmet>
      {/* Base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="fr_CM" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default Seo;