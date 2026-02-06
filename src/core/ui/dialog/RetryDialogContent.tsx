"use client"

import Button from "@/src/shared/ui/common/Button"
import useModalDialog from "../../hooks/useModalDialog"

export default function RetryDialogContent({
    children
}: {
    children: string
}) {
    const modalDialog = useModalDialog()

    return (
        <>
            {children}
            <Button
                className="mt-3"
                suffixIcon="ArrowClockwise"
                variant="primary"
                onClick={modalDialog.close}
            >
                Reintentar
            </Button>
        </>
    )
}