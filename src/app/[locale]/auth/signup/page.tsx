import getTraduction from "@/src/shared/services/getTraduction"
import SignupForm from "@/src/ui/features/signup/components/form/SignupForm"
import { Metadata } from "next"

export async function generateMetadata({
  params
}: {
  params: Promise<{
    locale: string
  }>
}): Promise<Metadata> {
  const locale = (await params).locale,
    traduction = getTraduction(locale)

  return {
    title: traduction.auth.signup + " | " + traduction.common.appName + " | " + traduction.seo.description
  }
}

export default function Signup() {
    return (
        <SignupForm />
    )
}