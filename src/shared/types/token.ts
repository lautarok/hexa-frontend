import User from "./user"

type Token = {
    token: string
    exp: string
    user: User
}

export default Token