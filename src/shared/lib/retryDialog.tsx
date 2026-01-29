import RetryDialogContent from "../components/dialog/RetryDialogContent";

export default function retryDialog(message: string) {
    return <RetryDialogContent>
        {message}
    </RetryDialogContent>
}