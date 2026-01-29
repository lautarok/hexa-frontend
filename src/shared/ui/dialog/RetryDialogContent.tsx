"use client"

import useModalDialog from "../../hooks/useModalDialog"
import Button from "../common/Button"

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