import z from "zod";

const nameRegex = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u

const signupNamesSchema = z.object({
    name: z.string({
        error: "El nombre es requerido"
    }).min(3, {
        error: "El nombre debe contener al menos 3 caracteres"
    }).max(40, {
        error: "El nombre no puede contener más de 40 caracteres"
    }).regex(nameRegex, {
        error: "El nombre no puede contener simbolos y debe ser un nombre real"
    }),
    surname: z.string({
        error: "El apellido es requerido"
    }).min(3, {
        error: "El apellido debe contener al menos 3 caracteres"
    }).max(40, {
        error: "El apellido no puede contener más de 40 caracteres"
    }).regex(nameRegex, {
        error: "El apellido no puede contener simbolos ni números, debe ser un apellido real"
    })
})

export default signupNamesSchema
export type SignupNamesInput = z.infer<typeof signupNamesSchema>