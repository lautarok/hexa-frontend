import z from "zod";

const usernameSchema = z.object({
    username: z.string({
        error: "Campo obligatorio"
    }).min(5, {
        error: "Debe contener al menos 5 caracteres"
    }).max(25, {
        error: "No puede contener más de 25 caracteres"
    }).refine(username => (
        !username.includes(" ")
    ), {
        error: "No puede contener espacios"
    }).regex(/^[a-zA-Z0-9._]*$/, {
        error: "Solo puede contener puntos, guiones bajos y caracteres alfanumericos"
    })
})

export default usernameSchema
export type UsernameInput = z.infer<typeof usernameSchema>