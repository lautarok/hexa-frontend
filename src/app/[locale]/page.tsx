import Footer from "@/src/shared/components/Footer";
import Header from "@/src/shared/components/Header";
import LocaleSelector from "@/src/shared/components/LocaleSelector";
import getTraduction from "@/src/shared/services/getTraduction";

export default async function Home({
  params
}: {
  params: Promise<{
    locale: string
  }>
}) {
  const locale = (await params).locale,
    traduction = getTraduction(locale)

  return (
    <>
      <Header traduction={traduction} locale={locale} />
      <main>
        <section className="w-full h-fit min-h-[calc(100dvh-6rem)] pb-10 flex items-center justify-center text-center flex-col">
          <h1 className="text-3xl font-bold">{traduction.home.heroTitle}</h1>
          <p className="text-xl">{traduction.home.heroDescription}</p>
          <LocaleSelector boxAlignmentX="center" traduction={traduction} />
        </section>
      </main>
      <Footer traduction={traduction} locale={locale} />
    </>
  )
}
