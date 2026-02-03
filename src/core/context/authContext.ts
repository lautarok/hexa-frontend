"use client"

import { createContext } from "react"
import User from "../../shared/types/user"

const AuthContext = createContext<{
    token?: string
    user?: User
    isAdmin?: boolean
    set: (user: User) => void
    setToken: (token: string) => Promise<void>
    clear: () => Promise<void>
} | null>(null)

export default AuthContext