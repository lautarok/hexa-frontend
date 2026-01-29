import ModalDialogContextProvider from "@/src/core/providers/ModalDialogContextProvider";
import React from "react";

export default function AppProviders({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ModalDialogContextProvider>
            {children}
        </ModalDialogContextProvider>
    )
}