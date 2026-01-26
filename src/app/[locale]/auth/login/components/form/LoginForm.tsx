"use client"

import FormCarrousel from "@/src/shared/components/FormCarrousel";
import { useState } from "react";
import LoginEmailStep from "./LoginEmailStep";
import LoginPasswordStep from "./LoginPasswordStep";
import * as Icon from "akar-icons"

export default function LoginForm() {
    const [_currentStep, _setCurrentStep] = useState(0)

    return (
        <div className="w-full h-fit flex flex-col gap-7">
            <FormCarrousel
                currentItemIndex={_currentStep}
                items={[
                    <LoginEmailStep />,
                    <LoginPasswordStep />
                ]}
            />
            <nav className="w-full h-fit px-10">
                <button type="button" className="w-full h-13 mt-2 bg-yellow-200 rounded-md text-black font-semibold flex justify-center items-center gap-2 group" onClick={() => _setCurrentStep(step => step === 0 ? 1 : 0)}>
                    <span>Ingresar</span>
                    <Icon.ArrowRight className="group-hover:translate-x-2 transition-[transform,translate,opacity] group-hover:opacity-100 opacity-70" size={16} strokeWidth={3} />
                </button>
            </nav>
        </div>
    )
}