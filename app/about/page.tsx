"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Linkedin, Twitter } from "lucide-react"
import { useTranslation } from "@/context/translation-provider"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage() {
  const { t } = useTranslation()
  const { toast } = useToast()

  const handleContactClick = () => {
    toast({
      title: t("contactUnavailable"),
      description: t("tryAgainLater"),
      variant: "destructive",
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="group mb-4">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {t("backToHome")}
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("aboutUs")}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("meetTheTeam")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <AuthorProfile
            name="Alberto Gómez"
            title={t("leadDeveloper")}
            image="/placeholder.svg?height=400&width=400"
            description={t("albertoDescription")}
            github="https://github.com"
            twitter="https://twitter.com"
            linkedin="https://linkedin.com"
          />

          <AuthorProfile
            name="David Gómez"
            title={t("uxuiDesigner")}
            image="/placeholder.svg?height=400&width=400"
            description={t("davidDescription")}
            github="https://github.com"
            twitter="https://twitter.com"
            linkedin="https://linkedin.com"
          />
        </div>

        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">{t("ourMission")}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t("missionDescription")}</p>

            <h2 className="text-2xl font-bold mb-4">{t("ourStory")}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t("storyPart1")}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">{t("storyPart2")}</p>
          </CardContent>
        </Card>

        {/* Terms and Conditions Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t("termsAndConditions")}</h2>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">{t("termsOfUse")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("termsOfUseDescription")}</p>

              <h3 className="text-xl font-semibold mb-4 mt-8">{t("promoCodeRules")}</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("promoCodeRule1")}</li>
                <li>{t("promoCodeRule2")}</li>
                <li>{t("promoCodeRule3")}</li>
                <li>{t("promoCodeRule4")}</li>
                <li>{t("promoCodeRule5")}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-8">{t("userResponsibilities")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("userResponsibilitiesDescription")}</p>

              <h3 className="text-xl font-semibold mb-4 mt-8">{t("disclaimers")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("disclaimersDescription")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Policy Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t("privacyPolicy")}</h2>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">{t("informationWeCollect")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("informationWeCollectDescription")}</p>

              <h3 className="text-xl font-semibold mb-4 mt-8">{t("howWeUseInformation")}</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>{t("informationUse1")}</li>
                <li>{t("informationUse2")}</li>
                <li>{t("informationUse3")}</li>
                <li>{t("informationUse4")}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-8">{t("dataSecurity")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("dataSecurityDescription")}</p>

              <h3 className="text-xl font-semibold mb-4 mt-8">{t("cookiesPolicy")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("cookiesPolicyDescription")}</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">{t("faq")}</h2>
          <Card>
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium">{t("faqQuestion1")}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{t("faqAnswer1")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium">{t("faqQuestion2")}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{t("faqAnswer2")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium">{t("faqQuestion3")}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{t("faqAnswer3")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium">{t("faqQuestion4")}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{t("faqAnswer4")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium">{t("faqQuestion5")}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{t("faqAnswer5")}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">{t("getInTouch")}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">{t("getInTouchDescription")}</p>
          <Button className="px-8" onClick={handleContactClick}>
            {t("contactUs")}
          </Button>
        </div>
      </div>
    </main>
  )
}

interface AuthorProfileProps {
  name: string
  title: string
  image: string
  description: string
  github?: string
  twitter?: string
  linkedin?: string
}

function AuthorProfile({ name, title, image, description, github, twitter, linkedin }: AuthorProfileProps) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <div className="aspect-square relative md:h-full">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
        </div>
        <div className="p-6 md:w-2/3">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-primary mb-4">{title}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
          <div className="flex space-x-4">
            {github && (
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {twitter && (
              <Link href={twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {linkedin && (
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

