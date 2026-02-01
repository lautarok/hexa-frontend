import http from "@/src/shared/services/http"
import Token from "@/src/shared/types/token"

export const login = async ({
    usernameOrEmail,
    password
}: {
    usernameOrEmail: string
    password: string
}) => {
    const response = await http.POST<Token>("auth/login", {
        body: {
            usernameOrEmail, password
        }
    })

    return response
}