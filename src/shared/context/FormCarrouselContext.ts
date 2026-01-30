import { createContext } from "react"

const FormCarrouselContext = createContext<{
    step: number,
    dynamicHeight?: boolean,
    submit: () => Promise<void>,
    setStep: (step: number) => void,
    nextStep: () => void,
    prevStep: () => void
} | null>(null)

export default FormCarrouselContext