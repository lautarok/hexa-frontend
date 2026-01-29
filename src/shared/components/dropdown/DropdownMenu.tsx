import { useEffect, useRef, useState } from "react"
import DropdownMenuProvider from "../../providers/DropdownMenuProvider"
import * as Icon from "akar-icons"

export default function DropdownMenu({
    label,
    children
}: {
    label: React.ReactNode
    children: React.ReactNode
}) {
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null)

    const [_isOpen, _setIsOpen] = useState(false)

    useEffect(() => {
        if (!dropdownMenuRef.current) return

        const handleClick = (event: MouseEvent) => {
            if (!dropdownMenuRef.current?.contains(event.target as Node)) {
                _setIsOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [dropdownMenuRef])

    return (
        <div ref={dropdownMenuRef}>
            <DropdownMenuProvider onOpenChange={_setIsOpen} isOpen={_isOpen}>
                <div className="relative w-fit h-fit z-9999 select-none">
                    <button onClick={() => _setIsOpen(true)} className="w-fit h-fit flex items-center gap-1">
                        <span>{label}</span>
                        <Icon.ChevronDown size={12} />
                    </button>
                    {children}
                </div>
            </DropdownMenuProvider>
        </div>
    )
}