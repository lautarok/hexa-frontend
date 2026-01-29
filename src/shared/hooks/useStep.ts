import { useState } from "react";

export default function useStep(from = 0, max?: number) {
    const [_step, _setStep] = useState(from)

    const handleNext = () => {
        _setStep(step => {
            const newStep = step + 1

            if (max) {
                return Math.min(newStep, max)
            }

            return newStep
        })
    }

    const handlePrev = () => {
        _setStep(step => step - 1 || 0)
    }

    return {
        current: _step,
        set: _setStep,
        next: handleNext,
        prev: handlePrev
    }
}