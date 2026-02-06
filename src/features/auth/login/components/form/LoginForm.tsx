"use client"

import FormCarrousel, { FormCarrouselHandle } from "@/src/shared/ui/form/FormCarrousel"
import LoginEmailStep, { LoginEmailStepHandle } from "./LoginEmailStep"
import LoginPasswordStep, { LoginPasswordStepHandle } from "./LoginPasswordStep"
import { login } from "../../services/loginService"
import ServerError from "@/src/core/types/serverError"
import useModalDialog from "@/src/core/hooks/useModalDialog"
import { useRef } from "react"
import retryDialog from "@/src/shared/lib/retryDialog"
import useAuth from "@/src/core/hooks/useAuth"
import { useParams, useRouter } from "next/navigation"

export default function LoginForm() {
    const modalDialog = useModalDialog(),
        auth = useAuth(),
        router = useRouter(),
        params = useParams<{
            locale: string
        }>()

    const formCarrouselRef = useRef<FormCarrouselHandle | null>(null),
        loginEmailStepRef = useRef<LoginEmailStepHandle | null>(null),
        loginPasswordStepRef = useRef<LoginPasswordStepHandle | null>(null)

    const handleInvalidUser = async () => {
        modalDialog.open("No encontrado", retryDialog(
            "No se ha encontrado el usuario o la contraseña es incorrecta"
        ))
        loginPasswordStepRef.current?.reset()
        formCarrouselRef.current?.setStep(0)
    }

    const handleSubmit = async () => {
        if (
            !loginEmailStepRef.current
            || !loginPasswordStepRef.current
            || !auth
            || auth.token
        ) {
            return
        }

        try {
            const response = await login({
                usernameOrEmail: loginEmailStepRef.current.email(),
                password: loginPasswordStepRef.current.password()
            })

            await auth.set(response.token, response.user)

            router.push(`/${params.locale}/`)
        } catch (error) {
            const serverError = error as ServerError

            if (serverError.code === "ResourceNotFound") {
                handleInvalidUser()
                loginPasswordStepRef.current.setGeneralError(serverError.message)
                return
            }

            modalDialog.open("Error :(", retryDialog(
                "Lo sentimos. Ha ocurrido un error del servidor. Por favor, reintente en unos minutos."
            ))
            loginPasswordStepRef.current.setGeneralError(serverError.message)
            return
        }
    }

    return (
        <div className="w-full h-fit">
            <FormCarrousel
                ref={formCarrouselRef}
                onSubmit={handleSubmit}
                items={[
                    <LoginEmailStep key={1} ref={loginEmailStepRef} />,
                    <LoginPasswordStep key={2} ref={loginPasswordStepRef} />
                ]}
            />
        </div>
    )
}