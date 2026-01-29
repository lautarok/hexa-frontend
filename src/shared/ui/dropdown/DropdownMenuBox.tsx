import { useEffect, useLayoutEffect, useRef, useState } from "react"
import useDropdownMenu from "../../hooks/useDropdownMenu"

export default function DropdownMenuBox({
    className,
    children,
    outter,
    alignmentX
}: {
    className?: string
    children: React.ReactNode
    outter?: boolean
    alignmentX: "right" | "left" | "center"
}) {
    const menuRef = useRef<HTMLDivElement>(null)

    const dropdownMenu = useDropdownMenu()

    const [_bottom, _setBottom] = useState(false)

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



    useEffect(() => {
        if (!menuRef.current) return

        const handleClick = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                dropdownMenu.set(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [dropdownMenu])

    return (
        <div
            ref={menuRef}
            className={[
                "w-full min-w-fit h-fit absolute overflow-hidden bg-[var(--background)]/95 backdrop-blur-xs transform rounded-2xl border-white/10 flex flex-col gap-2",
                className,
                alignmentX === "left" ? "left-0"
                    : alignmentX === "center" ? "left-[50%] -translate-x-[50%]"
                    : "right-0",
                _bottom && !outter ? "bottom-0 origin-bottom"
                    : !_bottom && !outter ? "-top-2 origin-top"
                    : _bottom && outter ? "bottom-[calc(100%+1rem)]"
                    : "top-[calc(100%+1rem)]",
                _bottom && alignmentX === "left" ? "!origin-bottom-left"
                    : _bottom && alignmentX === "right" ? "!origin-bottom-right"
                    : !_bottom && alignmentX === "left" ? "!origin-top-left"
                    : !_bottom && alignmentX === "right" ? "!origin-top-right"
                    : "",
                dropdownMenu.isOpen ? "border-1 scale-100 transition-[scale,opacity] duration-[.2s] opacity-100 ease-in-out p-2" : "opacity-0 p-0 pointer-events-none scale-70"
            ].join(" ")}
            style={!dropdownMenu.isOpen ? {
                transition: "transform ease-in-out .1s, opacity ease-in-out .1s, scale ease-in-out .1s, padding linear 0s .1s, padding-block linear 0s .1s, border-width linear 0s .1s"
            } : undefined}
        >
            {children}
        </div>
    )
}