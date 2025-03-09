"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // General
    error: "Error",
    success: "Success!",
    cancel: "Cancel",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",

    // Promo Code Form
    redeemYourCode: "Redeem Your Code",
    enterPromoCodeToClaimPrize: "Enter your promo code to claim your prize",
    enterPromoCodePlaceholder: "Enter promo code (e.g. PRIZE2024)",
    codesAreCaseInsensitive: "Codes are case-insensitive and should be entered without spaces",
    redeeming: "Redeeming...",
    redeemNow: "Redeem Now",
    promoCodesCanOnlyBeRedeemedOnce: "Promo codes can only be redeemed once and expire after their valid date.",
    seeOur: "See our",
    termsAndConditions: "terms and conditions",
    forMoreDetails: "for more details.",
    enterValidCode: "Please enter a valid promo code",
    youveEarned: "You've earned",
    invalidCode: "Invalid Code",
    codeInvalidOrRedeemed: "This code is invalid or has already been redeemed.",
    somethingWentWrong: "Something went wrong. Please try again.",
    clearInput: "Clear input",

    // Prize Display
    yourPrizeCollection: "Your Prize Collection",
    allPrizesEarned: "All the rewards you've earned so far",
    filterPrizes: "Filter Prizes",
    sortPrizes: "Sort Prizes",
    allPrizes: "All Prizes",
    availableOnly: "Available Only",
    redeemedOnly: "Redeemed Only",
    byCategory: "By Category",
    discounts: "Discounts",
    rewards: "Rewards",
    special: "Special",
    sortBy: "Sort By",
    date: "Date",
    oldestFirst: "Oldest first",
    newestFirst: "Newest first",
    name: "Name",
    value: "Value",
    lowToHigh: "Low to High",
    highToLow: "High to Low",
    category: "Category",
    searchPrizes: "Search prizes...",
    prizeFound: "prize found",
    prizesFound: "prizes found",
    loadingYourPrizes: "Loading your prizes...",
    redeemed: "Redeemed",
    available: "Available",
    expires: "Expires",
    noPrizesFound: "No prizes found",
    tryDifferentSearchTerm: "Try a different search term",
    redeemPromoCodeToEarnFirstPrize: "Redeem a promo code to earn your first prize!",
    clearFilters: "Clear filters",

    // Recent Activity
    recentActivity: "Recent Activity",
    recentPromoCodeRedemptionHistory: "Your recent promo code redemption history",
    clearActivity: "Clear activity",
    clearActivityHistory: "Clear Activity History",
    clearActivityConfirmation: "This will remove all your recent activity history. This action cannot be undone.",
    clearHistory: "Clear History",
    redeemedCode: "Redeemed code",
    failedToRedeem: "Failed to redeem",
    earned: "Earned",
    noRecentActivity: "No recent activity to display",
    redeemFirstCodeToSeeHere: "Redeem your first code to see it here",
    secondsAgo: "seconds ago",
    minutesAgo: "minutes ago",
    hoursAgo: "hours ago",
    daysAgo: "days ago",

    // Prize Detail Modal
    viewDetails: "View Details",

    // About Page
    aboutUs: "About us",
    contactUnavailable: "We're currently unavailable. Please try again later.",
    tryAgainLater: "Try again later",
    albertoDescription: "Your favorite brother",
    davidDescription: "Your not so favorite brother",


    // Theme
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    toggleTheme: "Toggle theme",

    // Filters
    all: "All",
    available: "Available",
    discount: "Discount",
    reward: "Reward",

    // Database errors
    failedToLoadPrizes: "Failed to load prizes. Please try again.",
    failedToLoadActivities: "Failed to load activities. Please try again.",
    failedToUpdatePrize: "Failed to update prize. Please try again.",
    failedToClearActivities: "Failed to clear activities. Please try again.",
    activitiesCleared: "Activity history has been cleared.",
    databaseError: "Database error. Please try again later.",
    databaseConnectionError: "Unable to connect to the database. Please check your connection and try again.",
    authenticationError: "Authentication error. Please log in again.",
    validationError: "The data you entered is invalid. Please check and try again.",
    notFoundError: "The requested resource was not found.",
    permissionError: "You don't have permission to perform this action.",
    unknownError: "An unknown error occurred. Please try again later.",

    // English database setup translations
    databaseSetup: "Database Setup",
    databaseSetupDescription: "Set up the database for the Promo Code Rewards application",
    databaseSetupInstructions:
      "Click the button below to set up the database schema and sample data. This only needs to be done once.",
    setupDatabase: "Set Up Database",
    settingUpDatabase: "Setting up database...",
    setupError: "Setup Error",
    databaseSetupComplete: "Database setup completed successfully",
    databaseSetupRequired: "Database setup is required to use this application",
    manualSetupOption: "Manual Setup Option",
    manualSetupDescription:
      "If automatic setup fails, you can manually set up the database using SQL in the Supabase dashboard.",
    viewSetupInstructions: "View Setup Instructions",
  },
  es: {
    // General
    error: "Error",
    success: "¡Éxito!",
    cancel: "Cancelar",
    previous: "Anterior",
    next: "Siguiente",
    page: "Página",
    of: "de",

    // Promo Code Form
    redeemYourCode: "Canjea tu Código",
    enterPromoCodeToClaimPrize: "Ingresa tu código promocional para reclamar tu premio",
    enterPromoCodePlaceholder: "Ingresa código promo (ej. PREMIO2024)",
    codesAreCaseInsensitive: "Los códigos no distinguen entre mayúsculas y minúsculas y deben ingresarse sin espacios",
    redeeming: "Canjeando...",
    redeemNow: "Canjear Ahora",
    promoCodesCanOnlyBeRedeemedOnce:
      "Los códigos promocionales solo se pueden canjear una vez y caducan después de su fecha válida.",
    seeOur: "Consulta nuestros",
    termsAndConditions: "términos y condiciones",
    forMoreDetails: "para más detalles.",
    enterValidCode: "Por favor ingresa un código promocional válido",
    youveEarned: "Has ganado",
    invalidCode: "Código Inválido",
    codeInvalidOrRedeemed: "Este código es inválido o ya ha sido canjeado.",
    somethingWentWrong: "Algo salió mal. Por favor intenta de nuevo.",
    clearInput: "Borrar entrada",

    // Prize Display
    yourPrizeCollection: "Tu Colección de Premios",
    allPrizesEarned: "Todas las recompensas que has ganado hasta ahora",
    filterPrizes: "Filtrar Premios",
    sortPrizes: "Ordenar Premios",
    allPrizes: "Todos los Premios",
    availableOnly: "Solo Disponibles",
    redeemedOnly: "Solo Canjeados",
    byCategory: "Por Categoría",
    discounts: "Descuentos",
    rewards: "Recompensas",
    special: "Especiales",
    sortBy: "Ordenar Por",
    date: "Fecha",
    oldestFirst: "Más antiguos primero",
    newestFirst: "Más recientes primero",
    name: "Nombre",
    value: "Valor",
    lowToHigh: "De menor a mayor",
    highToLow: "De mayor a menor",
    category: "Categoría",
    searchPrizes: "Buscar premios...",
    prizeFound: "premio encontrado",
    prizesFound: "premios encontrados",
    loadingYourPrizes: "Cargando tus premios...",
    redeemed: "Canjeado",
    available: "Disponible",
    expires: "Expira",
    noPrizesFound: "No se encontraron premios",
    tryDifferentSearchTerm: "Intenta con un término de búsqueda diferente",
    redeemPromoCodeToEarnFirstPrize: "¡Canjea un código promocional para ganar tu primer premio!",
    clearFilters: "Borrar filtros",

    // Recent Activity
    recentActivity: "Actividad Reciente",
    recentPromoCodeRedemptionHistory: "Tu historial reciente de canje de códigos promocionales",
    clearActivity: "Borrar actividad",
    clearActivityHistory: "Borrar Historial de Actividad",
    clearActivityConfirmation:
      "Esto eliminará todo tu historial de actividad reciente. Esta acción no se puede deshacer.",
    clearHistory: "Borrar Historial",
    redeemedCode: "Código canjeado",
    failedToRedeem: "Falló al canjear",
    earned: "Ganado",
    noRecentActivity: "No hay actividad reciente para mostrar",
    redeemFirstCodeToSeeHere: "Canjea tu primer código para verlo aquí",
    secondsAgo: "segundos atrás",
    minutesAgo: "minutos atrás",
    hoursAgo: "horas atrás",
    daysAgo: "días atrás",

    // Prize Detail Modal
    viewDetails: "Ver Detalles",

    // About Page
    aboutUs: "Sobre nosotros",
    contactUnavailable: "Actualmente no estamos disponibles. Por favor intenta más tarde.",
    tryAgainLater: "Intenta más tarde",
    albertoDescription: "Tu hermano favorito",
    davidDescription: "Tu hermano no tan favorito",

    // Theme
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    toggleTheme: "Cambiar tema",

    // Filters
    all: "Todos",
    available: "Disponible",
    discount: "Descuento",
    reward: "Recompensa",

    // Database errors
    failedToLoadPrizes: "Error al cargar premios. Por favor, inténtalo de nuevo.",
    failedToLoadActivities: "Error al cargar actividades. Por favor, inténtalo de nuevo.",
    failedToUpdatePrize: "Error al actualizar el premio. Por favor, inténtalo de nuevo.",
    failedToClearActivities: "Error al borrar actividades. Por favor, inténtalo de nuevo.",
    activitiesCleared: "El historial de actividades ha sido borrado.",
    databaseError: "Error de base de datos. Por favor, inténtalo más tarde.",
    databaseConnectionError:
      "No se puede conectar a la base de datos. Por favor, verifica tu conexión e inténtalo de nuevo.",
    authenticationError: "Error de autenticación. Por favor, inicia sesión de nuevo.",
    validationError: "Los datos que ingresaste son inválidos. Por favor, verifica e inténtalo de nuevo.",
    notFoundError: "El recurso solicitado no fue encontrado.",
    permissionError: "No tienes permiso para realizar esta acción.",
    unknownError: "Ocurrió un error desconocido. Por favor, inténtalo más tarde.",

    // Spanish database setup translations
    databaseSetup: "Configuración de Base de Datos",
    databaseSetupDescription: "Configurar la base de datos para la aplicación de Recompensas de Códigos Promocionales",
    databaseSetupInstructions:
      "Haga clic en el botón de abajo para configurar el esquema de la base de datos y los datos de muestra. Esto solo necesita hacerse una vez.",
    setupDatabase: "Configurar Base de Datos",
    settingUpDatabase: "Configurando base de datos...",
    setupError: "Error de Configuración",
    databaseSetupComplete: "Configuración de base de datos completada con éxito",
    databaseSetupRequired: "Se requiere configuración de base de datos para usar esta aplicación",
    manualSetupOption: "Opción de Configuración Manual",
    manualSetupDescription:
      "Si la configuración automática falla, puede configurar manualmente la base de datos usando SQL en el panel de Supabase.",
    viewSetupInstructions: "Ver Instrucciones de Configuración",
  },
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

