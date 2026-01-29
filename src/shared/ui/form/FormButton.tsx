import { useMemo } from "react";
import useFormCarrouselStep from "../../hooks/useFormCarrouselStep";
import Button from "../common/Button";

export default function FormButton({disabled, ...props}: Parameters<typeof Button>[0]) {
    const formCarrouselStep = useFormCarrouselStep()

    const isDisabled = useMemo(() => 
        (formCarrouselStep && !formCarrouselStep.isCurrent)
        || disabled
    , [disabled, formCarrouselStep])
    
    return (
        <Button disabled={isDisabled} {...props} />
    )
}