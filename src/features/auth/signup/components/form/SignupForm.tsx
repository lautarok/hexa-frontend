"use client"

import FormCarrousel, { FormCarrouselHandle } from "@/src/shared/ui/form/FormCarrousel"
import { useRef } from "react"
import SignupNamesStep, { SignupNamesStepHandle } from "./SignupNamesStep"
import SignupCredentialStep, { SignupCredentialStepHandle } from "./SignupCredentialStep"
import SignupUsernameStep, { SignupUsernameStepHandle } from "./SignupUsernameStep"
import signup from "../../services/signupService"
import useAuth from "@/src/shared/hooks/useAuth"
import ServerError from "@/src/shared/types/serverError"
import useModalDialog from "@/src/shared/hooks/useModalDialog"
import retryDialog from "@/src/shared/lib/retryDialog"
import { useParams, useRouter } from "next/navigation"

export default function SignupForm() {
    const auth = useAuth(),
        modalDialog = useModalDialog(),
        router = useRouter(),
        {locale} = useParams<{locale: string}>()

    const formCarrouselRef = useRef<FormCarrouselHandle | null>(null),
        signupNamesStepRef = useRef<SignupNamesStepHandle | null>(null),
        signupCredentialStepRef = useRef<SignupCredentialStepHandle | null>(null),
        signupUsernameStepRef = useRef<SignupUsernameStepHandle | null>(null)

    const handleSubmit = async () => {
        if (
            !signupNamesStepRef.current
            || !signupCredentialStepRef.current
            || !signupUsernameStepRef.current
            || !formCarrouselRef.current
            || !auth
            || auth.token
        ) {
            return
        }

        try {
            const response = await signup({
                name: signupNamesStepRef.current.name(),
                surname: signupNamesStepRef.current.surname(),
                email: signupCredentialStepRef.current.email(),
                password: signupCredentialStepRef.current.password(),
                repeatPassword: signupCredentialStepRef.current.repeatPassword(),
                username: signupUsernameStepRef.current.username()
            })

            auth.set(response.user)
            await auth.setToken(response.token)
            
            router.push(`/${locale}/`)
        } catch (error) {
            const serverError = error as ServerError

            if (serverError.code === "AlreadyExists") {
                if (serverError.message.toLowerCase().includes("username")) {
                    modalDialog.open("Nombre de usuario", retryDialog(
                        "El nombre de usuario ya está en uso por otra persona"
                    ))
                    signupUsernameStepRef.current.setGeneralError(serverError.message)
                    return
                }

                modalDialog.open("Correo electrónico", retryDialog(
                    "El correo electrónico ya está en uso por otra persona"
                ))
                formCarrouselRef.current.setStep(1)
                signupUsernameStepRef.current.setGeneralError(serverError.message)
                return
            }

            modalDialog.open("Error :(", retryDialog(
                "Lo sentimos. Ha ocurrido un error del servidor. Por favor, reintente en unos minutos."
            ))
            signupUsernameStepRef.current.setGeneralError(serverError.message)
            return
        }
    }

    return (
        <div className="w-full h-fit">
            <FormCarrousel
                dynamicHeight
                ref={formCarrouselRef}
                onSubmit={handleSubmit}
                items={[
                    <SignupNamesStep ref={signupNamesStepRef} key={1} />,
                    <SignupCredentialStep ref={signupCredentialStepRef} key={2} />,
                    <SignupUsernameStep ref={signupUsernameStepRef} key={3} />
                ]}
            />
        </div>
    )
}