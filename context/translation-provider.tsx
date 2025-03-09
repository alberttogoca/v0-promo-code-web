'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Language = 'en' | 'es';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // General
    error: 'Error',
    success: 'Success!',
    cancel: 'Cancel',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',

    // Promo Code Form
    redeemYourCode: 'Redeem Your Code',
    enterPromoCodeToClaimPrize: 'Enter your promo code to claim your prize',
    enterPromoCodePlaceholder: 'Enter promo code (e.g. PRIZE2024)',
    codesAreCaseInsensitive:
      'Codes are case-insensitive and should be entered without spaces',
    redeeming: 'Redeeming...',
    redeemNow: 'Redeem Now',
    promoCodesCanOnlyBeRedeemedOnce:
      'Promo codes can only be redeemed once and expire after their valid date.',
    seeOur: 'See our',
    termsAndConditions: 'terms and conditions',
    forMoreDetails: 'for more details.',
    enterValidCode: 'Please enter a valid promo code',
    youveEarned: "You've earned",
    invalidCode: 'Invalid Code',
    codeInvalidOrRedeemed: 'This code is invalid or has already been redeemed.',
    somethingWentWrong: 'Something went wrong. Please try again.',
    clearInput: 'Clear input',

    // Prize Display
    yourPrizeCollection: 'Your Prize Collection',
    allPrizesEarned: "All the rewards you've earned so far",
    filterPrizes: 'Filter Prizes',
    sortPrizes: 'Sort Prizes',
    allPrizes: 'All Prizes',
    availableOnly: 'Available Only',
    redeemedOnly: 'Redeemed Only',
    byCategory: 'By Category',
    discounts: 'Discounts',
    rewards: 'Rewards',
    special: 'Special',
    sortBy: 'Sort By',
    date: 'Date',
    oldestFirst: 'Oldest first',
    newestFirst: 'Newest first',
    name: 'Name',
    value: 'Value',
    lowToHigh: 'Low to High',
    highToLow: 'High to Low',
    category: 'Category',
    searchPrizes: 'Search prizes...',
    prizeFound: 'prize found',
    prizesFound: 'prizes found',
    loadingYourPrizes: 'Loading your prizes...',
    redeemed: 'Redeemed',
    available: 'Available',
    expires: 'Expires',
    noPrizesFound: 'No prizes found',
    tryDifferentSearchTerm: 'Try a different search term',
    redeemPromoCodeToEarnFirstPrize:
      'Redeem a promo code to earn your first prize!',
    clearFilters: 'Clear filters',

    // Recent Activity
    recentActivity: 'Recent Activity',
    recentPromoCodeRedemptionHistory:
      'Your recent promo code redemption history',
    clearActivity: 'Clear activity',
    clearActivityHistory: 'Clear Activity History',
    clearActivityConfirmation:
      'This will remove all your recent activity history. This action cannot be undone.',
    clearHistory: 'Clear History',
    redeemedCode: 'Redeemed code',
    failedToRedeem: 'Failed to redeem',
    earned: 'Earned',
    noRecentActivity: 'No recent activity to display',
    redeemFirstCodeToSeeHere: 'Redeem your first code to see it here',
    secondsAgo: 'seconds ago',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',

    // Prize Detail Modal
    viewDetails: 'View Details',

    // About Page
    aboutUs: 'About us',
    contactUnavailable: "We're currently unavailable. Please try again later.",
    tryAgainLater: 'Try again later',
    albertoDescription: 'Your favorite brother',
    davidDescription: 'Your not so favorite brother',

    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    toggleTheme: 'Toggle theme',

    // Filters
    all: 'All',
    discount: 'Discount',
    reward: 'Reward',

    // Database errors
    failedToLoadPrizes: 'Failed to load prizes. Please try again.',
    failedToLoadActivities: 'Failed to load activities. Please try again.',
    failedToUpdatePrize: 'Failed to update prize. Please try again.',
    failedToClearActivities: 'Failed to clear activities. Please try again.',
    activitiesCleared: 'Activity history has been cleared.',
    databaseError: 'Database error. Please try again later.',
    databaseConnectionError:
      'Unable to connect to the database. Please check your connection and try again.',
    authenticationError: 'Authentication error. Please log in again.',
    validationError:
      'The data you entered is invalid. Please check and try again.',
    notFoundError: 'The requested resource was not found.',
    permissionError: "You don't have permission to perform this action.",
    unknownError: 'An unknown error occurred. Please try again later.',

    // English database setup translations
    databaseSetup: 'Database Setup',
    databaseSetupDescription:
      'Set up the database for the Promo Code Rewards application',
    databaseSetupInstructions:
      'Click the button below to set up the database schema and sample data. This only needs to be done once.',
    setupDatabase: 'Set Up Database',
    settingUpDatabase: 'Setting up database...',
    setupError: 'Setup Error',
    databaseSetupComplete: 'Database setup completed successfully',
    databaseSetupRequired: 'Database setup is required to use this application',
    manualSetupOption: 'Manual Setup Option',
    manualSetupDescription:
      'If automatic setup fails, you can manually set up the database using SQL in the Supabase dashboard.',
    viewSetupInstructions: 'View Setup Instructions',
    // Footer
    footerTagline: 'Redeem promo codes and discover amazing rewards instantly.',
    navigation: 'Navigation',
    resources: 'Resources',
    contact: 'Contact',
    privacyPolicy: 'Privacy Policy',
    faq: 'FAQ',
    allRightsReserved: 'All rights reserved.',

    // Terms and Conditions
    termsOfUse: 'Terms of Use',
    termsOfUseDescription:
      'By using our Promo Code Rewards application, you agree to comply with these terms and conditions. These terms govern your use of our application and services.',
    promoCodeRules: 'Promo Code Rules',
    promoCodeRule1: 'Each promo code can only be redeemed once.',
    promoCodeRule2:
      'Promo codes may have expiration dates after which they become invalid.',
    promoCodeRule3:
      'We reserve the right to modify or cancel promo codes at any time.',
    promoCodeRule4:
      'Promo codes cannot be transferred, sold, or exchanged for cash.',
    promoCodeRule5:
      'Attempting to redeem invalid or expired codes may result in account restrictions.',
    userResponsibilities: 'User Responsibilities',
    userResponsibilitiesDescription:
      'Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.',
    disclaimers: 'Disclaimers',
    disclaimersDescription:
      "Our application is provided 'as is' without warranties of any kind, either express or implied. We do not guarantee that the application will be error-free or uninterrupted.",

    // Privacy Policy
    informationWeCollect: 'Information We Collect',
    informationWeCollectDescription:
      'We collect information that you provide directly to us, such as when you create an account, redeem a promo code, or contact us for support.',
    howWeUseInformation: 'How We Use Information',
    informationUse1: 'To provide, maintain, and improve our services.',
    informationUse2: 'To process transactions and send related information.',
    informationUse3:
      'To send technical notices, updates, and administrative messages.',
    informationUse4: 'To respond to your comments, questions, and requests.',
    dataSecurity: 'Data Security',
    dataSecurityDescription:
      'We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.',
    cookiesPolicy: 'Cookies Policy',
    cookiesPolicyDescription:
      'We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our application.',

    // FAQ
    faqQuestion1: 'How do I redeem a promo code?',
    faqAnswer1:
      "To redeem a promo code, navigate to the 'Redeem' page, enter your code in the input field, and click the 'Redeem Now' button. If the code is valid, your prize will be added to your collection immediately.",
    faqQuestion2: "What happens if my promo code doesn't work?",
    faqAnswer2:
      "If your promo code doesn't work, it may be invalid, expired, or already redeemed. You can check the status of your redemption attempts in the 'Recent Activity' section.",
    faqQuestion3: 'Can I transfer my prizes to another account?',
    faqAnswer3:
      'No, prizes are linked to the account that redeemed them and cannot be transferred to another account.',
    faqQuestion4: 'How long do prizes remain valid after redemption?',
    faqAnswer4:
      'The validity period varies depending on the prize. You can check the expiration date of each prize in your prize collection.',
    faqQuestion5: 'Can I use multiple promo codes at once?',
    faqAnswer5:
      'No, you can only redeem one promo code at a time. However, you can redeem multiple codes sequentially.',
  },
  es: {
    // General
    error: 'Error',
    success: '¡Éxito!',
    cancel: 'Cancelar',
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
    of: 'de',

    // Promo Code Form
    redeemYourCode: 'Canjea tu Código',
    enterPromoCodeToClaimPrize:
      'Ingresa tu código promocional para reclamar tu premio',
    enterPromoCodePlaceholder: 'Ingresa código promo (ej. PREMIO2024)',
    codesAreCaseInsensitive:
      'Los códigos no distinguen entre mayúsculas y minúsculas y deben ingresarse sin espacios',
    redeeming: 'Canjeando...',
    redeemNow: 'Canjear Ahora',
    promoCodesCanOnlyBeRedeemedOnce:
      'Los códigos promocionales solo se pueden canjear una vez y caducan después de su fecha válida.',
    seeOur: 'Consulta nuestros',
    termsAndConditions: 'términos y condiciones',
    forMoreDetails: 'para más detalles.',
    enterValidCode: 'Por favor ingresa un código promocional válido',
    youveEarned: 'Has ganado',
    invalidCode: 'Código Inválido',
    codeInvalidOrRedeemed: 'Este código es inválido o ya ha sido canjeado.',
    somethingWentWrong: 'Algo salió mal. Por favor intenta de nuevo.',
    clearInput: 'Borrar entrada',

    // Prize Display
    yourPrizeCollection: 'Tu Colección de Premios',
    allPrizesEarned: 'Todas las recompensas que has ganado hasta ahora',
    filterPrizes: 'Filtrar Premios',
    sortPrizes: 'Ordenar Premios',
    allPrizes: 'Todos los Premios',
    availableOnly: 'Solo Disponibles',
    redeemedOnly: 'Solo Canjeados',
    byCategory: 'Por Categoría',
    discounts: 'Descuentos',
    rewards: 'Recompensas',
    special: 'Especiales',
    sortBy: 'Ordenar Por',
    date: 'Fecha',
    oldestFirst: 'Más antiguos primero',
    newestFirst: 'Más recientes primero',
    name: 'Nombre',
    value: 'Valor',
    lowToHigh: 'De menor a mayor',
    highToLow: 'De mayor a menor',
    category: 'Categoría',
    searchPrizes: 'Buscar premios...',
    prizeFound: 'premio encontrado',
    prizesFound: 'premios encontrados',
    loadingYourPrizes: 'Cargando tus premios...',
    redeemed: 'Canjeado',
    available: 'Disponible',
    expires: 'Expira',
    noPrizesFound: 'No se encontraron premios',
    tryDifferentSearchTerm: 'Intenta con un término de búsqueda diferente',
    redeemPromoCodeToEarnFirstPrize:
      '¡Canjea un código promocional para ganar tu primer premio!',
    clearFilters: 'Borrar filtros',

    // Recent Activity
    recentActivity: 'Actividad Reciente',
    recentPromoCodeRedemptionHistory:
      'Tu historial reciente de canje de códigos promocionales',
    clearActivity: 'Borrar actividad',
    clearActivityHistory: 'Borrar Historial de Actividad',
    clearActivityConfirmation:
      'Esto eliminará todo tu historial de actividad reciente. Esta acción no se puede deshacer.',
    clearHistory: 'Borrar Historial',
    redeemedCode: 'Código canjeado',
    failedToRedeem: 'Falló al canjear',
    earned: 'Ganado',
    noRecentActivity: 'No hay actividad reciente para mostrar',
    redeemFirstCodeToSeeHere: 'Canjea tu primer código para verlo aquí',
    secondsAgo: 'segundos atrás',
    minutesAgo: 'minutos atrás',
    hoursAgo: 'horas atrás',
    daysAgo: 'días atrás',

    // Prize Detail Modal
    viewDetails: 'Ver Detalles',

    // About Page
    aboutUs: 'Sobre nosotros',
    contactUnavailable:
      'Actualmente no estamos disponibles. Por favor intenta más tarde.',
    tryAgainLater: 'Intenta más tarde',
    albertoDescription: 'Tu hermano favorito',
    davidDescription: 'Tu hermano no tan favorito',

    // Theme
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    toggleTheme: 'Cambiar tema',

    // Filters
    all: 'Todos',
    discount: 'Descuento',
    reward: 'Recompensa',

    // Database errors
    failedToLoadPrizes:
      'Error al cargar premios. Por favor, inténtalo de nuevo.',
    failedToLoadActivities:
      'Error al cargar actividades. Por favor, inténtalo de nuevo.',
    failedToUpdatePrize:
      'Error al actualizar el premio. Por favor, inténtalo de nuevo.',
    failedToClearActivities:
      'Error al borrar actividades. Por favor, inténtalo de nuevo.',
    activitiesCleared: 'El historial de actividades ha sido borrado.',
    databaseError: 'Error de base de datos. Por favor, inténtalo más tarde.',
    databaseConnectionError:
      'No se puede conectar a la base de datos. Por favor, verifica tu conexión e inténtalo de nuevo.',
    authenticationError:
      'Error de autenticación. Por favor, inicia sesión de nuevo.',
    validationError:
      'Los datos que ingresaste son inválidos. Por favor, verifica e inténtalo de nuevo.',
    notFoundError: 'El recurso solicitado no fue encontrado.',
    permissionError: 'No tienes permiso para realizar esta acción.',
    unknownError:
      'Ocurrió un error desconocido. Por favor, inténtalo más tarde.',

    // Spanish database setup translations
    databaseSetup: 'Configuración de Base de Datos',
    databaseSetupDescription:
      'Configurar la base de datos para la aplicación de Recompensas de Códigos Promocionales',
    databaseSetupInstructions:
      'Haga clic en el botón de abajo para configurar el esquema de la base de datos y los datos de muestra. Esto solo necesita hacerse una vez.',
    setupDatabase: 'Configurar Base de Datos',
    settingUpDatabase: 'Configurando base de datos...',
    setupError: 'Error de Configuración',
    databaseSetupComplete:
      'Configuración de base de datos completada con éxito',
    databaseSetupRequired:
      'Se requiere configuración de base de datos para usar esta aplicación',
    manualSetupOption: 'Opción de Configuración Manual',
    manualSetupDescription:
      'Si la configuración automática falla, puede configurar manualmente la base de datos usando SQL en el panel de Supabase.',
    viewSetupInstructions: 'Ver Instrucciones de Configuración',
  },

  // Footer
  footerTagline:
    'Canjea códigos promocionales y descubre recompensas increíbles al instante.',
  navigation: 'Navegación',
  resources: 'Recursos',
  contact: 'Contacto',
  privacyPolicy: 'Política de privacidad',
  faq: 'Preguntas frecuentes',
  allRightsReserved: 'Todos los derechos reservados.',

  // Terms and Conditions
  termsOfUse: 'Términos de uso',
  termsOfUseDescription:
    'Al utilizar nuestra aplicación de Recompensas con Códigos Promocionales, aceptas cumplir con estos términos y condiciones. Estos términos rigen tu uso de nuestra aplicación y servicios.',
  promoCodeRules: 'Reglas de los códigos promocionales',
  promoCodeRule1: 'Cada código promocional solo puede canjearse una vez.',
  promoCodeRule2:
    'Los códigos promocionales pueden tener fechas de caducidad, después de las cuales se vuelven inválidos.',
  promoCodeRule3:
    'Nos reservamos el derecho de modificar o cancelar los códigos promocionales en cualquier momento.',
  promoCodeRule4:
    'Los códigos promocionales no pueden ser transferidos, vendidos ni canjeados por dinero en efectivo.',
  promoCodeRule5:
    'Intentar canjear códigos inválidos o caducados puede resultar en restricciones en la cuenta.',
  userResponsibilities: 'Responsabilidades del usuario',
  userResponsibilitiesDescription:
    'Los usuarios son responsables de mantener la confidencialidad de la información de su cuenta y de todas las actividades que se realicen bajo ella.',
  disclaimers: 'Descargos de responsabilidad',
  disclaimersDescription:
    "Nuestra aplicación se proporciona 'tal cual' sin garantías de ningún tipo, ya sean expresas o implícitas. No garantizamos que la aplicación esté libre de errores o que funcione sin interrupciones.",

  // Privacy Policy
  informationWeCollect: 'Información que recopilamos',
  informationWeCollectDescription:
    'Recopilamos la información que nos proporcionas directamente, por ejemplo, cuando creas una cuenta, canjeas un código promocional o te pones en contacto con nosotros para obtener soporte.',
  howWeUseInformation: 'Cómo usamos la información',
  informationUse1: 'Para proporcionar, mantener y mejorar nuestros servicios.',
  informationUse2:
    'Para procesar transacciones y enviar información relacionada.',
  informationUse3:
    'Para enviar avisos técnicos, actualizaciones y mensajes administrativos.',
  informationUse4: 'Para responder a tus comentarios, preguntas y solicitudes.',
  dataSecurity: 'Seguridad de los datos',
  dataSecurityDescription:
    'Tomamos medidas razonables para proteger tu información contra pérdida, robo, uso indebido y acceso no autorizado.',
  cookiesPolicy: 'Política de cookies',
  cookiesPolicyDescription:
    'Utilizamos cookies y tecnologías similares para recopilar información sobre tus actividades de navegación y para distinguirte de otros usuarios de nuestra aplicación.',

  // FAQ
  faqQuestion1: '¿Cómo canjeo un código promocional?',
  faqAnswer1:
    "Para canjear un código promocional, navega a la página 'Canjear', introduce tu código en el campo correspondiente y haz clic en el botón 'Canjear ahora'. Si el código es válido, tu premio se añadirá a tu colección de inmediato.",
  faqQuestion2: '¿Qué ocurre si mi código promocional no funciona?',
  faqAnswer2:
    "Si tu código promocional no funciona, puede que sea inválido, esté caducado o ya haya sido canjeado. Puedes verificar el estado de tus intentos de canje en la sección 'Actividad reciente'.",
  faqQuestion3: '¿Puedo transferir mis premios a otra cuenta?',
  faqAnswer3:
    'No, los premios están vinculados a la cuenta que los canjeó y no pueden transferirse a otra cuenta.',
  faqQuestion4:
    '¿Cuánto tiempo permanecen válidos los premios después de ser canjeados?',
  faqAnswer4:
    'El período de validez varía según el premio. Puedes consultar la fecha de caducidad de cada premio en tu colección de premios.',
  faqQuestion5: '¿Puedo usar múltiples códigos promocionales a la vez?',
  faqAnswer5:
    'No, solo puedes canjear un código promocional a la vez. Sin embargo, puedes canjear varios códigos de forma secuencial.',
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
