import { useMemo } from "react"
import FormCarrouselStepContext from "../context/FormCarrouselStepContext"
import useFormCarrousel from "../hooks/useFormCarrousel"

export default function FormCarrouselStepProvider({
    when,
    children
}: {
    when: number
    children: React.ReactNode
}) {
    const formCarrousel = useFormCarrousel()

    const isCurrent = useMemo(() => (
        formCarrousel?.step === when
    ), [formCarrousel?.step, when])

    return (
        <FormCarrouselStepContext.Provider value={{
            step: when,
            isCurrent
        }}>
            {children}
        </FormCarrouselStepContext.Provider>
    )
}