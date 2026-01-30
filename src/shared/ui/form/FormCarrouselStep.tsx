"use client"

import { useMemo, useRef } from "react"
import useFormCarrouselStep from "../../hooks/useFormCarrouselStep"
import useFormCarrousel from "../../hooks/useFormCarrousel"

export default function FormCarrouselStep({
    children
}: {
    children: React.ReactNode
}) {
    const formCarrouselStep = useFormCarrouselStep(),
        formCarrousel = useFormCarrousel()

    const contentRef = useRef<HTMLDivElement | null>(null)

    const contentHeight = useMemo(() => {
        if (!contentRef.current) return null

        const contentRect = contentRef.current.getBoundingClientRect()
        return contentRect.height
    }, [contentRef])

    return (
        <div
            className="w-full h-fit flex flex-wrap"
            style={{
                opacity: formCarrouselStep?.isCurrent ? 1 : 0,
                pointerEvents: formCarrouselStep?.isCurrent ? "all" : "none",
                maxHeight: formCarrouselStep?.isCurrent || !formCarrousel?.dynamicHeight ? (
                    contentHeight ? contentHeight + "px" : "150vh"
                ) : "0",
                transition: [
                    "opacity ease-in-out .3s",
                    "max-height ease-in-out " + (
                        formCarrouselStep?.isCurrent ? ".3s 0s" : ".3s .3s"
                    )
                ].join(", ")
            }}
        >
            <div className="w-full h-fit min-h-fit flex flex-col gap-6 justify-center items-center" ref={contentRef}>
                {children}
            </div>
        </div>
    )
}