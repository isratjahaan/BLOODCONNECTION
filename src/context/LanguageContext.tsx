import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand
    brandName: 'BLOOD CONNECTION',
    tagline: 'Connecting Blood Donors. Saving Lives.',
    subheadline: 'Donate Blood • Save Lives',
    togetherWeSaveLives: 'Together We Save Lives',
    heroDescription: 'A nationwide platform connecting blood donors and recipients across Bangladesh.',
    becomeDonor: 'Become a Donor',
    findDonor: 'Find a Donor',
    requestBlood: 'Request Blood',
    
    // Nav
    navHome: 'Home',
    navFindDonor: 'Find Donor',
    navBloodRequest: 'Blood Request',
    navRegister: 'Register',
    navDashboard: 'Dashboard',
    navOrganizations: 'Organizations',
    navCampaigns: 'Campaigns',
    navAbout: 'About',
    navContact: 'Contact',
    navLogin: 'Login',
    navLogout: 'Logout',

    // Quick Access
    quickRegister: 'Register as Donor',
    quickSearch: 'Search Blood Donor (All Bangladesh)',
    quickRequest: 'Request Blood (Helpline)',
    quickAvailability: 'Get 3 Months Availability',
    quickReview: 'Rate & Review Donors',
    quickIdCard: 'Get Digital ID Card',

    // Search Section
    searchTitle: 'Find Blood Donor',
    searchSubtitle: 'Search donors by Division, District or Thana',
    selectDivision: 'Select Division',
    selectDistrict: 'Select District',
    selectUpazila: 'Select Thana / Upazila',
    selectBloodGroup: 'Select Blood Group',
    searchButton: 'Search Donor',

    // Statistics
    statRegisteredDonors: 'Registered Donors',
    statUnitsDonated: 'Units Donated',
    statPositiveImpact: 'Positive Impact',
    statLivesSaved: 'Lives Saved',

    // Emergency
    needBloodTitle: 'Need Blood? Request Now',
    needBloodSubtitle: 'Post a blood request and let our community help you.',
    postRequestBtn: 'Request Blood',

    // Features
    featuresTitle: 'Our Features',
    featNetwork: 'Nationwide Donor Network',
    featAvailability: 'Real-time Availability (3 Months)',
    featIdCard: 'Digital ID Card with QR',
    featRating: 'Rating & Feedback System',
    featRbac: 'Role-Based Access Control',
    featCoverage: 'All Bangladesh Coverage',
    featSecure: 'Secure & Reliable Platform',
    featSharing: 'Social Media Sharing',

    // Banner
    heroBannerTitle: 'Be a Donor... Be a Hero...',
    joinNowBtn: 'Join Now',

    // Trusted By
    trustedBy: 'Trusted By',
    govtBd: 'Government of the People\'s Republic of Bangladesh',
    dghs: 'Directorate General of Health Services (DGHS)',
    redCrescent: 'Bangladesh Red Crescent Society',

    // Footer
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerFaq: 'FAQ',
    footerContact: 'Contact',
    footerBadge: 'Together for a Healthier Bangladesh',

    // Statuses
    available: 'Available Now',
    unavailableCooldown: 'In 3-Month Cooldown',
    verifiedDonor: 'Verified Donor',
  },
  bn: {
    // Brand
    brandName: 'ব্লাড কানেকশন',
    tagline: 'রক্তদাতা সংযোগ। জীবন রক্ষা।',
    subheadline: 'রক্ত দিন • জীবন বাঁচান',
    togetherWeSaveLives: 'একত্রে আমরা জীবন বাঁচাই',
    heroDescription: 'সমগ্র বাংলাদেশ জুড়ে রক্তদাতা ও গ্রহীতাদের সংযোগকারী একটি জাতীয় প্ল্যাটফর্ম।',
    becomeDonor: 'রক্তদাতা হোন',
    findDonor: 'রক্তদাতা খুঁজুন',
    requestBlood: 'রক্তের আবেদন',
    
    // Nav
    navHome: 'হোম',
    navFindDonor: 'রক্তদাতা খুঁজুন',
    navBloodRequest: 'রক্তের আবেদন',
    navRegister: 'নিবন্ধন',
    navDashboard: 'ড্যাশবোর্ড',
    navOrganizations: 'সংস্থাসমূহ',
    navCampaigns: 'ক্যাম্পেইন',
    navAbout: 'আমাদের সম্পর্কে',
    navContact: 'যোগাযোগ',
    navLogin: 'লগইন',
    navLogout: 'লগআউট',

    // Quick Access
    quickRegister: 'রক্তদাতা হিসেবে নিবন্ধন',
    quickSearch: 'রক্তদাতা খুঁজুন (সারাদেশে)',
    quickRequest: 'রক্তের আবেদন (হেল্পলাইন)',
    quickAvailability: '৩ মাসের প্রাপ্যতা নিয়ম',
    quickReview: 'রেটিং ও রিভিউ দিন',
    quickIdCard: 'ডিজিটাল আইডি কার্ড নিন',

    // Search Section
    searchTitle: 'রক্তদাতা খুঁজুন',
    searchSubtitle: 'বিভাগ, জেলা অথবা থানা অনুযায়ী রক্তদাতা খুঁজুন',
    selectDivision: 'বিভাগ নির্বাচন করুন',
    selectDistrict: 'জেলা নির্বাচন করুন',
    selectUpazila: 'থানা / উপজেলা নির্বাচন করুন',
    selectBloodGroup: 'রক্তের গ্রুপ নির্বাচন করুন',
    searchButton: 'রক্তদাতা খুঁজুন',

    // Statistics
    statRegisteredDonors: 'নিবন্ধিত রক্তদাতা',
    statUnitsDonated: 'রক্তদান সম্পন্ন',
    statPositiveImpact: 'ইতিবাচক প্রভাব',
    statLivesSaved: 'জীবন রক্ষা পেয়েছে',

    // Emergency
    needBloodTitle: 'জরুরী রক্তের প্রয়োজন? এখনই আবেদন করুন',
    needBloodSubtitle: 'রক্তের আবেদন পোস্ট করুন এবং দ্রুত রক্ত সংগ্রহে সহায়তা নিন।',
    postRequestBtn: 'রক্তের আবেদন করুন',

    // Features
    featuresTitle: 'আমাদের অনন্য বৈশিষ্ট্যসমূহ',
    featNetwork: 'দেশব্যাপী রক্তদাতা নেটওয়ার্ক',
    featAvailability: 'রিয়েল-টাইম প্রাপ্যতা (৩ মাসের নিয়ম)',
    featIdCard: 'কিউআর কোডসহ ডিজিটাল আইডি কার্ড',
    featRating: 'রেটিং ও মতামত প্রদান পদ্ধতি',
    featRbac: 'ভূমিকাভিত্তিক নিরাপদ নিয়ন্ত্রণ',
    featCoverage: 'সমগ্র বাংলাদেশে সার্বক্ষণিক সেবা',
    featSecure: 'নিরাপদ ও নির্ভরযোগ্য সিস্টেম',
    featSharing: 'সামাজিক যোগাযোগ মাধ্যমে শেয়ারিং',

    // Banner
    heroBannerTitle: 'রক্ত দিন... মানবতা বাঁচান...',
    joinNowBtn: 'যুক্ত হোন',

    // Trusted By
    trustedBy: 'স্বীকৃতি ও অংশীদারিত্ব',
    govtBd: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    dghs: 'স্বাস্থ্য অধিদপ্তর (ডিজিএইচএস)',
    redCrescent: 'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি',

    // Footer
    footerPrivacy: 'গোপনীয়তা নীতি',
    footerTerms: 'ব্যবহারের শর্তাবলী',
    footerFaq: 'প্রশ্নোত্তর',
    footerContact: 'যোগাযোগ',
    footerBadge: 'সুস্থ ও নিরাপদ বাংলাদেশের প্রত্যয়ে',

    // Statuses
    available: 'এখনই প্রস্তুত',
    unavailableCooldown: '৩ মাসের বিরতিতে আছেন',
    verifiedDonor: 'যাচাইকৃত রক্তদাতা',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('bc_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bc_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
