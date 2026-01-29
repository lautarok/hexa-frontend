import Form from "@/src/shared/components/form/Form"
import FormField from "@/src/shared/components/form/FormField"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import loginPasswordSchema, { LoginPasswordInput } from "../../lib/password.schema"
import Button from "@/src/shared/components/common/Button"
import useModalDialog from "@/src/shared/hooks/useModalDialog"
import useFormCarrousel from "@/src/shared/hooks/useFormCarrousel"
import retryDialog from "@/src/shared/lib/retryDialog"
import { forwardRef, useImperativeHandle } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

export type LoginPasswordStepHandle = {
    password: () => string
    reset: () => void
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
            reset: () => form.reset()
        }))

        const handleSubmit: SubmitHandler<LoginPasswordInput> = async () => {
            const isValidPassword = await form.trigger("password")

            if (!isValidPassword) {
                handleInvalid()
                return
            }

            await formCarrousel?.submit()
        }

        const handleInvalid = async () => {
            modalDialog.open("Contraseña inválida", retryDialog(
                form.getFieldState("password").error?.message || "Contraseña inválida"
            ))
        }

        return (
            <>
                <Form
                    form={form}
                    onInvalid={handleInvalid}
                    onSubmit={handleSubmit}
                >
                    <FormField
                        autoFocus
                        label="Contraseña"
                        icon="Key"
                        {...form.register("password")}
                    />
                    <nav className="w-full h-fit grid grid-cols-[auto_1fr] gap-6">
                        <Button onClick={formCarrousel?.prevStep}>Atrás</Button>
                        <Button
                            suffixIcon="Check"
                            variant="primary"
                            type="submit"
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                        >
                            Ingresar
                        </Button>
                    </nav>
                </Form>
                <Link href="#" className="text-xs font-semibold underline">Olvidé mi contraseña</Link>
            </>
        )
    }
)

export default LoginPasswordStep