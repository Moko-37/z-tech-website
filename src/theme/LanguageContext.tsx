import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    getStarted: 'Get Started',
    switchLanguage: 'Switch language',
    homeHeroTitleStart: 'Engineering the',
    homeHeroHighlight: 'Next Generation',
    homeHeroTitleEnd: 'of Digital Experiences',
    homeHeroSubtitle: 'We bridge the gap between complex technology and intuitive design. From mobile apps to enterprise web solutions — built for scale and performance.',
    homeHeroCtaPrimary: 'Start a Project',
    homeHeroCtaSecondary: 'Explore Services',
    homeTrustedLabel: 'Trusted tools & partners',
    homeWhatWeDo: 'What we do',
    homeCapabilitiesTitle: 'Core Capabilities',
    homeCapabilitiesDesc: 'Comprehensive solutions tailored to your business needs, powered by the latest tech stacks.',
    homeTestimonialsLabel: 'Client voices',
    homeTestimonialsTitle: 'What our clients say',
    homeCtaEyebrow: 'Limited spots available',
    homeCtaTitle: 'Ready to launch your vision?',
    homeCtaDesc: 'Join 50+ startups that have scaled their digital presence with Z-TECH. Let’s build something extraordinary together.',
    homeCtaPrimary: 'Get a Free Consultation',
    homeCtaSecondary: 'Learn About Us',
    homeStatsClients: 'Happy clients',
    homeStatsRating: 'Average rating',
    homeStatsSatisfaction: 'Satisfaction rate',
    homeServicesTagPopular: 'Popular',
    homeServicesTagCreative: 'Creative',
    homeServicesTagService: 'Services',
    homeServicesMobileTitle: 'Mobile Development',
    homeServicesMobileDesc: 'High-performance iOS and Android apps built with React Native and Flutter for seamless user experiences.',
    homeServicesUiTitle: 'UI/UX Design',
    homeServicesUiDesc: 'User-centric interfaces that blend aesthetic beauty with functional clarity.',
    homeServicesWebTitle: 'Web Solutions',
    homeServicesWebDesc: 'Scalable, SEO-optimized web applications using Next.js and high-speed cloud infrastructure.',
    homeServicesWordPressTitle: 'WordPress Mastery',
    homeServicesWordPressDesc: 'Custom WordPress development for power-users who need control and flexibility.',
    aboutHeroEyebrow: 'Our Story',
    aboutHeroTitle: 'Redefining the Startup Ecosystem',
    aboutHeroP1: 'Founded in 2024, Z-TECH was born out of a simple observation: most startups struggle not because of their ideas, but because of their technical execution.',
    aboutHeroP2: 'We are engineers, designers, and strategists passionate about bridging complex code and meaningful user impact — giving every ambitious founder the technical power of a Fortune 500 company.',
    aboutHeroCta: 'Work with us',
    aboutValuesEyebrow: 'What drives us',
    aboutValuesTitle: 'Our Core Values',
    servicesHeroEyebrow: 'What we offer',
    servicesHeroTitle: 'Comprehensive Services',
    servicesHeroDesc: 'End-to-end digital transformation services designed to help your startup grow, scale, and dominate your market — faster than you thought possible.',
    servicesFastTurnaround: 'Fast turnaround',
    servicesQuality: 'Quality guaranteed',
    servicesRating: '4.9 avg rating',
    servicesProcessEyebrow: 'How we work',
    servicesProcessTitle: 'Our Process',
    servicesTechEyebrow: 'Tools of the trade',
    servicesTechTitle: 'Our Technology Stack',
    servicesConsultationDesc: 'Not sure which service fits your needs?',
    servicesConsultationCta: 'Get a Free Consultation',
    aboutHeroBadge: 'Our Story',
    contactHeroEyebrow: 'Get in touch',
    contactHeroTitle: 'Let\'s build something great',
    contactHeroDesc: 'Have a question or a project idea? We\'d love to hear from you. Our team typically responds within 4 hours.',
    contactProfessionalAdvisory: 'Professional Advisory',
    contactQuote: 'The fastest way to build your vision is to start with the right technical foundation. We provide advice even if you do not hire us.',
    contactAvailable: 'Available for new projects',
    contactFormTitle: 'Send a message',
    contactFormDesc: 'Fill in the form and we\'ll be in touch soon.',
    contactFieldName: 'Name',
    contactFieldEmail: 'Email',
    contactFieldService: 'Service of Interest',
    contactFieldMessage: 'Message',
    contactPlaceholderMessage: 'Tell us about your vision...',
    contactSend: 'Send Message',
    contactSending: 'Sending…',
    contactSuccessTitle: 'Message sent!',
    contactSuccessDesc: 'Thanks for reaching out. We\'ll get back to you within 4 hours.',
    contactAnother: 'Send another message',
    footerBrandCopy: 'Leading the digital frontier with cutting-edge mobile and web solutions. We turn your vision into high-performance reality.',
    footerCta: 'Start a project',
    footerServicesTitle: 'Services',
    footerCompanyTitle: 'Company',
    footerContactTitle: 'Contact Us',
    footerAvailable: 'Available for new projects',
    footerBackToTop: 'Back to top',
    footerRights: 'All rights reserved.',
    footerBuilt: 'Built with precision for the future.',
    footerAbout: 'About Us',
    footerContactLink: 'Contact',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerEmailLabel: 'Email',
    footerPhoneLabel: 'Phone',
    footerOfficeLabel: 'Office',
  },
  fr: {
    home: 'Accueil',
    services: 'Services',
    about: 'À propos',
    contact: 'Contact',
    getStarted: 'Commencer',
    switchLanguage: 'Changer de langue',
    homeHeroTitleStart: 'Ingénierie de la',
    homeHeroHighlight: 'Nouvelle Génération',
    homeHeroTitleEnd: 'd\'expériences digitales',
    homeHeroSubtitle: 'Nous comblons le fossé entre une technologie complexe et un design intuitif. Des applications mobiles aux solutions web d\'entreprise — conçues pour évoluer et performer.',
    homeHeroCtaPrimary: 'Démarrer un projet',
    homeHeroCtaSecondary: 'Explorer les services',
    homeTrustedLabel: 'Outils et partenaires de confiance',
    homeWhatWeDo: 'Ce que nous faisons',
    homeCapabilitiesTitle: 'Compétences clés',
    homeCapabilitiesDesc: 'Des solutions complètes adaptées à vos besoins métier, alimentées par les dernières technologies.',
    homeTestimonialsLabel: 'Témoignages clients',
    homeTestimonialsTitle: 'Ce que nos clients disent',
    homeCtaEyebrow: 'Places limitées',
    homeCtaTitle: 'Prêt à lancer votre vision ?',
    homeCtaDesc: 'Rejoignez plus de 50 startups qui ont fait évoluer leur présence digitale avec Z-TECH. Construisons ensemble quelque chose d\'extraordinaire.',
    homeCtaPrimary: 'Obtenir une consultation gratuite',
    homeCtaSecondary: 'En savoir plus sur nous',
    homeStatsClients: 'Clients satisfaits',
    homeStatsRating: 'Note moyenne',
    homeStatsSatisfaction: 'Taux de satisfaction',
    homeServicesTagPopular: 'Populaire',
    homeServicesTagCreative: 'Créatif',
    homeServicesTagService: 'Services',
    homeServicesMobileTitle: 'Développement mobile',
    homeServicesMobileDesc: 'Des applications iOS et Android hautes performances, construites avec React Native et Flutter pour des expériences utilisateur fluides.',
    homeServicesUiTitle: 'Design UI/UX',
    homeServicesUiDesc: 'Des interfaces centrées sur l\'utilisateur, alliant esthétique et clarté fonctionnelle.',
    homeServicesWebTitle: 'Solutions web',
    homeServicesWebDesc: 'Des applications web évolutives et optimisées SEO utilisant Next.js et une infrastructure cloud performante.',
    homeServicesWordPressTitle: 'Maîtrise WordPress',
    homeServicesWordPressDesc: 'Des développements WordPress sur mesure pour les utilisateurs qui veulent contrôle et flexibilité.',
    aboutHeroEyebrow: 'Notre histoire',
    aboutHeroTitle: 'Redéfinir l\'écosystème des startups',
    aboutHeroP1: 'Fondée en 2024, Z-TECH est née d\'une observation simple : la plupart des startups n\'échouent pas à cause de leurs idées, mais à cause de leur exécution technique.',
    aboutHeroP2: 'Nous sommes des ingénieurs, designers et stratèges passionnés par l\'art de relier le code complexe à un impact utilisateur réel — donnant à chaque fondateur ambitieux la puissance technique d\'une entreprise du Fortune 500.',
    aboutHeroCta: 'Travaillons ensemble',
    aboutValuesEyebrow: 'Ce qui nous motive',
    aboutValuesTitle: 'Nos valeurs fondamentales',
    servicesHeroEyebrow: 'Ce que nous proposons',
    servicesHeroTitle: 'Services complets',
    servicesHeroDesc: 'Des services de transformation digitale de bout en bout conçus pour aider votre startup à grandir, évoluer et dominer votre marché — plus vite que prévu.',
    servicesFastTurnaround: 'Réactivité rapide',
    servicesQuality: 'Qualité garantie',
    servicesRating: 'Note moyenne 4,9',
    servicesProcessEyebrow: 'Notre méthode',
    servicesProcessTitle: 'Notre processus',
    servicesTechEyebrow: 'Outils du métier',
    servicesTechTitle: 'Notre stack technologique',
    servicesConsultationDesc: 'Vous ne savez pas quel service correspond le mieux à vos besoins ?',
    servicesConsultationCta: 'Obtenir une consultation gratuite',
    contactHeroEyebrow: 'Prenons contact',
    contactHeroTitle: 'Construisons quelque chose de grand',
    contactHeroDesc: 'Vous avez une question ou une idée de projet ? Nous serions ravis de vous entendre. Notre équipe répond généralement dans les 4 heures.',
    contactProfessionalAdvisory: 'Conseil professionnel',
    contactQuote: 'Le plus rapide pour concrétiser votre vision est de commencer avec la bonne base technique. Nous vous conseillons même si vous ne nous embauchez pas.',
    contactAvailable: 'Disponible pour de nouveaux projets',
    contactFormTitle: 'Envoyer un message',
    contactFormDesc: 'Remplissez le formulaire et nous vous recontacterons bientôt.',
    contactFieldName: 'Nom',
    contactFieldEmail: 'Email',
    contactFieldService: 'Service d\'intérêt',
    contactFieldMessage: 'Message',
    contactPlaceholderMessage: 'Parlez-nous de votre vision...',
    contactSend: 'Envoyer le message',
    contactSending: 'Envoi…',
    contactSuccessTitle: 'Message envoyé !',
    contactSuccessDesc: 'Merci pour votre message. Nous vous répondrons sous 4 heures.',
    contactAnother: 'Envoyer un autre message',
    footerBrandCopy: 'Pionniers du digital avec des solutions mobiles et web à la pointe. Nous transformons votre vision en réalité haute performance.',
    footerCta: 'Démarrer un projet',
    footerServicesTitle: 'Services',
    footerCompanyTitle: 'Entreprise',
    footerContactTitle: 'Contactez-nous',
    footerAvailable: 'Disponible pour de nouveaux projets',
    footerBackToTop: 'Retour en haut',
    footerRights: 'Tous droits réservés.',
    footerBuilt: 'Conçu avec précision pour l\'avenir.',
    footerAbout: 'À propos',
    footerContactLink: 'Contact',
    footerPrivacy: 'Politique de confidentialité',
    footerTerms: 'Conditions d\'utilisation',
    footerEmailLabel: 'Email',
    footerPhoneLabel: 'Téléphone',
    footerOfficeLabel: 'Bureau',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem('z-tech-language');
    if (saved === 'en' || saved === 'fr') {
      return saved;
    }
    return 'en';
  });

  useEffect(() => {
    window.document.documentElement.lang = language;
    window.localStorage.setItem('z-tech-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const t = (key: string) => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
