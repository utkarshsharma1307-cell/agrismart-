/**
 * AgriProtect - Main Application JavaScript
 * Handles navigation, theme, language, session, and common UI behaviors
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  storagePrefix: 'agriii_',
  defaultTheme: 'light',
  defaultLanguage: 'en',
  sessionKey: 'session',
  profileKey: 'profile',
  themeKey: 'theme',
  languageKey: 'language'
};

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  en: {
    // Common
    appName: 'AgriProtect',
    tagline: 'Smart Farming Companion',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    none: 'None',
    yes: 'Yes',
    no: 'No',
    required: 'Required',
    optional: 'Optional',

    // Navigation
    navDashboard: 'Dashboard',
    navSoilHealth: 'Soil Health',
    navWeather: 'Weather',
    navCropAdvisor: 'Crop Advisor',
    navDiseaseDetection: 'Disease Detection',
    navCropCalendar: 'Crop Calendar',
    navMarketPrices: 'Market Prices',
    navProfitPlanner: 'Profit Planner',
    navExpenses: 'Expense Tracker',
    navTasks: 'Task Reminders',
    navCropComparison: 'Crop Comparison',
    navHarvestPlanner: 'Harvest Planner',
    navIrrigation: 'Irrigation Calculator',
    navFertilizer: 'Fertilizer Calculator',
    navAssistant: 'Farm Assistant',
    navFarmerFinance: 'Farmer Finance',
    settings: 'Settings',
    navVoiceGuide: 'Voice Guide',
    today: 'Today',
    tomorrow: 'Tomorrow',
    assistantLocalNote: 'Local demo assistant',

    // Auth
    login: 'Login',
    logout: 'Logout',
    createAccount: 'Create Account',
    forgotPassword: 'Forgot Password?',
    phoneNumber: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    email: 'Email Address',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',

    // Dashboard
    welcomeBack: 'Welcome back',
    farmOverview: 'Farm Overview',
    upcomingTasks: 'Upcoming Tasks',
    weatherSnapshot: 'Weather Snapshot',
    marketSnapshot: 'Market Prices',
    quickActions: 'Quick Actions',
    viewAll: 'View All',

    // Features
    soilMoisture: 'Soil Moisture',
    soilPH: 'Soil pH',
    nitrogen: 'Nitrogen',
    phosphorus: 'Phosphorus',
    potassium: 'Potassium',
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    windSpeed: 'Wind Speed',
    forecast: 'Forecast',

    // Crops
    rice: 'Rice',
    wheat: 'Wheat',
    sugarcane: 'Sugarcane',
    cotton: 'Cotton',
    maize: 'Maize',
    pulses: 'Pulses',
    vegetables: 'Vegetables',
    fruits: 'Fruits',

    // Messages
    loginSuccess: 'Login successful! Welcome back.',
    logoutSuccess: 'You have been logged out.',
    saveSuccess: 'Changes saved successfully.',
    errorOccurred: 'An error occurred. Please try again.',
    invalidPhone: 'Please enter a valid 10-digit phone number.',
    passwordMismatch: 'Passwords do not match.',
    requiredField: 'This field is required.',

    // Units
    acres: 'acres',
    hectares: 'hectares',
    kg: 'kg',
    quintal: 'quintal',
    rupees: '₹',
    percent: '%',
    celsius: '°C',
    mm: 'mm',
    kmh: 'km/h',

    // Time
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    thisMonth: 'This Month',

    // Footer
    copyright: '© 2026 AgriProtect. All rights reserved.',
    madeWith: 'Made with ❤️ for Indian farmers',

    // Settings & Profile
    main: 'Main',
    farmManagement: 'Farm Management',
    tools: 'Tools',
    other: 'Other',
    enterName: 'Enter your name',
    enterPhone: 'Enter phone number',
    enterState: 'Enter state',
    enterDistrict: 'Enter district',
    remember: 'Remember me',
    next: 'Next',
    saveProfile: 'Save Profile',
    reset: 'Reset',
    enableVoice: 'Enable Voice Assistant',
    voiceEnabledDesc: 'Toggle voice input for the Farm Assistant. When disabled, use text chat only.',
    voiceRate: 'Voice Speed',
    voicePitch: 'Voice Pitch',
    testVoice: 'Test Voice',
    taskNotifications: 'Task Reminders',
    taskNotificationsDesc: 'Get notified about upcoming tasks and deadlines',
    weatherAlerts: 'Weather Alerts',
    weatherAlertsDesc: 'Receive notifications for extreme weather conditions',
    marketAlerts: 'Market Price Alerts',
    marketAlertsDesc: 'Get notified when market prices change significantly',
    dataPrivacy: 'Data & Privacy',
    dataStorage: 'Local Storage',
    dataStorageDesc: 'All your data is stored locally in your browser. No data is sent to external servers.',
    exportData: 'Export Data',
    exportDataDesc: 'Download all your farm data as a JSON file',
    importData: 'Import Data',
    importDataDesc: 'Restore your data from a previously exported JSON file',
    clearData: 'Clear All Data',
    clearDataDesc: 'This will delete all saved farm data, tasks, expenses, and preferences. This action cannot be undone.',
    clearAll: 'Clear All Data',
    export: 'Export',
    version: 'Version',
    app: 'AgriProtect',
    agriprotectDesc: 'Smart Farming Companion',
    storageUsed: 'Storage Used',
    about: 'About',
    settingsDesc: 'Customize your AgriProtect experience',
    farmProfile: 'Farm Profile',
    farmerName: 'Farmer Name',
    phone: 'Phone Number',
    primaryCrop: 'Primary Crop',
    soilType: 'Soil Type',
    irrigationSource: 'Irrigation Source',
    unit: 'Unit',
    acres: 'Acres',
    hectares: 'Hectares',
    sqm: 'Square Meters',
    alluvial: 'Alluvial',
    black: 'Black (Regur)',
    red: 'Red',
    laterite: 'Laterite',
    arid: 'Arid',
    mountain: 'Mountain',
    canal: 'Canal',
    well: 'Well',
    tubewell: 'Tube Well',
    tank: 'Tank',
    rainfall: 'Rainfall',
    other: 'Other',

    // Assistant Page
    dailyBriefing: 'Daily Briefing',
    tasksPending: 'Tasks',
    irrigationTip: 'Check soil moisture - consider irrigation',
    fertilizerTip: 'Apply fertilizer in 2 days',
    pestCheck: 'Weekly pest scouting recommended',
    farmContext: 'Farm Context',
    farmSize: 'Farm Size',
    primaryCrop: 'Primary Crop',
    soilType: 'Soil Type',
    irrigation: 'Irrigation',
    all: 'All',
    crops: 'Crops',
    soil: 'Soil',
    water: 'Water',
    pests: 'Pests',
    market: 'Market',
    chatWithAssistant: 'Chat with Assistant',
    clearChat: 'Clear',
    askPlaceholder: 'Ask about soil, weather, crops, or profit...',
    speak: 'Speak',
    listen: 'Listen',
    insights: 'Insights',
    cropSeasonTitle: 'Crop Season Active',
    cropSeasonTip: 'Kharif season ideal for rice cultivation. Monitor water levels closely.',
    irrigationTitle: 'Irrigation Alert',
    irrigationTip2: 'Check field A moisture levels. Consider early morning irrigation.',
    marketTitle: 'Market Update',
    marketTip: 'Rice prices stable. Consider selling excess stock this week.',
    photoDiagnosis: 'Photo Diagnosis',
    photoDiagnosisDesc: 'Upload a clear photo of affected plant parts for local demo analysis.',
    uploadPhoto: 'Upload Photo',
    voiceCommands: 'Voice Commands',
    cmdSoil: '→ Open soil health',
    cmdWeather: '→ Open weather',
    cmdCrop: '→ Crop advisor',
    cmdDisease: '→ Disease detection',
    cmdMarket: '→ Market prices',
    cmdProfit: '→ Profit planner',
    cmdDark: '→ Toggle dark',
    cmdHindi: '→ Hindi language',
    voiceReady: 'Voice Assistant Ready',
    tapToSpeak: 'Tap the microphone and speak',
    voiceCommandsAvailable: 'Say: "soil", "weather", "crop", "disease", "market", "profit", "dark mode", "हिंदी"',
    close: 'Close',

    // Landing Page
    heroSubtitle: 'Monitor soil health, track weather, get crop advice, check market prices, and plan your profits — all in one simple, beautiful app.',
    featuresDesc: 'Designed specifically for Indian farmers, with local languages, regional crop data, and mandi prices.',

    // Settings
    voiceSettings: 'Voice Assistant',
    notifications: 'Notifications',
    askAssistant: 'Ask the farm assistant'
  },

  hi: {
    // Common
    appName: 'एग्रीप्रोटेक्ट',
    tagline: 'स्मार्ट खेती साथी',
    loading: 'लोड हो रहा है...',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    add: 'जोड़ें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    all: 'सभी',
    none: 'कोई नहीं',
    yes: 'हाँ',
    no: 'नहीं',
    required: 'आवश्यक',
    optional: 'वैकल्पिक',

    // Navigation
    navDashboard: 'डैशबोर्ड',
    navSoilHealth: 'मिट्टी स्वास्थ्य',
    navWeather: 'मौसम',
    navCropAdvisor: 'फसल सलाहकार',
    navDiseaseDetection: 'रोग पहचान',
    navCropCalendar: 'फसल कैलेंडर',
    navMarketPrices: 'बाजार भाव',
    navProfitPlanner: 'मुनाफा योजना',
    navExpenses: 'खर्च ट्रैकर',
    navTasks: 'कार्य अनुस्मारक',
    navCropComparison: 'फसल तुलना',
    navHarvestPlanner: 'कटाई योजना',
    navIrrigation: 'सिंचाई कैलकुलेटर',
    navFertilizer: 'उर्वरक कैलकुलेटर',
    navAssistant: 'कृषि सहायक',
    navFarmerFinance: 'किसान वित्त',
    settings: 'सेटिंग्स',
    navVoiceGuide: 'आवाज़ गाइड',

    // Auth
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    createAccount: 'खाता बनाएं',
    forgotPassword: 'पासवर्ड भूल गए?',
    phoneNumber: 'फ़ोन नंबर',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    fullName: 'पूरा नाम',
    email: 'ईमेल पता',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    noAccount: 'खाता नहीं है?',
    hasAccount: 'पहले से खाता है?',

    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    farmOverview: 'खेत का अवलोकन',
    upcomingTasks: 'आगामी कार्य',
    weatherSnapshot: 'मौसम स्नैपशॉट',
    marketSnapshot: 'बाजार भाव',
    quickActions: 'त्वरित कार्य',
    viewAll: 'सभी देखें',

    // Features
    soilMoisture: 'मिट्टी की नमी',
    soilPH: 'मिट्टी का pH',
    nitrogen: 'नाइट्रोजन',
    phosphorus: 'फास्फोरस',
    potassium: 'पोटैशियम',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    rainfall: 'वर्षा',
    windSpeed: 'हवा की गति',
    forecast: 'पूर्वानुमान',

    // Crops
    rice: 'धान',
    wheat: 'गेहूं',
    sugarcane: 'गन्ना',
    cotton: 'कपास',
    maize: 'मक्का',
    pulses: 'दालें',
    vegetables: 'सब्जियां',
    fruits: 'फल',

    // Messages
    loginSuccess: 'लॉगिन सफल! वापसी पर स्वागत है।',
    logoutSuccess: 'आप लॉगआउट हो गए हैं।',
    saveSuccess: 'परिवर्तन सफलतापूर्वक सेव किए गए।',
    errorOccurred: 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    invalidPhone: 'कृपया एक वैध 10-अंकीय फ़ोन नंबर दर्ज करें।',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते।',
    requiredField: 'यह फ़ील्ड आवश्यक है।',

    // Units
    acres: 'एकड़',
    hectares: 'हेक्टेयर',
    kg: 'किग्रा',
    quintal: 'क्विंटल',
    rupees: '₹',
    percent: '%',
    celsius: '°C',
    mm: 'मिमी',
    kmh: 'किमी/घंटा',

    // Time
    today: 'आज',
    tomorrow: 'कल',
    thisWeek: 'इस सप्ताह',
    thisMonth: 'इस महीने',

    // Footer
    copyright: '© 2026 एग्री। सर्वाधिकार सुरक्षित।',
    madeWith: 'भारतीय किसानों के लिए ❤️ से बनाया गया',

    // Settings & Profile
    main: 'मुख्य',
    farmManagement: 'खेत प्रबंधन',
    tools: 'उपकरण',
    other: 'अन्य',
    enterName: 'अपना नाम दर्ज करें',
    enterPhone: 'फ़ोन नंबर दर्ज करें',
    enterState: 'राज्य दर्ज करें',
    enterDistrict: 'ज़िला दर्ज करें',
    remember: 'मुझे याद रखें',
    next: 'अगला',
    saveProfile: 'प्रोफ़ाइल सेव करें',
    reset: 'रीसेट',
    enableVoice: 'आवाज़ सहायक सक्षम करें',
    voiceEnabledDesc: 'फार्म असिस्टेंट के लिए आवाज़ इनपुट चालू/बंद करें। बंद होने पर केवल टेक्स्ट चैट का उपयोग करें।',
    voiceRate: 'आवाज़ की गति',
    voicePitch: 'आवाज़ की पिच',
    testVoice: 'आवाज़ टेस्ट करें',
    taskNotifications: 'कार्य अनुस्मारक',
    taskNotificationsDesc: 'आगामी कार्यों और समय सीमा के बारे में सूचनाएं प्राप्त करें',
    weatherAlerts: 'मौसम अलर्ट',
    weatherAlertsDesc: 'चरम मौसम की स्थिति के लिए सूचनाएं प्राप्त करें',
    marketAlerts: 'बाजार मूल्य अलर्ट',
    marketAlertsDesc: 'जब बाजार की कीमतें काफी बदलती हैं तो सूचित करें',
    dataPrivacy: 'डेटा और गोपनीयता',
    dataStorage: 'लोकल स्टोरेज',
    dataStorageDesc: 'आपका सारा डेटा आपके ब्राउज़र में स्थानीय रूप से संग्रहीत है। कोई डेटा बाहरी सर्वर पर नहीं भेजा जाता।',
    exportData: 'डेटा निर्यात करें',
    exportDataDesc: 'अपने सभी फार्म डेटा को JSON फ़ाइल के रूप में डाउनलोड करें',
    importData: 'डेटा आयात करें',
    importDataDesc: 'पहले से निर्यात की गई JSON फ़ाइल से अपना डेटा पुनर्स्थापित करें',
    clearData: 'सभी डेटा साफ़ करें',
    clearDataDesc: 'यह सभी सेव किए गए फार्म डेटा, कार्य, खर्च और प्राथमिकताओं को हटा देगा। यह कार्रवाई पूर्ववत नहीं की जा सकती।',
    clearAll: 'सभी डेटा साफ़ करें',
    export: 'निर्यात',
    version: 'संस्करण',
    app: 'एग्रीप्रोटेक्ट',
    agriprotectDesc: 'स्मार्ट खेती साथी',
    storageUsed: 'स्टोरेज उपयोग',
    about: 'के बारे में',
    settingsDesc: 'अपने एग्रीप्रोटेक्ट अनुभव को अनुकूलित करें',
    farmProfile: 'फार्म प्रोफ़ाइल',
    farmerName: 'किसान का नाम',
    phone: 'फ़ोन नंबर',
    primaryCrop: 'मुख्य फसल',
    soilType: 'मिट्टी का प्रकार',
    irrigationSource: 'सिंचाई स्रोत',
    unit: 'इकाई',
    acres: 'एकड़',
    hectares: 'हेक्टेयर',
    sqm: 'वर्ग मीटर',
    alluvial: 'जलोढ़',
    black: 'काली (रेगुर)',
    red: 'लाल',
    laterite: 'लेटेराइट',
    arid: 'शुष्क',
    mountain: 'पर्वतीय',
    canal: 'नहर',
    well: 'कुआं',
    tubewell: 'ट्यूबवेल',
    tank: 'टैंक',
    rainfall: 'वर्षा',
    other: 'अन्य',

    // Assistant Page
    dailyBriefing: 'दैनिक ब्रीफिंग',
    tasksPending: 'कार्य',
    irrigationTip: 'मिट्टी की नमी जांचें - सिंचाई पर विचार करें',
    fertilizerTip: '2 दिनों में उर्वरक डालें',
    pestCheck: 'साप्ताहिक कीट निगरानी की सिफारिश',
    farmContext: 'खेत का संदर्भ',
    farmSize: 'खेत का आकार',
    primaryCrop: 'मुख्य फसल',
    soilType: 'मिट्टी का प्रकार',
    irrigation: 'सिंचाई',
    all: 'सभी',
    crops: 'फसलें',
    soil: 'मिट्टी',
    water: 'पानी',
    pests: 'कीट',
    market: 'बाजार',
    chatWithAssistant: 'सहायक से चैट करें',
    clearChat: 'साफ़ करें',
    askPlaceholder: 'मिट्टी, मौसम, फसल या मुनाफे के बारे में पूछें...',
    speak: 'बोलें',
    listen: 'सुनें',
    insights: 'अंतर्दृष्टि',
    cropSeasonTitle: 'फसल मौसम सक्रिय',
    cropSeasonTip: 'खरीफ मौसम धान की खेती के लिए आदर्श है। जल स्तर पर नज़र रखें।',
    irrigationTitle: 'सिंचाई अलर्ट',
    irrigationTip2: 'खेत A की नमी जांचें। सुबह जल्दी सिंचाई पर विचार करें।',
    marketTitle: 'बाजार अपडेट',
    marketTip: 'धान की कीमतें स्थिर। इस हफ्ते अतिरिक्त स्टॉक बेचने पर विचार करें।',
    photoDiagnosis: 'फोटो निदान',
    photoDiagnosisDesc: 'स्थानीय डेमो विश्लेषण के लिए प्रभावित पौधे के हिस्सों की स्पष्ट फोटो अपलोड करें।',
    uploadPhoto: 'फोटो अपलोड करें',
    voiceCommands: 'आवाज़ कमांड',
    cmdSoil: '→ मिट्टी स्वास्थ्य खोलें',
    cmdWeather: '→ मौसम खोलें',
    cmdCrop: '→ फसल सलाहकार',
    cmdDisease: '→ रोग पहचान',
    cmdMarket: '→ बाजार भाव',
    cmdProfit: '→ मुनाफा योजना',
    cmdDark: '→ डार्क मोड',
    cmdHindi: '→ हिंदी भाषा',
    voiceReady: 'आवाज़ सहायक तैयार',
    tapToSpeak: 'माइक्रोफोन टैप करें और बोलें',
    voiceCommandsAvailable: 'कहें: "मिट्टी", "मौसम", "फसल", "रोग", "बाजार", "मुनाफा", "डार्क मोड", "हिंदी"',
    close: 'बंद करें',

    // Landing Page
    heroSubtitle: 'मिट्टी के स्वास्थ्य की निगरानी करें, मौसम ट्रैक करें, फसल की सलाह लें, बाजार की कीमतें जांचें, और अपने मुनाफे की योजना बनाएं — सब एक सरल, सुंदर ऐप में।',
    featuresDesc: 'भारतीय किसानों के लिए विशेष रूप से डिज़ाइन किया गया, स्थानीय भाषाओं, क्षेत्रीय फसल डेटा और मंडी भाव के साथ।',

    // Settings
    voiceSettings: 'आवाज़ सहायक',
    notifications: 'सूचनाएं',
    askAssistant: 'कृषि सहायक से पूछें'
  }
};

// ============================================
// STORAGE HELPERS
// ============================================
const Storage = {
  get(key) {
    try {
      const value = localStorage.getItem(CONFIG.storagePrefix + key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.warn('Storage read error:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(CONFIG.storagePrefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage write error:', e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(CONFIG.storagePrefix + key);
      return true;
    } catch (e) {
      console.warn('Storage remove error:', e);
      return false;
    }
  },

  clear() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CONFIG.storagePrefix))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (e) {
      console.warn('Storage clear error:', e);
      return false;
    }
  },

  // Alias for backward compatibility
  removeAll() {
    return this.clear();
  }
};

// ============================================
// SESSION MANAGEMENT
// ============================================
const Session = {
  create(data) {
    const session = {
      ...data,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };
    Storage.set(CONFIG.sessionKey, session);
    return session;
  },

  get() {
    const session = Storage.get(CONFIG.sessionKey);
    if (!session) return null;

    // Check expiration
    if (new Date(session.expiresAt) < new Date()) {
      this.destroy();
      return null;
    }

    return session;
  },

  destroy() {
    Storage.remove(CONFIG.sessionKey);
  },

  clear() {
    this.destroy();
    Storage.remove(CONFIG.profileKey);
    Storage.remove(CONFIG.themeKey);
    Storage.remove(CONFIG.languageKey);
  },

  isLoggedIn() {
    return this.get() !== null;
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }
};

// ============================================
// THEME MANAGEMENT
// ============================================
const Theme = {
  get() {
    return Storage.get(CONFIG.themeKey) || CONFIG.defaultTheme;
  },

  set(theme) {
    Storage.set(CONFIG.themeKey, theme);
    this.apply(theme);
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateIcon(theme);
  },

  toggle() {
    const current = this.get();
    const next = current === 'light' ? 'dark' : 'light';
    this.set(next);
    return next;
  },

  updateIcon(theme) {
    const icon = document.querySelector('[data-theme-icon]');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  },

  init() {
    const theme = this.get();
    this.apply(theme);
  }
};

// ============================================
// LANGUAGE MANAGEMENT
// ============================================
const Language = {
  listeners: [],

  get() {
    return Storage.get(CONFIG.languageKey) || CONFIG.defaultLanguage;
  },

  set(lang) {
    const prev = this.get();
    if (prev === lang) return lang;
    Storage.set(CONFIG.languageKey, lang);
    this.apply(lang);
    this.notifyListeners(prev, lang);
    return lang;
  },

  toggle() {
    const current = this.get();
    const next = current === 'en' ? 'hi' : 'en';
    return this.set(next);
  },

  t(key) {
    const lang = this.get();
    return translations[lang]?.[key] || translations.en[key] || key;
  },

  apply(lang) {
    document.documentElement.setAttribute('lang', lang);
    this.updatePageContent(lang);
  },

  updatePageContent(lang) {
    const setTranslatedText = (el, value) => {
      if (!el.children.length || ['OPTION', 'TITLE'].includes(el.tagName)) {
        el.textContent = value;
        return;
      }
      const explicitTarget = el.querySelector('[data-i18n-text]');
      if (explicitTarget) {
        explicitTarget.textContent = value;
        return;
      }
      const directSpan = Array.from(el.children).find(child =>
        child.tagName === 'SPAN' &&
        child.children.length === 0 &&
        !child.hasAttribute('data-lucide')
      );
      if (directSpan) {
        directSpan.textContent = value;
        return;
      }
      const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode) textNode.textContent = value + ' ';
    };

    // Update all elements with data-i18n attribute without removing nested links/buttons/icons
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = translations[lang]?.[key] || translations.en[key];
      if (text) setTranslatedText(el, text);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = translations[lang]?.[key] || translations.en[key];
      if (text) {
        el.placeholder = text;
      }
    });

    // Update title
    const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
    if (titleKey) {
      document.title = this.t(titleKey);
    }
  },

  init() {
    const lang = this.get();
    this.apply(lang);
  },

  // Language change event system
  onLanguageChange(callback) {
    if (typeof callback !== 'function') return;
    this.listeners.push(callback);
    return () => this.offLanguageChange(callback);
  },

  offLanguageChange(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) this.listeners.splice(index, 1);
  },

  notifyListeners(prev, current) {
    this.listeners.forEach(callback => {
      try {
        callback(prev, current);
      } catch (e) {
        console.error('Language change listener error:', e);
      }
    });
  }
};

// ============================================
// PROFILE MANAGEMENT
// ============================================
const Profile = {
  get() {
    return Storage.get(CONFIG.profileKey) || this.getDefault();
  },

  set(profile) {
    Storage.set(CONFIG.profileKey, profile);
    return profile;
  },

  update(updates) {
    const profile = this.get();
    const updated = { ...profile, ...updates };
    Storage.set(CONFIG.profileKey, updated);
    return updated;
  },

  getDefault() {
    return {
      name: 'Demo Farmer',
      phone: '9876543210',
      email: 'demo@agriii.com',
      state: 'Maharashtra',
      district: 'Pune',
      farmSize: 5,
      farmUnit: 'acres',
      primaryCrop: 'rice',
      preferredLanguage: 'en',
      soilType: 'alluvial',
      irrigationSource: 'canal',
      cropSeason: 'kharif',
      farmingGoal: 'maximize_yield',
      createdAt: new Date().toISOString()
    };
  },

  init() {
    if (!Storage.get(CONFIG.profileKey)) {
      this.set(this.getDefault());
    }
  }
};

// ============================================
// TOAST NOTIFICATIONS
// ============================================
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(options) {
    this.init();

    const { type = 'info', title, message, duration = 4000 } = options;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon" data-lucide="${this.getIcon(type)}"></span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" data-lucide="x"></button>
    `;

    this.container.appendChild(toast);

    // Initialize icons
    if (window.lucide) {
      lucide.createIcons();
    }

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this.remove(toast);
    });

    // Auto remove
    if (duration > 0) {
      setTimeout(() => this.remove(toast), duration);
    }

    return toast;
  },

  remove(toast) {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  },

  getIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle',
      info: 'info'
    };
    return icons[type] || 'info';
  },

  success(message, title) {
    return this.show({ type: 'success', title, message });
  },

  error(message, title) {
    return this.show({ type: 'error', title, message });
  },

  warning(message, title) {
    return this.show({ type: 'warning', title, message });
  },

  info(message, title) {
    return this.show({ type: 'info', title, message });
  }
};

// ============================================
// SIDEBAR & MOBILE NAVIGATION
// ============================================
const Navigation = {
  sidebar: null,
  overlay: null,
  isOpen: false,

  addToolkitLinks() {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav || nav.querySelector('[data-toolkit-links]')) return;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const hasLink = href => !!nav.querySelector(`a.nav-item[href="${href}"]`);
    const links = [
      ['farmer-finance.html', 'wallet', 'navFarmerFinance'],
      ['tasks.html', 'list-checks', 'navTasks'],
      ['crop-comparison.html', 'bar-chart-3', 'navCropComparison'],
      ['harvest-planner.html', 'tractor', 'navHarvestPlanner'],
      ['assistant.html', 'message-circle', 'navAssistant'],
      ['voice-guide.html', 'mic', 'navVoiceGuide'],
      ['settings.html', 'settings', 'settings']
    ].filter(([href]) => !hasLink(href));
    if (!links.length) return;
    const section = document.createElement('div');
    section.dataset.toolkitLinks = 'true';
    section.innerHTML = `<div class="nav-section-title">Toolkit</div>${links.map(([href, icon, key]) => `<a href="${href}" class="nav-item${href === currentPage ? ' active' : ''}" ${href === currentPage ? 'aria-current="page"' : ''} data-i18n="${key}"><i data-lucide="${icon}"></i><span>${translations.en[key]}</span></a>`).join('')}`;
    nav.appendChild(section);
    Language.updatePageContent(Language.get());
    if (window.lucide) lucide.createIcons();
  },

  addHeaderSettings() {
    const headerActions = document.querySelector('.app-header .flex.items-center.gap-sm')
      || document.querySelector('.navbar-menu')
      || document.querySelector('.auth-header');
    if (!headerActions) return;

    if (!headerActions.querySelector('[data-voice-toggle]') && !document.querySelector('[data-voice-toggle]')) {
      const voiceBtn = document.createElement('button');
      voiceBtn.type = 'button';
      voiceBtn.className = 'btn btn-primary btn-sm';
      voiceBtn.setAttribute('data-voice-toggle', 'true');
      voiceBtn.setAttribute('title', 'Voice Guide');
      voiceBtn.setAttribute('aria-label', 'Voice Guide');
      voiceBtn.innerHTML = '<i data-lucide="mic"></i><span class="hide-mobile">Voice</span>';
      voiceBtn.addEventListener('click', () => window.toggleVoiceAssistant());
      const themeToggle = headerActions.querySelector('[data-theme-toggle]');
      if (themeToggle) {
        headerActions.insertBefore(voiceBtn, themeToggle);
      } else {
        headerActions.prepend(voiceBtn);
      }
    }

    if (headerActions.querySelector('[data-settings-link]')) {
      if (window.lucide) lucide.createIcons();
      return;
    }
    if (!document.querySelector('.app-header')) return;
    const link = document.createElement('a');
    link.href = 'settings.html';
    link.className = 'btn btn-icon';
    link.setAttribute('data-settings-link', 'true');
    link.setAttribute('title', 'Settings');
    link.setAttribute('aria-label', 'Settings');
    link.innerHTML = '<i data-lucide="settings"></i>';
    const themeToggle = headerActions.querySelector('[data-theme-toggle]');
    if (themeToggle) {
      headerActions.insertBefore(link, themeToggle);
    } else {
      headerActions.prepend(link);
    }
    if (window.lucide) lucide.createIcons();
  },

  init() {
    this.sidebar = document.querySelector('.sidebar');
    this.overlay = document.querySelector('.sidebar-overlay');

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    this.addToolkitLinks();
    this.addHeaderSettings();
    // Set active nav item
    this.setActiveItem();
  },

  toggle() {
    this.isOpen ? this.close() : this.open();
  },

  open() {
    this.sidebar?.classList.add('open');
    this.overlay?.classList.add('open');
    document.querySelectorAll('[data-sidebar-toggle]').forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.sidebar?.classList.remove('open');
    this.overlay?.classList.remove('open');
    document.querySelectorAll('[data-sidebar-toggle]').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    this.isOpen = false;
    document.body.style.overflow = '';
  },

  setActiveItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'page');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });
  }
};

// ============================================
// FORM VALIDATION
// ============================================
const Validator = {
  phone(value) {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 10;
  },

  email(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  },

  required(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },

  minLength(value, min) {
    return value.length >= min;
  },

  match(value1, value2) {
    return value1 === value2;
  },

  showError(input, message) {
    input.classList.add('error');
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('form-error')) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      input.parentNode.insertBefore(errorEl, input.nextSibling);
    }
    errorEl.textContent = message;
  },

  clearError(input) {
    input.classList.remove('error');
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('form-error')) {
      errorEl.remove();
    }
  }
};

// ============================================
// UTILITIES
// ============================================
const Utils = {
  formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  formatDate(date, options = {}) {
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      ...options
    }).format(d);
  },

  formatRelativeDate(date) {
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.toDateString() === today.toDateString()) {
      return Language.t('today');
    } else if (d.toDateString() === tomorrow.toDateString()) {
      return Language.t('tomorrow');
    }

    return this.formatDate(d);
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};

// ============================================
// LOCAL PREFERENCE HELPERS
// ============================================
function getStoredPreference(key, fallback) {
  // Storage.get() already adds the prefix, so just use the key directly
  const value = Storage.get(key);
  if (value !== null) return value;
  return fallback;
}

// ============================================
// LOCAL FARM ASSISTANT
// ============================================
const Assistant = {
  storageKey: 'assistantHistory',
  voiceState: 'idle',
  recognition: null,

  // History management with normalized format
  getHistory() {
    const raw = Storage.get(this.storageKey) || [];
    // Migrate old format { message, kind } to new format { id, role, text, language, createdAt }
    return raw.map(item => {
      if (item.role) return item;
      return {
        id: item.id || Utils.generateId(),
        role: item.kind === 'bot' ? 'assistant' : 'user',
        text: item.message || item.text,
        language: item.language || 'en',
        createdAt: item.createdAt || item.timestamp || new Date().toISOString()
      };
    });
  },

  appendMessage(role, text, lang = Language.get()) {
    const history = this.getHistory();
    history.push({
      id: Utils.generateId(),
      role,
      text,
      language: lang,
      createdAt: new Date().toISOString()
    });
    Storage.set(this.storageKey, history.slice(-40));
    return history;
  },

  clearHistory() {
    Storage.remove(this.storageKey);
  },

  // Enhanced local response library
  async getResponseAsync(message, lang = Language.get()) {
    // Simulate async for typing indicator
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.getResponse(message, lang));
      }, 600);
    });
  },

  getResponse(message, lang = Language.get()) {
    const text = (message || '').toLowerCase();
    const hindi = lang === 'hi';

    // Crop planning
    if (text.includes('crop') || text.includes('फसल') || text.includes('plant') || text.includes('बुवाई')) {
      return hindi
        ? 'फसल चुनते समय मिट्टी का प्रकार, पानी की उपलब्धता, मौसम और बाजार मांग देखें। Crop Advisor पेज पर सुझाव देखें और फसल कैलेंडर में बुवाई का समय नोट करें। स्थानीय कृषि विशेषज्ञ से सलाह लें।'
        : 'Choose crops based on soil type, water availability, season and market demand. Check Crop Advisor for suggestions and note sowing time in Crop Calendar. Confirm with local agricultural experts.';
    }

    // Pest and disease
    if (text.includes('pest') || text.includes('insect') || text.includes('कीट') || text.includes('disease') || text.includes('रोग')) {
      return hindi
        ? 'सुबह पत्तियों के नीचे कीट जांच करें। पहले नीम तेल स्प्रे (3-5 ml/लीटर) आजमाएं। रोग के लक्षण दिखें तो Disease Detection पेज पर फोटो अपलोड करें। यह डेमो विश्लेषण है - गंभीर समस्या में कृषि अधिकारी से पुष्टि करें।'
        : 'Inspect underside of leaves early morning. Try neem oil spray first (3-5 ml/litre). If disease symptoms appear, upload photo on Disease Detection page. This is demo analysis - confirm serious issues with agriculture officers.';
    }

    // Irrigation
    if (text.includes('irrig') || text.includes('water') || text.includes('सिंच') || text.includes('पानी')) {
      return hindi
        ? 'सिंचाई का समय मिट्टी की नमी और मौसम देखकर तय करें। सुबह जल्दी या शाम को पानी दें। खेत में जलभराव से बचें। Irrigation Calculator में पानी की जरूरत का अनुमान देखें।'
        : 'Plan irrigation based on soil moisture and weather forecast. Water early morning or evening. Avoid waterlogging. Check Irrigation Calculator for water requirement estimate.';
    }

    // Fertilizer
    if (text.includes('fertil') || text.includes('उर्वरक') || text.includes('खाद') || text.includes('npk')) {
      return hindi
        ? 'उर्वरक की मात्रा मिट्टी परीक्षण पर निर्भर करती है। अधिक नाइट्रोजन से फली बनना कम हो सकता है। Fertilizer Calculator में N-P-K अनुमान देखें। सड़ी खाद का उपयोग करें।'
        : 'Fertilizer quantity depends on soil test. Excess nitrogen can reduce pod formation. Check Fertilizer Calculator for N-P-K estimate. Use well-decomposed compost.';
    }

    // Weather
    if (text.includes('weather') || text.includes('rain') || text.includes('मौसम') || text.includes('बारिश')) {
      return hindi
        ? 'Weather पेज पर तापमान, वर्षा और सात दिन का पूर्वानुमान देखें। बारिश से पहले सिंचाई और छिड़काव की योजना बदलें। यह डेमो डेटा है।'
        : 'Check Weather page for temperature, rainfall and seven-day forecast. Adjust irrigation and spraying before rain. This is demo data.';
    }

    // Market and profit
    if (text.includes('market') || text.includes('price') || text.includes('sell') || text.includes('profit') || text.includes('बाजार') || text.includes('मुनाफ')) {
      return hindi
        ? 'Market Prices पेज पर मंडी भाव देखें। Profit Planner में फसल, क्षेत्रफल, उपज, बिक्री भाव और सभी खर्च भरें। मुनाफा और break-even भाव देखें। यह डेमो अनुमान है।'
        : 'Check Market Prices page for mandi rates. Use Profit Planner to enter crop, area, yield, selling price and all costs. Review profit and break-even price. This is demo estimate.';
    }

    // Expenses and tasks
    if (text.includes('expense') || text.includes('cost') || text.includes('खर्च') || text.includes('task') || text.includes('कार्य')) {
      return hindi
        ? 'Expense Tracker में खर्च रिकॉर्ड करें। Tasks पेज पर कार्य जोड़ें और due date सेट करें। यह डेमो लोकल स्टोरेज में सेव होता है।'
        : 'Record expenses in Expense Tracker. Add tasks on Tasks page and set due dates. This saves in demo local storage.';
    }

    // Soil
    if (text.includes('soil') || text.includes('मिट्टी')) {
      return hindi
        ? 'Soil Health पेज पर नमी, pH और पोषक तत्व देखें। pH और पोषक तत्वों के लिए नियमित मिट्टी परीक्षण उपयोगी है। यह डेमो डेटा है।'
        : 'Check Soil Health page for moisture, pH and nutrients. Regular soil testing helps correct pH and nutrient gaps. This is demo data.';
    }

    // Help
    if (text.includes('help') || text.includes('मदद') || !message.trim()) {
      return hindi
        ? 'मैं मिट्टी, मौसम, फसल, कीट-रोग, सिंचाई, उर्वरक, बाजार, मुनाफा और कार्य प्रबंधन पर स्थानीय डेमो सलाह दे सकता हूँ। एक खेती का सवाल पूछें।'
        : 'I can give local demo guidance on soil, weather, crops, pests-disease, irrigation, fertilizer, market, profit and task management. Ask a specific farming question.';
    }

    // Default
    return hindi
      ? 'मैं आपके खेती के सवाल का जवाब देने की कोशिश कर रहा हूँ। कृपया मिट्टी, फसल, पानी, उर्वरक, कीट, रोग या बाजार के बारे में पूछें।'
      : 'I am trying to answer your farming question. Please ask about soil, crops, water, fertilizer, pests, disease or market.';
  },

  // Voice synthesis with better rate
  speak(text, lang = Language.get()) {
    if (!('speechSynthesis' in window)) return false;
    // Check if voice is enabled in settings
    if (getStoredPreference('voice_enabled', true) === false) return false;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = parseFloat(getStoredPreference('voice_rate', '0.9'));
    utterance.pitch = parseFloat(getStoredPreference('voice_pitch', '1'));
    window.speechSynthesis.speak(utterance);
    return true;
  },

  // Enhanced voice controller with state machine
  startVoice(onInterim, onFinal, onError, lang = Language.get()) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.voiceState = 'unsupported';
      onError?.({
        state: 'unsupported',
        message: lang === 'hi'
          ? 'इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं है। कृपया अपना सवाल लिखें।'
          : 'Voice recognition not available in this browser. Please type your question.'
      });
      return null;
    }

    if (this.recognition && this.voiceState === 'listening') {
      return this.recognition;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    this.recognition.onstart = () => {
      this.voiceState = 'listening';
    };

    this.recognition.onresult = (event) => {
      const results = Array.from(event.results);
      const transcript = results.map(r => r[0].transcript).join('');

      if (event.results[0].isFinal) {
        this.voiceState = 'processing';
        onFinal?.(transcript);
      } else {
        onInterim?.(transcript);
      }
    };

    this.recognition.onerror = (event) => {
      this.voiceState = 'error';
      let message = lang === 'hi'
        ? 'आवाज़ पहचान में त्रुटि। कृपया दोबारा प्रयास करें।'
        : 'Voice recognition error. Please try again.';

      if (event.error === 'not-allowed') {
        message = lang === 'hi'
          ? 'माइक्रोफ़ोन की अनुमति नहीं मिली। ब्राउज़र सेटिंग में अनुमति दें।'
          : 'Microphone permission denied. Please allow microphone access in browser settings.';
      }

      onError?.({ state: 'error', error: event.error, message });
    };

    this.recognition.onend = () => {
      if (this.voiceState === 'listening') {
        this.voiceState = 'idle';
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.voiceState = 'error';
      onError?.({
        state: 'error',
        message: lang === 'hi' ? 'आवाज़ शुरू नहीं हो सकी।' : 'Could not start voice.'
      });
    }

    return this.recognition;
  },

  stopVoice() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Already stopped
      }
      this.recognition = null;
    }
    this.voiceState = 'idle';
  },

  // Voice command processing with Agriii route aliases
  processVoiceCommand(transcript, lang = Language.get()) {
    const lower = transcript.toLowerCase().trim();

    // Navigation commands
    const routes = {
      // Dashboard
      'home': 'dashboard.html',
      'dashboard': 'dashboard.html',
      'होम': 'dashboard.html',
      'घर': 'dashboard.html',
      'डैशबोर्ड': 'dashboard.html',

      // Tools
      'soil': 'soil-health.html',
      'soil health': 'soil-health.html',
      'soil testing': 'soil-health.html',
      'मिट्टी': 'soil-health.html',

      'crop': 'crop-advisor.html',
      'crop recommendation': 'crop-advisor.html',
      'crop advisor': 'crop-advisor.html',
      'फसल': 'crop-advisor.html',

      'calendar': 'crop-calendar.html',
      'crop calendar': 'crop-calendar.html',
      'कैलेंडर': 'crop-calendar.html',

      'weather': 'weather.html',
      'मौसम': 'weather.html',

      'disease': 'disease-detection.html',
      'disease detection': 'disease-detection.html',
      'रोग': 'disease-detection.html',

      'market': 'market-prices.html',
      'market prices': 'market-prices.html',
      'बाजार': 'market-prices.html',

      'profit': 'profit-planner.html',
      'profit planner': 'profit-planner.html',
      'मुनाफा': 'profit-planner.html',

      'expense': 'expenses.html',
      'expenses': 'expenses.html',
      'खर्च': 'expenses.html',

      'task': 'tasks.html',
      'tasks': 'tasks.html',
      'कार्य': 'tasks.html',

      'comparison': 'crop-comparison.html',
      'तुलना': 'crop-comparison.html',

      'harvest': 'harvest-planner.html',
      'कटाई': 'harvest-planner.html',

      'irrigation': 'irrigation-calculator.html',
      'सिंचाई': 'irrigation-calculator.html',

      'fertilizer': 'fertilizer-calculator.html',
      'उर्वरक': 'fertilizer-calculator.html',

      'assistant': 'assistant.html',
      'सहायक': 'assistant.html',

      'finance': 'farmer-finance.html',
      'किसान वित्त': 'farmer-finance.html',

      'settings': 'settings.html',
      'सेटिंग्स': 'settings.html'
    };

    // Check navigation - use word boundaries for single-word commands
    for (const [keyword, page] of Object.entries(routes)) {
      let matched = false;
      if (keyword.includes(' ')) {
        // Multi-word phrase - exact substring match
        matched = lower.includes(keyword);
      } else {
        // Single word - use word boundary regex
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        matched = regex.test(lower);
      }
      if (matched) {
        const message = lang === 'hi' ? `${keyword} खुल रहा है` : `Opening ${keyword}`;
        return { action: 'navigate', page, message };
      }
    }

    // Theme commands
    if (/\bdark\b/.test(lower) || /\bडार्क\b/.test(lower)) {
      Theme.set('dark');
      return {
        action: 'theme',
        theme: 'dark',
        message: lang === 'hi' ? 'डार्क मोड चालू है' : 'Dark mode enabled'
      };
    }
    if (/\blight\b/.test(lower) || /\bलाइट\b/.test(lower)) {
      Theme.set('light');
      return {
        action: 'theme',
        theme: 'light',
        message: lang === 'hi' ? 'लाइट मोड चालू है' : 'Light mode enabled'
      };
    }

    // Language commands
    if (/\bhindi\b/.test(lower) || /\bहिंदी\b/.test(lower)) {
      Language.set('hi');
      return { action: 'language', language: 'hi', message: 'हिंदी में बदल दिया' };
    }
    if (/\benglish\b/.test(lower) || /\bइंग्लिश\b/.test(lower)) {
      Language.set('en');
      return { action: 'language', language: 'en', message: 'Switched to English' };
    }

    // Refresh
    if (/\brefresh\b/.test(lower) || /\breload\b/.test(lower) || /\bरिफ्रेश\b/.test(lower)) {
      return {
        action: 'refresh',
        message: lang === 'hi' ? 'रिफ्रेश हो रहा है' : 'Refreshing'
      };
    }

    // Help
    if (/\bhelp\b/.test(lower) || /\bमदद\b/.test(lower)) {
      const helpText = lang === 'hi'
        ? 'आप कह सकते हैं: मिट्टी खोलो, फसल सुझाव, मौसम देखो, रोग पहचान, बाजार भाव, या मुनाफा योजना। डार्क मोड, हिंदी में बदलो, भी कह सकते हैं।'
        : 'You can say: open soil, crop advice, show weather, disease detection, market prices, or profit planner. You can also say dark mode, switch to Hindi.';
      return { action: 'help', message: helpText };
    }

    // Unknown
    return {
      action: 'unknown',
      message: lang === 'hi'
        ? 'माफ़ कीजिये, मैं समझ नहीं पाया। कृपया दोबारा कहें।'
        : 'Sorry, I did not understand. Please try again.'
    };
  }
};

function hindiVoiceFallback(lang) {
  return lang === 'hi' ? 'इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं है। कृपया अपना सवाल लिखें।' : 'Voice input is not available in this browser. Please type your question instead.';
}

// ============================================
// GLOBAL INITIALIZATION
// ============================================
function initAgriii() {
  Theme.init();
  Language.init();
  Profile.init();
  Navigation.init();
  createAssistantWidget();
}

// Export toggleVoiceAssistant for header buttons
window.toggleVoiceAssistant = function() {
  const overlay = document.getElementById('voiceOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
  }
};

// Export Agriii namespace for all pages
window.Agriii = {
  Session,
  Theme,
  Language,
  Profile,
  Storage,
  Toast,
  Validator,
  Utils,
  Assistant,
  Navigation,
  CONFIG,
  translations,
  init: initAgriii
};

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', initAgriii);

function createAssistantWidget() {
  if (document.body.dataset.assistantWidget === 'ready' || !Session.isLoggedIn()) return;
  document.body.dataset.assistantWidget = 'ready';

  // Create floating widget
  const widget = document.createElement('div');
  widget.className = 'assistant-widget';
  widget.innerHTML = `
    <button class="assistant-launcher btn btn-primary" type="button" aria-expanded="false" aria-controls="assistantWidgetPanel">
      <i data-lucide="message-circle"></i><span>${Language.get() === 'hi' ? 'सहायक' : 'Assistant'}</span>
    </button>
    <section class="assistant-widget-panel card" id="assistantWidgetPanel" hidden aria-label="Farm assistant">
      <div class="assistant-widget-head">
        <div><strong>${Language.get() === 'hi' ? 'कृषि सहायक' : 'Farm Assistant'}</strong><small>${Language.get() === 'hi' ? 'स्थानीय डेमो' : 'Local demo'}</small></div>
        <button class="btn btn-icon assistant-widget-close" type="button" aria-label="Close assistant"><i data-lucide="x"></i></button>
      </div>
      <div class="assistant-widget-messages" aria-live="polite"><p class="assistant-message assistant-message-bot">${Assistant.getResponse('', Language.get())}</p></div>
      <form class="assistant-widget-form"><label class="sr-only" for="assistantWidgetInput">Ask the farm assistant</label><input class="form-input" id="assistantWidgetInput" placeholder="${Language.get() === 'hi' ? 'अपना सवाल लिखें' : 'Ask about your farm'}"><button class="btn btn-primary btn-icon" type="submit" aria-label="Send"><i data-lucide="send"></i></button><button class="btn btn-secondary btn-icon assistant-widget-mic" type="button" aria-label="Use voice"><i data-lucide="mic"></i></button></form>
      <a class="assistant-widget-link" href="assistant.html">${Language.get() === 'hi' ? 'पूरा सहायक खोलें' : 'Open full assistant'}</a>
    </section>`;
  document.body.appendChild(widget);

  // Create voice overlay for all pages
  createVoiceOverlay();

  const launcher = widget.querySelector('.assistant-launcher');
  const panel = widget.querySelector('.assistant-widget-panel');
  const close = widget.querySelector('.assistant-widget-close');
  const form = widget.querySelector('.assistant-widget-form');
  const input = widget.querySelector('#assistantWidgetInput');
  const messages = widget.querySelector('.assistant-widget-messages');
  const micBtn = widget.querySelector('.assistant-widget-mic');

  const addMessage = (text, kind) => {
    const p = document.createElement('p');
    p.className = `assistant-message assistant-message-${kind}`;
    p.textContent = text;
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
    Assistant.appendMessage(kind === 'bot' ? 'assistant' : 'user', text, Language.get());
  };

  const ask = async text => {
    if (!text.trim()) return;
    addMessage(text, 'user');
    const answer = await Assistant.getResponseAsync(text, Language.get());
    addMessage(answer, 'bot');
    const voiceRate = parseFloat(getStoredPreference('voice_rate', '0.9'));
    const voicePitch = parseFloat(getStoredPreference('voice_pitch', '1'));
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(answer);
      utterance.lang = Language.get() === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      window.speechSynthesis.speak(utterance);
    }
    input.value = '';
  };

  launcher.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
  });

  close.addEventListener('click', () => {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    ask(input.value);
  });

  // Voice button
  micBtn.addEventListener('click', () => {
    const voiceEnabled = getStoredPreference('voice_enabled', true);
    if (voiceEnabled === false) {
      Toast.warning(Language.get() === 'hi' ? 'आवाज़ सहायक अक्षम है। सेटिंग में सक्षम करें।' : 'Voice assistant is disabled. Enable in Settings.');
      return;
    }

    Assistant.startVoice(
      transcript => { input.value = transcript; },
      transcript => { ask(transcript); },
      error => { Toast.error(error.message); },
      Language.get()
    );
  });

  // Language change listener
  Language.onLanguageChange(() => {
    launcher.querySelector('span').textContent = Language.get() === 'hi' ? 'सहायक' : 'Assistant';
    panel.querySelector('strong').textContent = Language.get() === 'hi' ? 'कृषि सहायक' : 'Farm Assistant';
    panel.querySelector('small').textContent = Language.get() === 'hi' ? 'स्थानीय डेमो' : 'Local demo';
    input.placeholder = Language.get() === 'hi' ? 'अपना सवाल लिखें' : 'Ask about your farm';
    panel.querySelector('.assistant-widget-link').textContent = Language.get() === 'hi' ? 'पूरा सहायक खोलें' : 'Open full assistant';
  });

  if (window.lucide) lucide.createIcons();
}

function createVoiceOverlay() {
  if (document.getElementById('globalVoiceOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'globalVoiceOverlay';
  overlay.className = 'voice-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <div class="voice-overlay-content">
      <div class="voice-wave-container" id="globalVoiceWave">
        <div class="voice-bar"></div>
        <div class="voice-bar"></div>
        <div class="voice-bar"></div>
        <div class="voice-bar"></div>
        <div class="voice-bar"></div>
      </div>
      <div class="voice-overlay-status">
        <div class="voice-status-icon" id="globalVoiceIcon">
          <i data-lucide="mic"></i>
        </div>
        <h2 class="voice-overlay-title" id="globalVoiceTitle">${Language.get() === 'hi' ? 'आवाज़ सहायक तैयार है' : 'Voice Assistant Ready'}</h2>
        <p class="voice-overlay-subtitle" id="globalVoiceSubtitle">${Language.get() === 'hi' ? 'माइक्रोफ़ोन टैप करें और बोलें' : 'Tap the microphone and speak'}</p>
      </div>
      <div class="voice-transcript" id="globalVoiceTranscript" style="display: none;">
        <p id="globalTranscriptText"></p>
      </div>
      <div class="voice-overlay-controls">
        <button class="btn btn-secondary btn-lg" id="globalVoiceClose" type="button">
          <i data-lucide="x"></i>
          <span>${Language.get() === 'hi' ? 'बंद करें' : 'Close'}</span>
        </button>
        <button class="btn btn-primary btn-lg" id="globalVoiceMic" type="button">
          <i data-lucide="mic"></i>
          <span>${Language.get() === 'hi' ? 'बोलें' : 'Speak'}</span>
        </button>
      </div>
      <div class="voice-overlay-help">
        <p class="text-sm text-muted" id="globalVoiceHelp">
          ${Language.get() === 'hi' ? 'कहें: "मिट्टी", "मौसम", "फसल", "रोग", "बाजार", "मुनाफा", "डार्क मोड"' : 'Say: "soil", "weather", "crop", "disease", "market", "profit", "dark mode"'}
        </p>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  const micBtn = overlay.querySelector('#globalVoiceMic');
  const closeBtn = overlay.querySelector('#globalVoiceClose');
  const titleEl = overlay.querySelector('#globalVoiceTitle');
  const subtitleEl = overlay.querySelector('#globalVoiceSubtitle');
  const transcriptEl = overlay.querySelector('#globalVoiceTranscript');
  const transcriptText = overlay.querySelector('#globalTranscriptText');

  micBtn.addEventListener('click', () => {
    const voiceEnabled = getStoredPreference('voice_enabled', true);
    if (voiceEnabled === false) {
      Toast.warning(Language.get() === 'hi' ? 'आवाज़ सहायक अक्षम है' : 'Voice assistant is disabled');
      overlay.style.display = 'none';
      return;
    }

    titleEl.textContent = Language.get() === 'hi' ? 'सुन रहा हूँ...' : 'Listening...';
    subtitleEl.textContent = Language.get() === 'hi' ? 'अपना सवाल या आदेश बोलें' : 'Speak your question or command';
    transcriptEl.style.display = 'none';

    Assistant.startVoice(
      transcript => {
        transcriptText.textContent = transcript;
        transcriptEl.style.display = 'block';
      },
      async transcript => {
        const command = Assistant.processVoiceCommand(transcript, Language.get());

        if (command.action === 'navigate') {
          titleEl.textContent = command.message;
          Assistant.speak(command.message, Language.get());
          setTimeout(() => { window.location.href = command.page; }, 1200);
        } else if (command.action === 'theme' || command.action === 'language') {
          titleEl.textContent = command.message;
          Assistant.speak(command.message, Language.get());
          setTimeout(() => { overlay.style.display = 'none'; }, 1000);
        } else if (command.action === 'refresh') {
          titleEl.textContent = command.message;
          window.location.reload();
        } else if (command.action === 'help') {
          titleEl.textContent = command.message;
          Assistant.speak(command.message, Language.get());
        } else {
          // Chat response
          overlay.style.display = 'none';
          const answer = await Assistant.getResponseAsync(transcript, Language.get());
          Toast.success(answer, Language.get() === 'hi' ? 'सहायक' : 'Assistant');
          Assistant.speak(answer, Language.get());
        }
      },
      error => {
        titleEl.textContent = error.message;
        subtitleEl.textContent = Language.get() === 'hi' ? 'दोबारा कोशिश करें' : 'Try again';
        Toast.error(error.message);
      },
      Language.get()
    );
  });

  closeBtn.addEventListener('click', () => {
    Assistant.stopVoice();
    overlay.style.display = 'none';
  });

  // Language change listener
  Language.onLanguageChange(() => {
    titleEl.textContent = Language.get() === 'hi' ? 'आवाज़ सहायक तैयार है' : 'Voice Assistant Ready';
    subtitleEl.textContent = Language.get() === 'hi' ? 'माइक्रोफ़ोन टैप करें और बोलें' : 'Tap the microphone and speak';
    closeBtn.querySelector('span').textContent = Language.get() === 'hi' ? 'बंद करें' : 'Close';
    micBtn.querySelector('span').textContent = Language.get() === 'hi' ? 'बोलें' : 'Speak';
    overlay.querySelector('#globalVoiceHelp').textContent = Language.get() === 'hi'
      ? 'कहें: "मिट्टी", "मौसम", "फसल", "रोग", "बाजार", "मुनाफा", "डार्क मोड"'
      : 'Say: "soil", "weather", "crop", "disease", "market", "profit", "dark mode"';
  });

  if (window.lucide) lucide.createIcons();
}

// Global voice assistant toggle
window.toggleVoiceAssistant = function() {
  const voiceEnabled = getStoredPreference('voice_enabled', true);
  if (voiceEnabled === false) {
    Toast.warning(Language.get() === 'hi' ? 'आवाज़ सहायक अक्षम है। सेटिंग में सक्षम करें।' : 'Voice assistant is disabled. Enable in Settings.');
    return;
  }
  
  const overlay = document.getElementById('globalVoiceOverlay');
  if (overlay) {
    overlay.style.display = overlay.style.display === 'none' ? 'flex' : 'none';
    if (window.lucide) lucide.createIcons();
  }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  Theme.init();

  // Initialize language
  Language.init();

  // Initialize profile with demo data if not exists
  Profile.init();

  // Initialize navigation
  Navigation.init();

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Theme toggle button
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      Theme.toggle();
    });
  });

  // Language toggle button
  const updateLanguageButtons = () => {
    const lang = Language.get();
    document.querySelectorAll('[data-language-toggle]').forEach(btn => {
      btn.textContent = lang === 'en' ? 'EN' : 'HI';
    });
  };

  // Initialize language buttons
  updateLanguageButtons();

  // Listen for language changes
  Language.onLanguageChange(() => {
    updateLanguageButtons();
  });

  document.querySelectorAll('[data-language-toggle]').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      Language.toggle();
    }, true);
  });

  // Mobile menu toggle
  document.querySelectorAll('[data-sidebar-toggle]').forEach(btn => {
    btn.setAttribute('aria-label', btn.getAttribute('aria-label') || 'Open navigation');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      Navigation.toggle();
    }, true);
  });

  // Logout buttons
  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.addEventListener('click', () => {
      Session.destroy();
      Toast.success(Language.t('logoutSuccess'));
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    });
  });

  createVoiceOverlay();
  if (!document.body.classList.contains('public-page')) {
    createAssistantWidget();
  }
  console.log('Agriii initialized successfully');
});

// Export for use in other scripts
window.Agriii = {
  Storage,
  Session,
  Theme,
  Language,
  Profile,
  Toast,
  Navigation,
  Validator,
  Utils,
  translations,
  CONFIG,
  Assistant
};