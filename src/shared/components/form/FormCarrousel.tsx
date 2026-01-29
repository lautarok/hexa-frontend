"use client"

import React, { forwardRef, useImperativeHandle } from "react";
import useStep from "../../hooks/useStep";
import FormCarrouselProvider from "../../providers/FormCarrouselProvider";
import FormCarrouselStepProvider from "../../providers/FormCarrouselStepProvider";

export type FormCarrouselHandle = {
    step: () => number
    setStep: (step: number) => void,
    nextStep: () => void,
    prevStep: () => void
}

const FormCarrousel = forwardRef<FormCarrouselHandle, {
    items: React.ReactNode[],
    onSubmit: () => Promise<void>
}>(
    ({items, onSubmit}, ref) => {
        const step = useStep(0, items.length - 1)

        useImperativeHandle(ref, () => ({
            step: () => step.current,
            setStep: step.set,
            nextStep: step.next,
            prevStep: step.prev
        }))

        return (
            <FormCarrouselProvider step={step} onSubmit={onSubmit}>
                <div className="w-full h-fit flex flex-wrap">
                    <div
                        className="transition-transform duration-300 ease-in-out grid items-center flex-shrink-0"
                        style={{
                            width: `${100 * items.length}%`,
                            transform: `translateX(-${(100 / items.length) * step.current}%)`,
                            gridTemplateColumns: `repeat(${items.length}, 1fr)`
                        }}
                    >
                        {
                            items.map((item, index) => (
                                <FormCarrouselStepProvider
                                    when={index}
                                    key={index}
                                >
                                    <div
                                        key={index}
                                        className="w-full h-full transition-opacity duration-200 flex flex-col gap-6 justify-center"
                                        style={{
                                            opacity: step.current === index ? 1 : 0,
                                            pointerEvents: step.current === index ? "all" : "none"
                                        }}
                                    >
                                        {item}
                                    </div>
                                </FormCarrouselStepProvider>
                            ))
                        }
                    </div>
                </div>
            </FormCarrouselProvider>
        )
    }
)

FormCarrousel.displayName = "Form carrousel"

export default FormCarrousel