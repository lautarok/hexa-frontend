"use client"

import { createContext } from "react"
import User from "../../shared/types/user"

const AuthContext = createContext<{
    token?: string
    user?: User
    isAdmin?: boolean
    set: (token: string, user: User) => void
    clear: () => Promise<void>
} | null>(null)

export default AuthContext