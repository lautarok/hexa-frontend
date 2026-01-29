import RetryDialogContent from "../ui/dialog/RetryDialogContent";

export default function retryDialog(message: string) {
    return <RetryDialogContent>
        {message}
    </RetryDialogContent>
}