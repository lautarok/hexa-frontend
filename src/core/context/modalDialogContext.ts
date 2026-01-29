import { createContext } from "react";

const ModalDialogContext = createContext({
    children: null as null | React.ReactNode,
    isOpen: false,
    title: "",
    close() {},
    open(title: string, children: React.ReactNode) {}
})

export default ModalDialogContext