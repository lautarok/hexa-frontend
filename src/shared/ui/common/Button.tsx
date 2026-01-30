import * as Icon from "akar-icons"
import Link from "next/link"

export default function Button({
    children,
    suffixIcon,
    animateSuffixIcon,
    prefixIcon,
    animatePrefixIcon,
    variant,
    disabled = false,
    type = "button",
    href,
    size = "md",
    className,
    onClick
}: {
    children: string
    suffixIcon?: keyof typeof Icon
    animateSuffixIcon?: boolean
    prefixIcon?: keyof typeof Icon
    animatePrefixIcon?: boolean
    variant?: "primary" | "ghost"
    disabled?: boolean
    type?: "submit" | "button"
    href?: string
    size?: "md" | "sm"
    className?: string
    onClick?: () => void
}) {
    const SuffixIcon = suffixIcon ? Icon[suffixIcon] : null,
        PrefixIcon = prefixIcon ? Icon[prefixIcon] : null

    return !href ? (
        <button
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            type={type}
            className={[
                "font-semibold flex justify-center items-center gap-2 rounded-xl transition-[scale,opacity,transform] duration-200 group",
                variant !== "ghost" ? "px-6" : "",
                variant === "primary" ? "bg-white text-black"
                    : variant === "ghost" ? "text-white/80 hover:-text-white"
                    : "bg-white/5 text-white/90 hover:text-white",
                disabled ? "opacity-50 cursor-default" : "opacity-90 hover:opacity-100 active:scale-98",
                size === "md" ? "h-13 text-md" : "h-9 text-sm",
                className ?? ""
            ].join(" ")}
        >
            {
                PrefixIcon && (
                    <PrefixIcon
                        strokeWidth={3}
                        className={[
                            "size-4",
                            animatePrefixIcon && !disabled ? "transition-[opacity,transform,translate] opacity-70 group-hover:opacity-100 group-hover:-translate-x-2" : ""
                        ].join(" ")}
                     />
                )
            }
            <span>{children}</span>
            {
                SuffixIcon && (
                    <SuffixIcon
                        strokeWidth={3}
                        className={[
                            "size-4",
                            animateSuffixIcon && !disabled ? "transition-[opacity,transform,translate] opacity-70 group-hover:opacity-100 group-hover:translate-x-2" : ""
                        ].join(" ")}
                     />
                )
            }
        </button>
    ) : (
        <Link
            onClick={!disabled ? onClick : undefined}
            href={href}
            type={type}
            className={[
                "w-full font-semibold flex justify-center items-center gap-2 rounded-xl transition-[scale,opacity,transform] duration-200 group",
                variant !== "ghost" ? "px-4" : "",
                variant === "primary" ? "bg-white text-black"
                    : variant === "ghost" ? "text-white/80 hover:-text-white"
                    : "bg-white/5 text-white/90 hover:text-white",
                disabled ? "opacity-65 cursor-default" : "opacity-90 hover:opacity-100 active:scale-98",
                size === "md" ? "h-13 text-md" : "h-9 text-sm",
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
                            animateSuffixIcon && !disabled ? "transition-[opacity,transform,translate] opacity-70 group-hover:opacity-100 group-hover:translate-x-2" : ""
                        ].join(" ")}
                     />
                )
            }
        </Link>
    )
}