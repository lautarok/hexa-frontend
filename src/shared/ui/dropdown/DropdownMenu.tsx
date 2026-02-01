"use client"

import { useEffect, useState } from "react"
import DropdownMenuProvider from "../../providers/DropdownMenuProvider"
import * as Icon from "akar-icons"

export default function DropdownMenu({
    hideChevron,
    label,
    children,
    onChange
}: {
    hideChevron?: boolean
    label: React.ReactNode
    children: React.ReactNode
    onChange?: (isOpen: boolean) => void
}) {
    const [_isOpen, _setIsOpen] = useState(false)

    useEffect(() => {
        onChange?.(_isOpen)
    }, [onChange, _isOpen])

    return (
        <div>
            <DropdownMenuProvider onOpenChange={_setIsOpen} isOpen={_isOpen}>
                <div className="relative w-fit h-fit z-9999 select-none">
                    <button onClick={() => _setIsOpen(true)} className="w-fit h-fit flex items-center gap-1 transition-[scale,transform,opacity] active:scale-98">
                        {label}
                        {
                            !hideChevron && <Icon.ChevronDown className="size-3" />
                        }
                    </button>
                    {children}
                </div>
            </DropdownMenuProvider>
        </div>
    )
}