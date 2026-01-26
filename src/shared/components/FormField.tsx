import * as Icon from "akar-icons"

export default function FormField({
    label,
    placeholder,
    icon
}: {
    label: string,
    placeholder?: string,
    icon?: keyof typeof Icon
}) {
    const IconComponent = icon ? Icon[icon] : undefined

    return (
        <div className="w-full h-fit flex flex-col gap-4">
            <span className="leading-[1] text-sm font-semibold">{label}</span>
            <div
                className={[
                    "w-full h-14 grid gap-3 border-1 border-white/10 items-center rounded-md px-4",
                    IconComponent ? "grid-cols-[auto_1fr]" : "grid-cols-[1fr]"
                ].join(" ")}
            >
                {
                    IconComponent ? (
                        <IconComponent size={18} />
                    ) : null
                }
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full"
                />
            </div>
        </div>
    )
}