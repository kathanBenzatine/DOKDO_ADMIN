// src/i18n.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEN from './locales/en/translation.json'
import translationKR from './locales/kr/translation.json'
import store from './store'

const resources = {
    en: {
        translation: translationEN,
    },
    kr: {
        translation: translationKR,
    },
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        supportedLngs: ['en', 'kr'],
        lng: store.getState().theme.language || 'en',
    })

store.subscribe(() => {
    const currentLanguage = store.getState().theme.language
    i18n.changeLanguage(currentLanguage)
})
export default i18n
