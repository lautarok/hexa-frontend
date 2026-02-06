"use client"

import { createContext } from "react"
import User from "../types/user"

const AuthContext = createContext<{
    token?: string
    user?: User
    isAdmin?: boolean
    set: (token: string, user: User) => Promise<void>
    clear: () => Promise<void>
} | null>(null)

export default AuthContext