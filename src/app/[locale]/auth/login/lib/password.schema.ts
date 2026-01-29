import z from "zod"

const loginPasswordSchema = z.object({
    password: z.string({
        error: "La contraseña es obligatoria"
    }).min(6, {
        error: "La contraseña es muy corta"
    }).max(20, {
        error: "La contraseña es muy larga"
    }).refine(val => {
        return /[A-Z]/.test(val)
            && /[a-z]/.test(val)
            && /[0-9]/.test(val)
            && /[@$!%*?&]/.test(val)
    }, {
        error: "La contraseña debe contener al menos: 1 minúscula, 1 mayúscula, 1 número y 1 simbolo"
    })
})

export default loginPasswordSchema
export type LoginPasswordInput = z.infer<typeof loginPasswordSchema>