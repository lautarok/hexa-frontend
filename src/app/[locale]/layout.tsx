import "./globals.css";
import { Poppins } from "next/font/google"
import getTraduction from "../../shared/services/getTraduction";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ModalDialog from "@/src/core/components/ModalDialog";
import AppProviders from "./providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"]
})

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
    title: traduction.common.appName + " | " + traduction.seo.description,
    description: traduction.seo.largeDescription,
    keywords: traduction.seo.keywords
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}>) {
  const locale = (await params).locale,
    traduction = getTraduction(locale)

  if (!traduction) {
    redirect("/es")
  }

  return (
    <html lang={locale}>
      <body
        className={`${poppins.className} antialiased flex flex-col flex-wrap overflow-y-scroll`}
      >
        <AppProviders>
          {children}
          <ModalDialog />
        </AppProviders>
      </body>
    </html>
  );
}
