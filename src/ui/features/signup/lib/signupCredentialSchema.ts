import z from "zod";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/

const passwordSchema = z.string({
    error: "Campo obligatorio"
}).min(6, {
    error: "Debe contener al menos 6 caracteres"
}).max(20, {
    error: "No puede contener más de 20 caracteres"
}).refine(password => /[A-Z]/.test(password), {
    error: "Debe contener al menos una letra mayúscula"
}).refine(password => /[a-z]/.test(password), {
    error: "Debe contener al menos una letra minúscula"
}).refine(password => /[0-9]/.test(password), {
    error: "Debe contener al menos un número"
}).refine(password => /[@$!%*?&]/.test(password), {
    error: "Debe contener al menos uno de los siguientes caracteres especiales: @$!%*?&"
})

const signupCredentialSchema = z.object({
    email: z.string({
        error: "El correo electrónico es requerido"
    }).regex(emailRegex, {
        error: "El correo electrónico no es válido, debe ser una dirección de correo electrónico real"
    }),
    password: passwordSchema,
    repeatPassword: passwordSchema
}).superRefine(
    (data, ctx) => {
        if (data.password !== data.repeatPassword) {
            ctx.addIssue({
                path: ["repeatPassword"],
                message: "Las contraseñas no coinciden",
                code: "custom"
            })
        }
    }
)

export default signupCredentialSchema
export type signupCredentialInput = z.infer<typeof signupCredentialSchema>