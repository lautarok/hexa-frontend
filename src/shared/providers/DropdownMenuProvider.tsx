import { useState } from "react"
import DropdownMenuContext from "../context/DropdownMenuContext"

export default function DropdownMenuProvider({
    children,
    isOpen,
    onOpenChange
}: {
    children: React.ReactNode
    isOpen: boolean
    onOpenChange: (set: boolean) => void
}) {
    return (
        <DropdownMenuContext.Provider
            value={{
                isOpen: isOpen,
                set: (to: boolean) => onOpenChange(to),
                toggle: () => onOpenChange(!isOpen)
            }}
        >
            {children}
        </DropdownMenuContext.Provider>
    )
}