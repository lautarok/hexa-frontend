import React from "react"
import FormCarrouselContext from "../context/FormCarrouselContext"
import useStep from "../hooks/useStep"

export default function FormCarrouselProvider({
    children,
    step,
    dynamicHeight,
    onSubmit
}: {
    children: React.ReactNode
    step: ReturnType<typeof useStep>
    dynamicHeight?: boolean
    onSubmit: () => Promise<void>
}) {
    return (
        <FormCarrouselContext.Provider value={{
            step: step.current,
            dynamicHeight: dynamicHeight,
            submit: onSubmit,
            setStep: step.set,
            nextStep: step.next,
            prevStep: step.prev
        }}>
            {children}
        </FormCarrouselContext.Provider>
    )
}