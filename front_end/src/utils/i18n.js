import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../translations/en.json'
import vi from '../translations/vi.json'

const resources = {
    en: {
        translation: en,
    },
    vi: {
        translation: vi,
    },
};
i18n // Load translations using http (default public/assets/locals/en/translations)
    .use(LanguageDetector) // Detect language automatically
    .use(initReactI18next) // Pass i18n instance to react-i18next
    .init({
        resources,
        fallbackLng: 'en', // Use English if detected language is not available
        debug: false, // Enable debug mode in development

        interpolation: {
            escapeValue: false, // React already does escaping
        },
    });

export default i18n;
