import Button from "@/src/shared/components/common/Button";
import Form from "@/src/shared/components/form/Form";
import FormField from "@/src/shared/components/form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginEmailSchema, { LoginEmailInput } from "../../lib/email.schema";
import useFormCarrousel from "@/src/shared/hooks/useFormCarrousel";
import { forwardRef, useImperativeHandle } from "react";
import useModalDialog from "@/src/shared/hooks/useModalDialog";
import retryDialog from "@/src/shared/lib/retryDialog";

export type LoginEmailStepHandle = {
    email: () => string
}

const LoginEmailStep = forwardRef<LoginEmailStepHandle>(
    ({}, ref) => {
        const form = useForm<LoginEmailInput>({
                resolver: zodResolver(loginEmailSchema)
            }),
            modalDialog = useModalDialog(),
            formCarrousel = useFormCarrousel()

        useImperativeHandle(ref, () => ({
            email: () => form.getValues("email")
        }))

        const handleSubmit = async () => {
            const isEmailValid = await form.trigger("email")

            if (!isEmailValid) {
                handleInvalid()
                return
            }

            formCarrousel?.nextStep()
        }

        const handleInvalid = () => {
            modalDialog.open("Correo inválido", retryDialog(
                form.getFieldState("email").error?.message || "El correo electrónico no es un correo válido"
            ))
        }

        return (
            <Form
                form={form}
                onSubmit={handleSubmit}
                onInvalid={handleInvalid}
            >
                <FormField
                    autoFocus
                    label="Nombre de usuario o correo"
                    icon="Mention"
                    placeholder="Ej: johndoe@gmail.com"
                    disabled={form.formState.isSubmitting}
                    {...form.register("email")}
                />
                <Button
                    animateSuffixIcon
                    suffixIcon="ArrowRight"
                    variant="primary"
                    type="submit"
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                    Siguiente
                </Button>
            </Form>
        )
    }
)

export default LoginEmailStep