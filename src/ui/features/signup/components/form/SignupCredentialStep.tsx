import Form from "@/src/shared/ui/form/Form"
import { forwardRef, useImperativeHandle } from "react"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import signupCredentialSchema, { signupCredentialInput } from "../../lib/signupCredentialSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "@/src/shared/ui/form/FormField"
import useModalDialog from "@/src/shared/hooks/useModalDialog"
import retryDialog from "@/src/shared/lib/retryDialog"
import useFormCarrousel from "@/src/shared/hooks/useFormCarrousel"
import * as Icon from "akar-icons"
import FormButton from "@/src/shared/ui/form/FormButton"

export type SignupCredentialStepHandle = {
    email: () => string
    password: () => string
    repeatPassword: () => string
}

const SignupCredentialStep = forwardRef<SignupCredentialStepHandle>(
    ({}, ref) => {
        const modalDialog = useModalDialog(),
            formCarrousel = useFormCarrousel()

        const form = useForm<signupCredentialInput>({
            resolver: zodResolver(signupCredentialSchema),
            mode: "onChange",
            reValidateMode: "onChange"
        })

        useImperativeHandle(ref, () => ({
            email: () => form.getValues("email"),
            password: () => form.getValues("password"),
            repeatPassword: () => form.getValues("repeatPassword")
        }))

        const handleSubmit: SubmitHandler<signupCredentialInput> = () => {
            formCarrousel?.nextStep()
        }

        const handleInvalid: SubmitErrorHandler<signupCredentialInput> = ({
            email, password, repeatPassword
        }) => {
            modalDialog.open(
                email?.message ? "Correo electrónico"
                    : password?.message ? "Contraseña"
                    : "Repetir contraseña",
                retryDialog(
                    email?.message || password?.message || repeatPassword?.message || ""
                )
            )
        }

        return (
            <div className="w-200 max-w-full h-fit p-10 rounded-2xl border-1 border-white/10 flex flex-col gap-7">
                <div className="w-full h-fit flex items-center justify-between">
                    <h2 className="text-xl font-bold">Protege tu cuenta</h2>
                    <Icon.Shield className="size-5" />
                </div>
                <div className="w-full h-fit flex flex-col justify-center gap-2">
                    <Form
                        form={form}
                        onInvalid={handleInvalid}
                        onSubmit={handleSubmit}
                    >
                        <FormField
                            autoFocus
                            label="Correo electrónico"
                            icon="Inbox"
                            {...form.register("email")}
                        />
                        <div className="grid grid-cols-2 gap-8">
                            <FormField
                                label="Contraseña"
                                icon="Key"
                                type="password"
                                error={form.formState.errors.password?.message}
                                {...form.register("password")}
                            />
                            <FormField
                                label="Repetir contraseña"
                                icon="ArrowCycle"
                                type="password"
                                error={form.formState.errors.repeatPassword?.message}
                                {...form.register("repeatPassword")}
                            />
                        </div>
                        <nav className="w-full h-fit grid items-center grid-cols-[auto_1fr] gap-6">
                            <FormButton
                                animatePrefixIcon
                                prefixIcon="ArrowLeft"
                                onClick={formCarrousel?.prevStep}
                            >Atrás</FormButton>
                            <FormButton
                                animateSuffixIcon
                                suffixIcon="ArrowRight"
                                type="submit"
                                variant="primary"
                            >Último paso</FormButton>
                        </nav>
                    </Form>
                </div>
            </div>
        )
    }
)

SignupCredentialStep.displayName = "Signup credential step"

export default SignupCredentialStep