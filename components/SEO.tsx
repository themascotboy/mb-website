import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, image }) => {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (snap) => {
      if (snap.exists()) {
        setSiteSettings(snap.data());
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
    });
    return () => unsub();
  }, []);

  const defaultTitle = siteSettings?.siteTitle || 'Mascot Boy';
  const defaultDescription = siteSettings?.metaDescription || 'Professional graphic design and mascots.';
  const defaultImage = siteSettings?.logoUrl || '';

  const siteTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteImage = image || defaultImage;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      {siteImage && <meta property="og:image" content={siteImage} />}
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {siteImage && <meta name="twitter:image" content={siteImage} />}
      
      {siteSettings?.metaKeywords && (
        <meta name="keywords" content={siteSettings.metaKeywords} />
      )}
    </Helmet>
  );
};
