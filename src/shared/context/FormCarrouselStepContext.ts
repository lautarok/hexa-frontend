import { createContext } from "react"

const FormCarrouselStepContext = createContext<{
    step: number,
    isCurrent: boolean
} | null>(null)

export default FormCarrouselStepContext