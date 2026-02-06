"use client"

import React, { useMemo, useState } from "react"
import AuthContext from "../context/authContext"
import User from "@/src/core/types/user"
import setTokenCookie from "@/src/features/auth/services/setTokenCookie"

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

    const isAdmin = useMemo(() =>
        _user?.role.permissions.some(p => p.alias === "admin")
    , [_user])

    return (
        <AuthContext.Provider
            value={{
                token: _token,
                user: _user,
                isAdmin: isAdmin,
                async set(token, user) {
                    await setTokenCookie(token)
                    _setToken(token)
                    _setUser(user)
                },
                async clear() {
                    await setTokenCookie(undefined)
                    _setToken(undefined)
                    _setUser(undefined)
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}