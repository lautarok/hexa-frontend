"use server"

import http from "@/src/shared/services/http"
import User from "@/src/shared/types/user"
import { cookies } from "next/headers"

export default async function getAuth() {
    const cookieStore = await cookies(),
        token = cookieStore.get("auth_token")
        
    if (!token?.value) {
        return null
    }

    try {
        const authResponse = await http.GET<User>("auth", {
            headers: {
                "Authorization": `Bearer ${token.value}`
            }
        })

        return {
            token: token.value,
            user: authResponse
        }
    } catch (error) {
        console.error(error)
        return null
    }
}