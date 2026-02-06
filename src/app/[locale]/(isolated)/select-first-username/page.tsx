"use client"

import usernameSchema, { UsernameInput } from "@/src/core/lib/usernameSchema";
import Button from "@/src/shared/ui/common/Button";
import Form from "@/src/shared/ui/form/Form";
import FormField from "@/src/shared/ui/form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SelectUsernamePage() {
    const form = useForm<UsernameInput>({
        resolver: zodResolver(usernameSchema)
    })

    const {isSubmitting, isSubmitSuccessful} = form.formState

    return (
        <article className="w-full h-fit py-10 container-x-padding flex items-center justify-center">
            <div className="w-100 max-w-full h-fit p-10 rounded-2xl border-1 border-white/10 flex flex-col gap-7">
                <h1 className="text-xl font-bold">Crea tu nombre de usuario</h1>
                <Form form={form} onInvalid={() => {}} onSubmit={() => form.handleSubmit(() => {})}>
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
            </div>
        </article>
    )
}