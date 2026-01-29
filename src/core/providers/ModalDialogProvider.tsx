"use client"

import { useState } from "react"
import ModalDialogContext from "../context/modalDialogContext"

export default function ModalDialogProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [_open, _setOpen] = useState(false),
        [_title, _setTitle] = useState(""),
        [ChildrenComponent, _setChildrenComponent] = useState<React.ReactNode | null>(null)

    return (
        <ModalDialogContext.Provider
            value={{
                children: ChildrenComponent,
                isOpen: _open,
                title: _title,
                open(title, children) {
                    _setTitle(title)
                    _setChildrenComponent(children)
                    _setOpen(true)
                },
                close() {
                    _setOpen(false)
                }
            }}
        >
            {children}
        </ModalDialogContext.Provider>
    )
}