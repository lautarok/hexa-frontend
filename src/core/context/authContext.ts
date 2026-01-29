"use client"

import { createContext } from "react"
import User from "../../shared/types/user"

const AuthContext = createContext<{
    token?: string
    user?: User
    set: (token: string, user: User) => void
    clear: () => void
} | null>(null)

export default AuthContext