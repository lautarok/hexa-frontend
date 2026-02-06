"use server"

import * as http from "@/src/shared/services/http"
import User from "@/src/core/types/user"
import { cookies } from "next/headers"

const getAuthUser = async (token: string) => {
    return await http.GET<User>("auth", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export default async function getAuth() {
    const cookieStore = await cookies(),
        token = cookieStore.get("auth_token")
        
    if (!token?.value) {
        return null
    }

    try {
        const user = await getAuthUser(token.value)

        return {
            token: token.value,
            user
        }
    } catch (error) {
        return null
    }
}