import translationEn from "@/public/i18n/en.json"
import translationEs from "@/public/i18n/es.json"
import translationFr from "@/public/i18n/fr.json"
import translationPt from "@/public/i18n/pt.json"
import translationNl from "@/public/i18n/nl.json"

const getTraduction = (lang: string) => {
    switch(lang) {
        case "en":
            return translationEn
        case "fr":
            return translationFr
        case "pt":
            return translationPt
        case "nl":
            return translationNl
        default:
            return translationEs
    }
}

export default getTraduction