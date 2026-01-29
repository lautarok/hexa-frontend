import Permission from "./permission"

type Role = {
    id: string
    nameEn: string
    nameEs: string
    nameFr: string
    namePt: string
    nameNl: string
    permissions: Permission[]
    createdAt: string
    updatedAt: string
}

export default Role