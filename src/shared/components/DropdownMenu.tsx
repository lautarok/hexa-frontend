"use client"

import Link from "next/link"
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import IconButton from "./IconButton"
import * as Icon from "akar-icons"

const DropdownMenuContext = createContext({
    close: () => {}
})

export default function DropdownMenu({
    label,
    children,
    boxAlignmentX
}: {
    label: React.ReactNode
    children: React.ReactNode
    boxAlignmentX: "right" | "center" | "left"
}) {
    const buttonRef = useRef<HTMLDivElement | null>(null),
        [_open, _setOpen] = useState(false)

    useEffect(() => {
        if (!buttonRef.current) return

        const handleClick = (event: MouseEvent) => {
            if (!buttonRef.current?.contains(event.target as Node)) {
                _setOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [buttonRef])

    return (
        <div ref={buttonRef}>
            <DropdownMenuContext.Provider value={{
                close: () => {_setOpen(false)}
            }}>
                <div className="relative w-fit h-fit z-9999 select-none">
                    <button onClick={() => _setOpen(!_open)} className="w-fit h-fit flex items-center gap-1">
                        <span>{label}</span>
                        <Icon.ChevronDown size={12} />
                    </button>
                    <DropdownMenuBox isOpen={_open} alignmentX={boxAlignmentX}>
                        {children}
                    </DropdownMenuBox>
                </div>
            </DropdownMenuContext.Provider>
        </div>
    )
}

export function DropdownMenuBox({
    className,
    isOpen = false,
    children,
    alignmentX
}: {
    className?: string
    isOpen?: boolean
    children: React.ReactNode
    alignmentX: "right" | "left" | "center"
}) {
    
    const menuRef = useRef<HTMLDivElement>(null),
        [_bottom, _setBottom] = useState(false)

    useLayoutEffect(() => {
        if (!menuRef.current) return

        const onScroll = () => {
            requestAnimationFrame(() => {
                if (!menuRef.current) return

                const computedStyle = getComputedStyle(menuRef.current),
                    scaling = parseFloat(computedStyle.scale)

                const scalingFactor = 1 + ((1 - scaling) / 2)

                const menuRect = menuRef.current.getBoundingClientRect(),
                    menuTop = (menuRect.top - 25) * scalingFactor,
                    menuBottom = (menuRect.bottom + 25) * scalingFactor

                if (menuRect.height > window.innerHeight / 1.6) return

                if (menuBottom > window.innerHeight) {
                    _setBottom(true)
                } else if (menuTop < 0) {
                    _setBottom(false)
                }
            })
        }
        
        onScroll()
        
        window.addEventListener("scroll", onScroll)

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [menuRef])

    return (
        <div
            ref={menuRef}
            className={[
                "w-full min-w-fit h-fit absolute overflow-hidden bg-[#111]/80 backdrop-blur-xs transform max-h-80 rounded-xl border-white/10 flex flex-col gap-2",
                className,
                alignmentX === "left" ? "left-0"
                    : alignmentX === "center" ? "left-[50%] -translate-x-[50%]"
                    : "right-0",
                _bottom ? "bottom-0 origin-bottom" : "-top-2 origin-top",
                _bottom && alignmentX === "left" ? "!origin-bottom-left"
                    : _bottom && alignmentX === "right" ? "!origin-bottom-right"
                    : !_bottom && alignmentX === "left" ? "!origin-top-left"
                    : !_bottom && alignmentX === "right" ? "!origin-top-right"
                    : "",
                isOpen ? "border-1 scale-100 transition-[scale,opacity] duration-[.2s] opacity-100 ease-in-out p-2" : "opacity-0 p-0 pointer-events-none scale-70"
            ].join(" ")}
            style={!isOpen ? {
                transition: "transform ease-in-out .1s, opacity ease-in-out .1s, scale ease-in-out .1s, max-height linear 0s .1s, padding linear 0s .1s, padding-block linear 0s .1s, border-width linear 0s .1s"
            } : undefined}
        >
            {children}
        </div>
    )
}

export function DropdownMenuLabel({
    children
}: {
    children: string
}) {
    const context = useContext(DropdownMenuContext)

    return (
        <div className="w-full h-fit flex items-center gap-2">
            <p className="text-sm font-semibold block inline min-w-fit whitespace-nowrap m-3">
                {children}
            </p>
            <IconButton
                label="Close menu"
                icon="Cross"
                onClick={context.close}
            />
        </div>
    )
}

export function DropdownMenuLink({
    className,
    children,
    href
}: {
    className?: string,
    children: React.ReactNode,
    href?: string
}) {
    const context = useContext(DropdownMenuContext)
    
    return (
        <Link
            href={href || ""}
            onClick={() => {context.close()}}
            className={[
                "w-full h-full text-left rounded-md px-3 py-2 text-md hover:bg-white/10 rounded-md",
                className
            ].join(" ")}
        >
            {children}
        </Link>
    )
}