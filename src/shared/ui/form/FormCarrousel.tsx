"use client"

import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import useStep from "../../hooks/useStep";
import FormCarrouselProvider from "../../providers/FormCarrouselProvider";
import FormCarrouselStepProvider from "../../providers/FormCarrouselStepProvider";
import FormCarrouselStep from "./FormCarrouselStep";

export type FormCarrouselHandle = {
    step: () => number
    setStep: (step: number) => void,
    nextStep: () => void,
    prevStep: () => void
}

const FormCarrousel = forwardRef<FormCarrouselHandle, {
    items: React.ReactNode[],
    dynamicHeight?: boolean,
    onSubmit: () => Promise<void>
}>(
    ({items, dynamicHeight, onSubmit}, ref) => {
        const step = useStep(0, items.length - 1)

        useImperativeHandle(ref, () => ({
            step: () => step.current,
            setStep: step.set,
            nextStep: step.next,
            prevStep: step.prev
        }))

        return (
            <FormCarrouselProvider dynamicHeight={dynamicHeight} step={step} onSubmit={onSubmit}>
                <div
                    className="w-full flex flex-wrap transition-height duration-500 h-fit"
                >
                    <div
                        className="transition-transform duration-300 ease-in-out grid flex-shrink-0 items-center"
                        style={{
                            width: `${100 * items.length}%`,
                            transform: `translateX(-${(100 / items.length) * step.current}%)`,
                            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
                            transitionDelay: dynamicHeight ? "150ms" : "0"
                        }}
                    >
                        {
                            items.map((item, index) => (
                                <FormCarrouselStepProvider
                                    when={index}
                                    key={index}
                                >
                                    <FormCarrouselStep>
                                        {item}
                                    </FormCarrouselStep>
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