import http from "@/src/shared/services/http"
import User from "@/src/shared/types/user"

export const login = async ({
    usernameOrEmail,
    password
}: {
    usernameOrEmail: string
    password: string
}) => {
    const response = await http.POST<{
        token: string
        exp: number
        user: User
    }>("auth/login", {
        body: {
            usernameOrEmail, password
        }
    })

    return response
}