import ModalDialogContext from "@/src/core/context/modalDialogContext";
import { useContext } from "react";

export default function useModalDialog() {
    const context = useContext(ModalDialogContext)

    return {
        isOpen: context.isOpen,
        title: context.title,
        children: context.children,
        close: context.close,
        open: context.open,
    }
}