import * as http from "@/src/shared/services/http"
import Token from "@/src/shared/types/token"

export default async function signup(body: {
    name: string
    surname: string
    username: string
    email: string
    password: string
    repeatPassword: string
}) {
    const response = await http.POST<Token>("auth/signup", {
        body
    })

    return response
}