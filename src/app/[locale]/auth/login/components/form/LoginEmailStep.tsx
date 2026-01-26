import Form from "@/src/shared/components/Form";
import FormField from "@/src/shared/components/FormField";

export default function LoginEmailStep({
    onSubmit
}: {
    onSubmit?: () => void
}) {
    return (
        <Form>
            <FormField
                label="Correo electrónico"
                icon="Mention"
                placeholder="Ej: johndoe@gmail.com"
            />
        </Form>
    )
}