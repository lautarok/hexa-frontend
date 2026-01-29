"use client"

import React, { useState } from "react"
import AuthContext from "../context/authContext"
import User from "@/src/shared/types/user"
import setTokenCookie from "@/src/shared/services/setTokenCookie"

export default function AuthProvider({
    token,
    user,
    children
}: {
    token?: string
    user?: User
    children: React.ReactNode
}) {
    const [_token, _setToken] = useState<string | undefined>(token),
        [_user, _setUser] = useState<User | undefined>(user)

    const handleSetToken = async (token?: string) => {
        _setToken(token)
        await setTokenCookie(token)
    }

    return (
        <AuthContext.Provider
            value={{
                token: _token,
                user: _user,
                set(token, user) {
                    handleSetToken(token)
                    _setUser(user)
                },
                clear() {
                    handleSetToken(undefined)
                    _setUser(undefined)
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}