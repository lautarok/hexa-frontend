"use client"

import * as Icon from "akar-icons"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { RefCallBack } from "react-hook-form"
import useFormCarrouselStep from "../../hooks/useFormCarrouselStep"

export default function FormField({
    label,
    placeholder,
    icon,
    disabled,
    autoFocus,
    type = "text",
    error,
    ref,
    ...props
}: Record<string, unknown> & {
    label: string
    placeholder?: string
    icon?: keyof typeof Icon
    disabled?: boolean
    autoFocus?: boolean
    type?: "text" | "password" | "email"
    error?: string
    ref?: RefCallBack
}) {
    const IconComponent = icon ? Icon[icon] : undefined

    const formCarrouselStep = useFormCarrouselStep()

    const fieldRef = useRef<HTMLDivElement | null>(null),
        inputRef = useRef<HTMLInputElement | null>(null)

    const handleFocus = useCallback(() => {
        inputRef.current?.focus({preventScroll: true})
    }, [inputRef])

    const isCurrent = useMemo(() =>
        !!formCarrouselStep?.isCurrent 
    , [formCarrouselStep])

    useEffect(() => {
        if (!fieldRef.current || !inputRef.current) return

        const field = fieldRef.current

        field.addEventListener("click", handleFocus)

        return () => {
            field.removeEventListener("click", handleFocus)
        }
    }, [fieldRef, handleFocus])

    useEffect(() => {
        if (autoFocus && isCurrent) {
            handleFocus()
        }
    }, [handleFocus, isCurrent, autoFocus])

    return (
        <div ref={fieldRef} className="w-full cursor-default h-fit flex flex-col gap-4 select-none">
            <span className="leading-[1] text-sm font-semibold">{label}</span>
            <div
                className={[
                    "w-full h-14 grid gap-3 border-1 items-center rounded-xl px-4",
                    IconComponent ? "grid-cols-[auto_auto_1fr]" : "grid-cols-[1fr]",
                    disabled ? "opacity-65" : "",
                    error ? "border-red-200" : "border-white/10"
                ].join(" ")}
            >
                {
                    IconComponent ? (
                        <>
                            <IconComponent size={18} />
                            <div
                                className={[
                                    "w-[1px] h-6",
                                    error ? "bg-red-200" : "bg-white/10"
                                ].join(" ")}
                            ></div>
                        </>
                    ) : null
                }
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full cursor-text"
                    autoComplete="off"
                    disabled={
                        disabled || (!!formCarrouselStep && !formCarrouselStep.isCurrent)
                    }
                    {...props}
                    ref={event => {
                        inputRef.current = event
                        ref?.(event)
                    }}
                />
            </div>
            <div
                className="overflow-hidden transition-[max-height] ease-in-out duration-250"
                style={{
                    maxHeight: error ? "5rem" : "0"
                }}
            >
                <p className="text-red-300 font-semibold text-xs">{error}</p>
            </div>
        </div>
    )
}