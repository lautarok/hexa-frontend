export default function Form({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) {
    return (
        <form
            className={[
                "w-full h-fit flex flex-col gap-5",
                className ?? ""
            ].join(" ")}
        >
            {children}
        </form>
    )
}