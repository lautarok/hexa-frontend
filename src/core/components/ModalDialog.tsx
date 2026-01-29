"use client"

import { useEffect, useRef } from "react"
import IconButton from "@/src/shared/components/common/IconButton"
import useModalDialog from "@/src/shared/hooks/useModalDialog"

export default function ModalDialog() {
    const {
        title,
        isOpen,
        children,
        close
    } = useModalDialog()

    const boxRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!boxRef.current) return

        const handleClick = (event: MouseEvent) => {
            if (!boxRef.current?.contains(event.target as Node)) {
                close()
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [boxRef, close])


    useEffect(() => {
        if (!isOpen) return

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault()
                close()
            }
        }

        window.addEventListener("keypress", handleKeyPress)

        return () => {
            window.removeEventListener("keypress", handleKeyPress)
        }
    }, [close, isOpen])

    return (
        <div
            className="w-full h-full fixed top-0 left-0 bg-black/65% backdrop-blur-sm flex items-center justify-center transition-opacity ease-in-out z-99999"
            style={{
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "all" : "none"
            }}
        >
            <div
                ref={boxRef}
                className="w-100 h-fit p-8 rounded-2xl border-1 border-white/10 bg-[var(--background)] flex flex-col gap-2 transition-[transform,translate]"
                style={{
                    transform: isOpen ? "translateY(0)" : "translateY(6rem)"
                }}
            >
                <div className="w-full h-fit flex gap-2 text-sm font-semibold justify-between">
                    <span>{title}</span>
                    <IconButton
                        className="relative -top-2"
                        icon="Cross"
                        onClick={close}
                    />
                </div>
                {children}
            </div>
        </div>
    )
}