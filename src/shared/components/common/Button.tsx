import * as Icon from "akar-icons"
import useFormCarrouselStep from "../../hooks/useFormCarrouselStep"
import { useMemo } from "react"

export default function Button({
    children,
    suffixIcon,
    animateSuffixIcon,
    className,
    variant,
    disabled = false,
    type = "button",
    onClick
}: {
    children: React.ReactNode
    suffixIcon?: keyof typeof Icon
    animateSuffixIcon?: boolean
    className?: string
    variant?: "primary"
    disabled?: boolean
    type?: "submit" | "button"
    onClick?: () => void
}) {
    const SuffixIcon = suffixIcon ? Icon[suffixIcon] : null

    const formCarrouselStep = useFormCarrouselStep()

    const isDisabled = useMemo(() => 
        (formCarrouselStep && !formCarrouselStep.isCurrent)
        || disabled
    , [disabled, formCarrouselStep?.isCurrent])

    return (
        <button
            onClick={!isDisabled ? onClick : undefined}
            disabled={isDisabled}
            type={type}
            className={[
                "w-full h-13 text-md font-semibold flex justify-center items-center gap-2 rounded-xl transition-[scale,opacity,transform] duration-200 group px-4",
                variant === "primary" ? "bg-white text-black" : "bg-white/5 text-white/90 hover:text-white",
                isDisabled ? "opacity-65 cursor-default" : "opacity-90 hover:opacity-100 active:scale-98",
                className ?? ""
            ].join(" ")}
        >
            <span>{children}</span>
            {
                SuffixIcon && (
                    <SuffixIcon
                        strokeWidth={3}
                        className={[
                            "size-4",
                            animateSuffixIcon && !isDisabled ? "transition-[opacity,transform,translate] opacity-70 group-hover:opacity-100 group-hover:translate-x-2" : ""
                        ].join(" ")}
                     />
                )
            }
        </button>
    )
}