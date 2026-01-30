import z from "zod"

const loginEmailSchema = z.object({
    email: z.string({
        error: "El correo electrónico o nombre de usuario es obligatorio"
    }).min(5, {
        error: "El correo electrónico o nombre de usuario es muy corto"
    }).max(25, {
        error: "El correo electrónico o nombre de usuario es muy largo"
    }).refine(val => {
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
        const isUsername = /^[a-zA-Z0-9._]*$/.test(val)

        return isEmail || isUsername
    }, {
        error: "No es un correo electrónico o nombre de usuario válido"
    })
})

export default loginEmailSchema
export type LoginEmailInput = z.infer<typeof loginEmailSchema>