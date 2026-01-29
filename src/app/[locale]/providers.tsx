"use server"

import AuthProvider from "@/src/core/providers/AuthProvider";
import ModalDialogProvider from "@/src/core/providers/ModalDialogProvider";
import getAuth from "@/src/core/services/getAuth";
import React from "react";

export default async function AppProviders({
    children
}: {
    children: React.ReactNode
}) {
    const auth = await getAuth()
    
    return (
        <ModalDialogProvider>
            <AuthProvider user={auth?.user} token={auth?.token}>
                {children}
            </AuthProvider>
        </ModalDialogProvider>
    )
}