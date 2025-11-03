"use client"

import { useState, useCallback } from "react"

export type Language = "en" | "kn" | "ta"

export const translations = {
  en: {
    // Navigation
    nav: {
      title: "CrimeAroundMe",
      subtitle: "Safety Intelligence Platform",
    },
    // Hero
    hero: {
      title: "CrimeAroundMe",
      subtitle: "Real-Time Crime Awareness & Safety Platform",
      tagline: "Know what's happening around you — before it affects you.",
    },
    // Tabs
    tabs: {
      map: "Crime Map",
      analytics: "Analytics",
      feed: "Live Feed",
      report: "Report Crime",
      ai: "AI Safety",
    },
    // SOS
    sos: {
      sosTitle: "Emergency SOS",
      sosDesc: "Hold to send distress signal to emergency services",
      safeTips: "Safety Tips",
    },
    // Common
    login: "Login / Sign Up",
    logout: "Logout",
    welcome: "Welcome",
  },
  kn: {
    nav: {
      title: "ಕ್ರೈಮ್ ಅರೌಂಡ್ಮೆ",
      subtitle: "ಸುರಕ್ಷತೆ ಬುದ್ಧಿಮತ್ತೆ ವೇದಿ",
    },
    hero: {
      title: "ಕ್ರೈಮ್ ಅರೌಂಡ್ಮೆ",
      subtitle: "ನೈಜ-ಸಮಯದ ಅಪರಾಧ ಜಾಗರೂಕತೆ ಪ್ಲಾಟ್ಫಾರ್ಮ್",
      tagline: "ನಿಮ್ಮ ಸುತ್ತಲೂ ಏನು ನಡೆಯುತ್ತಿದೆ ಎಂದು ತಿಳಿದುಕೊಳ್ಳಿ",
    },
    tabs: {
      map: "ಅಪರಾಧ ನಕ್ಷೆ",
      analytics: "ವಿಶ್ಲೇಷಣ",
      feed: "ನೇರ ಫೀಡ್",
      report: "ಅಪರಾಧ ವರದಿ",
      ai: "AI ಸುರಕ್ಷೆ",
    },
    sos: {
      sosTitle: "ತುರ್ತು ಎಸ್ಒಎಸ್",
      sosDesc: "ಆಪತ್ತು ಸೇವೆಗಳಗೆ ಆಪತ್ತು ಸಿಗ್ನಲ್ ಕಳುಹಿಸಿ",
      safeTips: "ಸುರಕ್ಷತೆ ಸಲಹೆ",
    },
    login: "ಲಾಗಿನ್ / ಸೈನ್ ಅಪ್",
    logout: "ಲಾಗ್‌ಔಟ್",
    welcome: "ಸ್ವಾಗತ",
  },
  ta: {
    nav: {
      title: "குற்றங்களைச் சுற்றியே",
      subtitle: "பாதுகாப்பு நுண்ணறிவு தளம்",
    },
    hero: {
      title: "குற்றங்களைச் சுற்றியே",
      subtitle: "நிஜ-நேர குற்ற விழிப்புணர்வு தளம்",
      tagline: "உங்களைச் சுற்றி என்ன நடக்கிறது என்பதை அறியவும்",
    },
    tabs: {
      map: "குற்ற வரைபடம்",
      analytics: "பிளாக்",
      feed: "நேரடி ஊட்டம்",
      report: "குற்றம் பதிவு",
      ai: "AI பாதுகாப்பு",
    },
    sos: {
      sosTitle: "அவசர SOS",
      sosDesc: "அவசரப் பணிகளுக்கு ஆபத்துக் குறிப்பு அனுப்பவும்",
      safeTips: "பாதுகாப்பு உதவிக்குறிப்புகள்",
    },
    login: "உள்நுழைக / பதிவுசெய்க",
    logout: "வெளியேறு",
    welcome: "வரவேற்பு",
  },
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en")

  const t = useCallback(() => {
    return translations[language]
  }, [language])

  return { language, setLanguage, t: t() }
}
