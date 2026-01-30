"use client"

import { useLayoutEffect, useRef, useState } from "react"
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

    const [_height, _setHeight] = useState(0)

    useLayoutEffect(() => {
        if (!contentRef.current) return

        const contentRect = contentRef.current.getBoundingClientRect()
        _setHeight(contentRect.height)
    }, [contentRef])

    return (
        <div
            className="w-full h-fit flex flex-wrap"
            style={{
                opacity: formCarrouselStep?.isCurrent ? 1 : 0,
                pointerEvents: formCarrouselStep?.isCurrent ? "all" : "none",
                maxHeight: formCarrouselStep?.isCurrent || !formCarrousel?.dynamicHeight ? (
                    _height ? _height + "px" : "150vh"
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