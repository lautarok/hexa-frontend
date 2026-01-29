"use client"

import { SubmitHandler, UseFormReturn, FieldValues, SubmitErrorHandler } from "react-hook-form"
import useFormCarrouselStep from "../../hooks/useFormCarrouselStep"

export default function Form<T extends FieldValues>({
    children,
    className,
    form,
    onSubmit,
    onInvalid
}: {
    children: React.ReactNode
    className?: string
    form: UseFormReturn<T>
    onSubmit?: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T>
}) {
    const formCarrouselStep = useFormCarrouselStep()

    return (
        <form
            onSubmit={
                !formCarrouselStep || formCarrouselStep.isCurrent ? (
                    form.handleSubmit(
                        onSubmit ?? (() => {}),
                        onInvalid
                    )
                ) : undefined
            }
            className={[
                "w-full h-fit flex flex-col gap-6",
                className ?? ""
            ].join(" ")}
        >
            {children}
        </form>
    )
}