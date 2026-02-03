"use server"

import { cookies } from "next/headers";

export default async function setTokenCookie(token?: string) {
    const cookieStore = await cookies()
    
    if (token) {
        cookieStore.set("auth_token", token, {
            secure: process.env.NODE_ENV === "production",
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        })
    } else {
        cookieStore.delete("auth_token")
    }
}