"use client"

import usernameSchema, { UsernameInput } from "@/src/core/lib/usernameSchema"
import Button from "@/src/shared/ui/common/Button"
import Form from "@/src/shared/ui/form/Form"
import FormField from "@/src/shared/ui/form/FormField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import updateUsernameService from "../services/updateUsernameService"
import useAuth from "@/src/core/hooks/useAuth"
import useModalDialog from "@/src/core/hooks/useModalDialog"
import retryDialog from "@/src/shared/lib/retryDialog"
import { useParams, useRouter } from "next/navigation"
import ServerError from "@/src/core/types/serverError"

export default function SelectFirstUsernameForm() {
    const auth = useAuth(),
        modalDialog = useModalDialog(),
        router = useRouter(),
        locale = useParams<{
            locale: string
        }>().locale

    const form = useForm<UsernameInput>({
        resolver: zodResolver(usernameSchema)
    })

    const {isSubmitting, isSubmitSuccessful} = form.formState

    const handleSubmit = async () => {
        if (!auth?.user || !auth.token) {
            return
        }

        try {
            const newUsername = form.getValues("username")

            const result = await updateUsernameService({
                userId: auth.user.id,
                token: auth.token,
                username: newUsername
            })

            const newUser = {...auth.user}
            if (!newUser.credential) return

            newUser.credential.username = result.username

            await auth.set(auth.token, newUser)

            router.push(`/${locale}/`)
        } catch (error) {
            modalDialog.open("Error del servidor", retryDialog(
                "Ha ocurrido un error intentando actualizar su nombre de usuario. Por favor, reintente en unos minutos"
            ))
            form.setError("root.serverError", {
                type: "manual",
                message: (error as ServerError).message
            })
        }
    }

    return (
        <Form
            form={form}
            onSubmit={() => form.handleSubmit(handleSubmit)}>
            <FormField
                autoFocus
                label="Nombre de usuario"
                icon="Mention"
                disabled={isSubmitting || isSubmitSuccessful}
                error={form.getFieldState("username").error?.message}
                {...form.register("username")}
            />
            <Button
                variant="primary"
                type="submit"
                suffixIcon="ArrowRight"
                disabled={isSubmitting || isSubmitSuccessful}
            >Ingresar</Button>
        </Form>
    )
}