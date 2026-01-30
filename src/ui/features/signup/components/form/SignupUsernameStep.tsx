import { forwardRef, useImperativeHandle } from "react"
import * as Icon from "akar-icons"
import useFormCarrousel from "@/src/shared/hooks/useFormCarrousel"
import Form from "@/src/shared/ui/form/Form"
import { useForm } from "react-hook-form"
import signupUsernameSchema, { SignupUsernameInput } from "../../lib/signupUsernameSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import FormButton from "@/src/shared/ui/form/FormButton"
import FormField from "@/src/shared/ui/form/FormField"

export type SignupUsernameStepHandle = {
    username: () => string
}

const SignupUsernameStep = forwardRef<SignupUsernameStepHandle>(
    ({}, ref) => {
        const form = useForm<SignupUsernameInput>({
            resolver: zodResolver(signupUsernameSchema)
        })
        
        const formCarrousel = useFormCarrousel()

        useImperativeHandle(ref, () => ({
            username: () => form.getValues("username")
        }))

        return (
            <div className="w-110 max-w-full h-fit p-10 rounded-2xl border-1 border-white/10 flex flex-col gap-7">
                <div className="w-full h-fit flex items-center justify-between">
                    <h2 className="text-xl font-bold">Crea tu nombre de usuario</h2>
                    <Icon.MoonFill className="size-5" />
                </div>
                <div className="w-full h-fit flex flex-col justify-center gap-2">
                    <Form
                        form={form}
                        onSubmit={formCarrousel?.submit}
                    >
                        <FormField
                            autoFocus
                            icon="Mention"
                            label="Nombre de usuario"
                            error={form.formState.errors.username?.message}
                            {...form.register("username")}
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
                            >Atras</FormButton>
                            <FormButton
                                suffixIcon="Check"
                                variant="primary"
                                type="submit"
                                disabled={
                                    form.formState.isSubmitting
                                    || form.formState.isSubmitSuccessful
                                }
                            >Crear cuenta</FormButton>
                        </nav>
                    </Form>
                </div>
            </div>
        )
    }
)

SignupUsernameStep.displayName = "Signup username step"

export default SignupUsernameStep