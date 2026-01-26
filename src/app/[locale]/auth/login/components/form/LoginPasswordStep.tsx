import Form from "@/src/shared/components/Form"
import FormField from "@/src/shared/components/FormField"
import * as Icon from "akar-icons"

export default function LoginPasswordStep({
    onSubmit
}: {
    onSubmit?: () => void
}) {
    return (
        <Form>
            <FormField
                label="Contraseña"
                icon="Key"
            />
        </Form>
    )
}