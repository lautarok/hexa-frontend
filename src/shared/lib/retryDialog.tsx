import RetryDialogContent from "@/src/core/ui/dialog/RetryDialogContent";

export default function retryDialog(message: string) {
    return <RetryDialogContent>
        {message}
    </RetryDialogContent>
}