import { createContext } from "react";

const ModalDialogContext = createContext<{
    children: null | React.ReactNode
    isOpen: boolean
    title: string
    close: () => void
    open: (title: string, children: React.ReactNode) => void
}>({
    children: null,
    isOpen: false,
    title: "",
    close() {},
    open() {}
})

export default ModalDialogContext