"use client"

import * as Icon from "akar-icons"
import Link from "next/link"

export default function IconButton({
    label,
    icon,
    strokeWidth = 2,
    href,
    className,
    onClick
}: {
    label?: string
    icon: keyof typeof Icon
    strokeWidth?: number
    href?: string
    className?: string
    onClick?: () => void
}) {
    const IconElement = Icon[icon]

    return !href && !onClick ? (
        <div
            aria-label={label}
            onClick={onClick}
            className={[
                "w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center",
                className
            ].join(" ")}
        >
            <IconElement strokeWidth={strokeWidth} size={16} />
        </div>
    ) : !href ? (
        <button
            aria-label={label}
            onClick={onClick}
            type="button"
            className={[
                "w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center",
                className
            ].join(" ")}
        >
            <IconElement strokeWidth={strokeWidth} size={16} />
        </button>
    ) : (
        <Link
            aria-label={label}
            href={href}
            onClick={onClick}
            className={[
                "w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center",
                className
            ].join(" ")}
        >
            <IconElement strokeWidth={strokeWidth} size={16} />
        </Link>
    )
}