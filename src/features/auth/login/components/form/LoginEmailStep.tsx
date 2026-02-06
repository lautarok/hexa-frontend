import Form from "@/src/shared/ui/form/Form";
import FormField from "@/src/shared/ui/form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginEmailSchema, { LoginEmailInput } from "../../lib/loginEmailSchema";
import useFormCarrousel from "@/src/shared/hooks/useFormCarrousel";
import { forwardRef, useImperativeHandle } from "react";
import useModalDialog from "@/src/core/hooks/useModalDialog";
import retryDialog from "@/src/shared/lib/retryDialog";
import FormButton from "@/src/shared/ui/form/FormButton";

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
                className="h-full"
            >
                <FormField
                    label="Nombre de usuario o correo"
                    icon="Mention"
                    placeholder="Ej: johndoe@gmail.com"
                    autoFocus
                    disabled={form.formState.isSubmitting}
                    {...form.register("email")}
                />
                <FormButton
                    animateSuffixIcon
                    suffixIcon="ArrowRight"
                    variant="primary"
                    type="submit"
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                    Siguiente
                </FormButton>
            </Form>
        )
    }
)

LoginEmailStep.displayName = "Login email step"

export default LoginEmailStep