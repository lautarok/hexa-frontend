import Form from "@/src/shared/ui/form/Form"
import FormField from "@/src/shared/ui/form/FormField"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import loginPasswordSchema, { LoginPasswordInput } from "../../lib/loginPasswordSchema"
import useModalDialog from "@/src/core/hooks/useModalDialog"
import useFormCarrousel from "@/src/shared/hooks/useFormCarrousel"
import retryDialog from "@/src/shared/lib/retryDialog"
import { forwardRef, useImperativeHandle } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import FormButton from "@/src/shared/ui/form/FormButton"

export type LoginPasswordStepHandle = {
    password: () => string
    reset: () => void
    setGeneralError: (message?: string) => void
}

const LoginPasswordStep = forwardRef<LoginPasswordStepHandle>(
    ({}, ref) => {
        const form = useForm<LoginPasswordInput>({
                resolver: zodResolver(loginPasswordSchema)
            }),
            formCarrousel = useFormCarrousel(),
            modalDialog = useModalDialog()

        useImperativeHandle(ref, () => ({
            password: () => form.getValues("password"),
            reset: () => form.reset(),
            setGeneralError: message => form.setError("root.generalError", {
                message,
                type: "manual"
            })
        }))

        const handleSubmit: SubmitHandler<LoginPasswordInput> = async () => {
            await formCarrousel?.submit()
        }

        const handleInvalid = async () => {
            modalDialog.open("Contraseña inválida", retryDialog(
                form.getFieldState("password").error?.message || "Contraseña inválida"
            ))
        }

        return (
            <div className="w-full h-fit min-h-fit flex flex-col gap-6 justify-center">
                <Form
                    form={form}
                    onInvalid={handleInvalid}
                    onSubmit={handleSubmit}
                    className="h-full"
                >
                    <FormField
                        autoFocus
                        label="Contraseña"
                        icon="Key"
                        type="password"
                        {...form.register("password")}
                    />
                    <nav className="w-full h-fit grid grid-cols-[auto_1fr] gap-6">
                        <FormButton
                            animatePrefixIcon
                            prefixIcon="ArrowLeft"
                            onClick={formCarrousel?.prevStep}
                            disabled={
                                form.formState.isSubmitting
                                || form.formState.isSubmitSuccessful
                            }
                        >Atrás</FormButton>
                        <FormButton
                            suffixIcon="Check"
                            variant="primary"
                            type="submit"
                            disabled={
                                !form.formState.isValid
                                || form.formState.isSubmitting
                                || form.formState.isSubmitSuccessful
                            }
                        >
                            Ingresar
                        </FormButton>
                    </nav>
                </Form>
                <Link href="#" className="text-xs font-semibold underline">Olvidé mi contraseña</Link>
            </div>
        )
    }
)

LoginPasswordStep.displayName = "Login password step"

export default LoginPasswordStep