import Role from "./role"

type User = {
    id: string
    name: string
    surname: string
    credential?: Credential
    createdAt: string
    role: Role
}

export default User