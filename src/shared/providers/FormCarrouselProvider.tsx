import React from "react"
import FormCarrouselContext from "../context/FormCarrouselContext"
import useStep from "../hooks/useStep"
import useFormCarrouselStep from "../hooks/useFormCarrouselStep"

export default function FormCarrouselProvider({
    children,
    step,
    onSubmit
}: {
    children: React.ReactNode
    step: ReturnType<typeof useStep>
    onSubmit: () => Promise<void>
}) {
    return (
        <FormCarrouselContext.Provider value={{
            step: step.current,
            submit: onSubmit,
            setStep: step.set,
            nextStep: step.next,
            prevStep: step.prev
        }}>
            {children}
        </FormCarrouselContext.Provider>
    )
}