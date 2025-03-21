import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  BookOpen,
  DollarSign,
  Calendar,
  Scale,
  Coins,
  CreditCard,
  Users,
  AlertCircle,
} from "lucide-react";

const ZakatGuidelines = () => {
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">
          Islamic Guidelines for Zakat
        </CardTitle>
        <CardDescription className="text-base">
          Important information about Zakat calculation according to Islamic
          teachings
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem
            value="zakat-obligation"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-lg font-medium">Zakat Obligation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>
                  Zakat is one of the five pillars of Islam and is obligatory on
                  Muslims whose wealth exceeds the Nisab threshold.
                </p>
                <p className="pl-4 border-l-2 border-emerald-500 italic">
                  "Take from their wealth a charity by which you purify them and
                  cause them increase" (Quran 9:103).
                </p>
                <p>
                  Zakat purifies one's wealth and soul, and helps those in need.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="nisab"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Scale className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-lg font-medium">
                  Nisab (Minimum Threshold)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>
                  Zakat becomes obligatory only if one's wealth exceeds the
                  Nisab threshold.
                </p>
                <p>
                  The Nisab is defined as approximately 85 grams of gold or 595
                  grams of silver.
                </p>
                <p>
                  Many scholars recommend using the silver standard as it
                  results in a lower threshold, benefiting more people in need.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="zakat-rate"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-lg font-medium">Zakat Rate (2.5%)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>
                  The rate of Zakat on monetary wealth is 2.5% (one-fortieth).
                </p>
                <p>
                  This rate is derived from the Sunnah (prophetic practice) and
                  has been unanimously agreed upon for monetary wealth.
                </p>
                <p>
                  Different types of wealth like agricultural produce or
                  livestock have different rates, but those are outside the
                  scope of this calculator.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="holding-period"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-lg font-medium">
                  Holding Period (Haul)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>
                  A crucial condition for Zakat on wealth is that it must be
                  held for a full lunar year (approximately 354 days) above the
                  Nisab.
                </p>
                <p className="pl-4 border-l-2 border-purple-500 italic">
                  This is based on hadith: "No zakat is due on wealth until one
                  year has passed over it."
                </p>
                <p>
                  It is recommended to pick a consistent date each year to
                  assess your Zakat.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="eligible-assets"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-lg font-medium">Eligible Assets</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>Assets that are subject to Zakat include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cash (on hand or in bank)</li>
                  <li>Gold and silver (in any form)</li>
                  <li>Investment assets (stocks, business inventory)</li>
                  <li>Cryptocurrencies</li>
                  <li>Rental income that has accumulated</li>
                  <li>Any other liquid or trade assets</li>
                </ul>
                <p>
                  Personal-use assets like your home, car, and furniture are
                  exempt from Zakat.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="gold-silver"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Coins className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-lg font-medium">
                  Gold and Silver Jewelry
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>
                  All gold and silver is generally considered Zakatable,
                  including jewelry.
                </p>
                <p>
                  There is a difference of opinion among scholars about personal
                  jewelry:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Hanafi school: All gold/silver is subject to Zakat</li>
                  <li>
                    Some Shafi'i opinions: Jewelry that is regularly worn may be
                    exempt
                  </li>
                </ul>
                <p>
                  This calculator takes the precautionary approach that any
                  significant gold or silver wealth is subject to Zakat, as this
                  is the majority view.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="debts"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-lg font-medium">
                  Debts and Liabilities
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>
                  In traditional Fiqh, debts that are due can offset one's
                  wealth for Zakat purposes.
                </p>
                <p>
                  Generally, only debts due within the next year should be
                  subtracted from total assets.
                </p>
                <p>
                  Long-term loans (like a mortgage) beyond the current year are
                  not fully deducted – only the imminent dues are considered.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="recipients"
            className="border rounded-md px-4 py-2 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-lg font-medium">Recipients of Zakat</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-2">
              <div className="space-y-3 text-gray-700">
                <p>
                  The Quran (9:60) specifies eight categories of people who are
                  eligible to receive Zakat:
                </p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>The poor (al-fuqara')</li>
                  <li>The needy (al-masakin)</li>
                  <li>Zakat administrators</li>
                  <li>Those whose hearts are to be reconciled</li>
                  <li>Those in bondage (slaves and captives)</li>
                  <li>The debt-ridden</li>
                  <li>In the cause of Allah</li>
                  <li>The wayfarer</li>
                </ol>
                <p>
                  It is important to ensure that your Zakat reaches the eligible
                  recipients.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ZakatGuidelines;
