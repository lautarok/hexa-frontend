"use client"

import Form from "@/src/shared/ui/form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import signupNamesSchema from "../../lib/signupNamesSchema";
import { forwardRef, useImperativeHandle } from "react";
import FormField from "@/src/shared/ui/form/FormField";
import useModalDialog from "@/src/shared/hooks/useModalDialog";
import retryDialog from "@/src/shared/lib/retryDialog";
import useFormCarrousel from "@/src/shared/hooks/useFormCarrousel";
import { useParams } from "next/navigation";
import getTraduction from "@/src/shared/services/getTraduction";
import * as Icon from "akar-icons"
import FormButton from "@/src/shared/ui/form/FormButton";

export type SignupNamesStepHandle = {
    name: () => string
    surname: () => string
}

const SignupNamesStep = forwardRef<SignupNamesStepHandle>(
    ({}, ref) =>  {
        const modalDialog = useModalDialog(),
            formCarrousel = useFormCarrousel(),
            params = useParams<{
                locale: string
            }>()

        const traduction = getTraduction(params.locale)

        const form = useForm({
            resolver: zodResolver(signupNamesSchema)
        })

        useImperativeHandle(ref, () => ({
            name: () => form.getValues("name"),
            surname: () => form.getValues("surname")
        }))

        const handleInvalid: SubmitErrorHandler<{
            name: string
            surname: string
        }> = ({name, surname}) => {
            modalDialog.open(
                `${name ? "Nombre" : "Apellido"} inválido`,
                retryDialog(
                    name?.message || surname?.message || ""
                )
            )
        }

        const handleSubmit = () => {
            formCarrousel?.nextStep()
        }

        return (
            <div className="w-200 max-w-full h-fit p-10 rounded-2xl border-1 border-white/10 flex flex-col gap-7">
                <div className="w-full h-fit flex items-center justify-between">
                    <h1 className="text-xl font-bold">{traduction.auth.signup}</h1>
                    <Icon.RockOn className="size-5" />
                </div>
                <div className="w-full h-fit flex flex-col justify-center gap-2">
                    <Form
                        form={form}
                        onInvalid={handleInvalid}
                        onSubmit={handleSubmit}
                    >
                        <div className="xl:grid-cols-2 grid-cols-1 grid gap-8">
                            <FormField
                                autoFocus
                                label="Nombre/s"
                                placeholder="John"
                                {...form.register("name")}
                            />
                            <FormField
                                label="Apellido/s"
                                placeholder="Doe"
                                {...form.register("surname")}
                            />
                        </div>
                        <FormButton
                            animateSuffixIcon
                            suffixIcon="ArrowRight"
                            type="submit"
                            variant="primary"
                        >Continuar</FormButton>
                    </Form>
                </div>
            </div>
        )
    }
)

SignupNamesStep.displayName = "Signup names step"

export default SignupNamesStep