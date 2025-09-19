import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    about: 'About',
    features: 'Features',
    howItWorks: 'How It Works',
    impact: 'Impact',
    getStarted: 'Get Started',
    brandName: 'VrishtiDhara',
    
    // Navigation
    home: 'Home',
    calculator: 'Calculator',
    
    // Hero Section
    heroTitle: 'Assess Your Rainwater',
    heroSubtitle: 'Harvesting Potential',
    heroDescription: 'Smart, data-driven guidance for sustainable water solutions. Turn your rooftop into a source of clean, reliable water.',
    learnMore: 'Learn More',
    
    // About Section
    aboutTitle: 'Your Partner in Water Sustainability',
    waterCrisis: 'The Water Crisis',
    waterCrisisDesc: 'Urban areas face increasing water scarcity due to climate change and population growth, straining traditional water sources.',
    ourSolution: 'Our Solution',
    ourSolutionDesc: 'AquaGenius provides personalized, data-driven assessments for rooftop rainwater harvesting, empowering you to become water-independent.',
    sustainableFuture: 'Sustainable Future',
    sustainableFutureDesc: 'By harnessing rainwater, we reduce reliance on municipal supplies, recharge groundwater, and build resilient communities.',
    
    // Features Section
    featuresTitle: 'Powerful Features, Simplified',
    realTimeCalculator: 'Real-time RWH Potential Calculator',
    realTimeCalculatorDesc: 'Instantly calculate your rooftop\'s water harvesting capacity based on area, rainfall, and filter efficiency.',
    costBenefitAnalysis: 'Cost–Benefit & ROI Analysis',
    costBenefitAnalysisDesc: 'Receive a detailed financial breakdown, including installation costs, potential savings, and return on investment.',
    govDataIntegration: 'Government Data Integration',
    govDataIntegrationDesc: 'Leverages official data from IMD & CGWB for the most accurate rainfall and groundwater level information.',
    multiLanguage: 'Multi-language Support',
    multiLanguageDesc: 'Accessible to a diverse audience with support for multiple regional languages for wider adoption.',
    downloadReports: 'Downloadable PDF Reports',
    downloadReportsDesc: 'Generate and download comprehensive, shareable reports of your assessment for planning and records.',
    
    // How It Works Section
    howItWorksTitle: 'Get Your Assessment in 3 Easy Steps',
    enterDetails: 'Enter Details',
    enterDetailsDesc: 'Provide your location, rooftop area, and surface type. It\'s that simple.',
    fetchData: 'Fetch Data',
    fetchDataDesc: 'Our system instantly pulls localized rainfall and groundwater data from official sources.',
    generateReport: 'Generate Report',
    generateReportDesc: 'Receive a comprehensive analysis of your RWH potential, costs, and benefits in seconds.',
    
    // Impact Section
    impactTitle: 'Unlock Tangible Benefits',
    environmentalImpact: 'Environmental Impact',
    environmentalStat: '1 Lakh+',
    environmentalDesc: 'Liters of water saved per year for an average household.',
    financialSavings: 'Financial Savings',
    financialStat: '2 Years',
    financialDesc: 'Average payback period on your initial investment.',
    
    // Community Section
    joinMovement: 'Join the Water Conservation Movement',
    joinMovementDesc: 'Start your journey towards water sustainability today. Get a free, instant assessment of your property\'s rainwater harvesting potential.',
    assessNow: 'Assess My Rooftop Now',
    
    // References Section
    referencesTitle: 'Powered by Credible Data',
    referencesDesc: 'We use official, up-to-date data from India\'s leading meteorological and water resource agencies to ensure the highest accuracy.',
    
    // Footer
    platform: 'Platform',
    community: 'Community',
    legal: 'Legal',
    workshops: 'Workshops',
    getInvolved: 'Get Involved',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    copyright: 'A project for SIH 2025.',
    tagline: 'Smart, data-driven guidance for sustainable water solutions.',
    
    // Calculator
    rainfallAssessment: 'Rainwater Harvesting Assessment',
    enterAllDetails: 'Enter All Details',
    location: 'Location',
    selectLocation: 'Select Location',
    roofArea: 'Roof Area (sq ft)',
    roofType: 'Roof Type',
    residents: 'Number of Residents',
    waterUsage: 'Daily Water Usage (Liters) per Person',
    soilType: 'Soil Type',
    budget: 'Budget',
    getAssessment: 'Get Assessment',
    calculating: 'Calculating...',
    startOver: 'Start Over',
    concrete: 'Concrete',
    tile: 'Tile',
    metal: 'Metal',
    sandy: 'Sandy',
    loamy: 'Loamy',
    clayey: 'Clayey',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Assessment Results
    assessmentResults: 'Assessment Results',
    harvestPotential: 'Harvest Potential',
    annualHarvestableWater: 'Annual Harvestable Water',
    liters: 'liters',
    monthlyHarvestDistribution: 'Monthly Harvest Distribution',
    recommendedStructure: 'Recommended Structure',
    type: 'Type',
    size: 'Size',
    costBenefitAnalysisTitle: 'Cost-Benefit Analysis',
    installationCost: 'Installation Cost',
    annualSavings: 'Annual Savings',
    paybackPeriod: 'Payback Period',
    years: 'years',
    
    // Weather & Charts
    currentWeatherIn: 'Current Weather in',
    humidity: 'Humidity',
    wind: 'Wind',
    rainfall: 'Rainfall',
    monthlyRainfallDistribution: 'Monthly Rainfall Distribution',
    groundwaterLevels: 'Groundwater Levels (Past 5 Years)',
    rainfallMm: 'Rainfall (mm)',
    depthMeters: 'Depth (meters)',
    
    // Error Messages
    calculationFailed: 'Failed to calculate. Please try again.',
  },
  hi: {
    // Header
    about: 'हमारे बारे में',
    features: 'विशेषताएं',
    howItWorks: 'यह कैसे काम करता है',
    impact: 'प्रभाव',
    getStarted: 'शुरू करें',
    brandName: 'वृष्टिधारा',
    
    // Navigation
    home: 'होम',
    calculator: 'कैलकुलेटर',
    
    // Hero Section
    heroTitle: 'अपनी वर्षा जल',
    heroSubtitle: 'संचयन क्षमता का आकलन करें',
    heroDescription: 'टिकाऊ जल समाधान के लिए स्मार्ट, डेटा-संचालित मार्गदर्शन। अपनी छत को स्वच्छ, विश्वसनीय पानी के स्रोत में बदलें।',
    learnMore: 'और जानें',
    
    // About Section
    aboutTitle: 'जल स्थिरता में आपका साझीदार',
    waterCrisis: 'जल संकट',
    waterCrisisDesc: 'जलवायु परिवर्तन और जनसंख्या वृद्धि के कारण शहरी क्षेत्रों में बढ़ती पानी की कमी, पारंपरिक जल स्रोतों पर दबाव बढ़ा रही है।',
    ourSolution: 'हमारा समाधान',
    ourSolutionDesc: 'वृष्टिधारा छत पर वर्षा जल संचयन के लिए व्यक्तिगत, डेटा-संचालित मूल्यांकन प्रदान करता है, जो आपको पानी में स्वतंत्र बनने की शक्ति देता है।',
    sustainableFuture: 'टिकाऊ भविष्य',
    sustainableFutureDesc: 'वर्षा जल का उपयोग करके, हम नगरपालिका आपूर्ति पर निर्भरता कम करते हैं, भूजल का पुनर्भरण करते हैं, और लचीले समुदाय बनाते हैं।',
    
    // Features Section
    featuresTitle: 'शक्तिशाली सुविधाएं, सरलीकृत',
    realTimeCalculator: 'रियल-टाइम वर्षा जल संचयन क्षमता कैलकुलेटर',
    realTimeCalculatorDesc: 'क्षेत्रफल, वर्षा, और फिल्टर दक्षता के आधार पर अपनी छत की जल संचयन क्षमता की तुरंत गणना करें।',
    costBenefitAnalysis: 'लागत-लाभ और निवेश पर रिटर्न विश्लेषण',
    costBenefitAnalysisDesc: 'स्थापना लागत, संभावित बचत, और निवेश पर रिटर्न सहित विस्तृत वित्तीय विश्लेषण प्राप्त करें।',
    govDataIntegration: 'सरकारी डेटा एकीकरण',
    govDataIntegrationDesc: 'सबसे सटीक वर्षा और भूजल स्तर की जानकारी के लिए IMD और CGWB के आधिकारिक डेटा का उपयोग करता है।',
    multiLanguage: 'बहु-भाषा समर्थन',
    multiLanguageDesc: 'व्यापक अपनाने के लिए कई क्षेत्रीय भाषाओं के समर्थन के साथ विविध दर्शकों के लिए सुलभ।',
    downloadReports: 'डाउनलोड योग्य PDF रिपोर्ट',
    downloadReportsDesc: 'योजना और रिकॉर्ड के लिए अपने मूल्यांकन की व्यापक, साझा करने योग्य रिपोर्ट तैयार और डाउनलोड करें।',
    
    // How It Works Section
    howItWorksTitle: '3 आसान चरणों में अपना मूल्यांकन प्राप्त करें',
    enterDetails: 'विवरण दर्ज करें',
    enterDetailsDesc: 'अपना स्थान, छत का क्षेत्रफल, और सतह का प्रकार प्रदान करें। यह इतना सरल है।',
    fetchData: 'डेटा प्राप्त करें',
    fetchDataDesc: 'हमारा सिस्टम तुरंत आधिकारिक स्रोतों से स्थानीयकृत वर्षा और भूजल डेटा खींचता है।',
    generateReport: 'रिपोर्ट तैयार करें',
    generateReportDesc: 'सेकंडों में अपनी वर्षा जल संचयन क्षमता, लागत, और लाभ का व्यापक विश्लेषण प्राप्त करें।',
    
    // Impact Section
    impactTitle: 'ठोस लाभ अनलॉक करें',
    environmentalImpact: 'पर्यावरणीय प्रभाव',
    environmentalStat: '1 लाख+',
    environmentalDesc: 'एक औसत परिवार के लिए प्रति वर्ष लीटर पानी की बचत।',
    financialSavings: 'वित्तीय बचत',
    financialStat: '2 साल',
    financialDesc: 'आपके प्रारंभिक निवेश पर औसत वापसी अवधि।',
    
    // Community Section
    joinMovement: 'जल संरक्षण आंदोलन में शामिल हों',
    joinMovementDesc: 'आज ही पानी की स्थिरता की दिशा में अपनी यात्रा शुरू करें। अपनी संपत्ति की वर्षा जल संचयन क्षमता का मुफ्त, तत्काल मूल्यांकन प्राप्त करें।',
    assessNow: 'अब मेरी छत का मूल्यांकन करें',
    
    // References Section
    referencesTitle: 'विश्वसनीय डेटा द्वारा संचालित',
    referencesDesc: 'हम उच्चतम सटीकता सुनिश्चित करने के लिए भारत की अग्रणी मौसम विज्ञान और जल संसाधन एजेंसियों के आधिकारिक, अद्यतन डेटा का उपयोग करते हैं।',
    
    // Footer
    platform: 'प्लेटफॉर्म',
    community: 'समुदाय',
    legal: 'कानूनी',
    workshops: 'कार्यशालाएं',
    getInvolved: 'शामिल हों',
    contactUs: 'संपर्क करें',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    copyright: 'SIH 2025 के लिए एक परियोजना।',
    tagline: 'टिकाऊ जल समाधान के लिए स्मार्ट, डेटा-संचालित मार्गदर्शन।',
    
    // Calculator
    rainfallAssessment: 'वर्षा जल संचयन मूल्यांकन',
    enterAllDetails: 'सभी विवरण दर्ज करें',
    location: 'स्थान',
    selectLocation: 'स्थान चुनें',
    roofArea: 'छत का क्षेत्रफल (वर्ग फुट)',
    roofType: 'छत का प्रकार',
    residents: 'निवासियों की संख्या',
    waterUsage: 'प्रति व्यक्ति दैनिक पानी का उपयोग (लीटर)',
    soilType: 'मिट्टी का प्रकार',
    budget: 'बजट',
    getAssessment: 'मूल्यांकन प्राप्त करें',
    calculating: 'गणना कर रहे हैं...',
    startOver: 'फिर से शुरू करें',
    concrete: 'कंक्रीट',
    tile: 'टाइल',
    metal: 'धातु',
    sandy: 'रेतीली',
    loamy: 'दोमट',
    clayey: 'चिकनी मिट्टी',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    
    // Assessment Results
    assessmentResults: 'मूल्यांकन परिणाम',
    harvestPotential: 'संचयन क्षमता',
    annualHarvestableWater: 'वार्षिक संचयित पानी',
    liters: 'लीटर',
    monthlyHarvestDistribution: 'मासिक संचयन वितरण',
    recommendedStructure: 'सुझाई गई संरचना',
    type: 'प्रकार',
    size: 'आकार',
    costBenefitAnalysisTitle: 'लागत-लाभ विश्लेषण',
    installationCost: 'स्थापना लागत',
    annualSavings: 'वार्षिक बचत',
    paybackPeriod: 'वापसी की अवधि',
    years: 'वर्ष',
    
    // Weather & Charts
    currentWeatherIn: 'में वर्तमान मौसम',
    humidity: 'नमी',
    wind: 'हवा',
    rainfall: 'वर्षा',
    monthlyRainfallDistribution: 'मासिक वर्षा वितरण',
    groundwaterLevels: 'भूजल स्तर (पिछले 5 वर्ष)',
    rainfallMm: 'वर्षा (मिमी)',
    depthMeters: 'गहराई (मीटर)',
    
    // Error Messages
    calculationFailed: 'गणना विफल। कृपया पुनः प्रयास करें।',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};