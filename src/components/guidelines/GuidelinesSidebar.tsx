import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const GuidelinesSidebar = () => {
  return (
    <div className="h-full w-full max-w-md overflow-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-800">Islamic Guidelines for Zakat</h2>
        <p className="mt-2 text-emerald-700">
          Important information about Zakat calculation according to Islamic teachings
        </p>
      </div>

      <div className="p-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Zakat Obligation
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>Zakat is one of the five pillars of Islam and is obligatory on Muslims whose wealth exceeds the Nisab threshold.</p>
              <p className="italic border-l-4 border-emerald-500 pl-3 my-2 bg-emerald-50 p-2 rounded">
                "Take from their wealth a charity by which you purify them and cause them increase" (Quran 9:103).
              </p>
              <p>Zakat purifies one's wealth and soul, and helps those in need.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Nisab (Minimum Threshold)
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>Zakat becomes obligatory only if one's wealth exceeds the Nisab threshold.</p>
              <p>The Nisab is defined as approximately 85 grams of gold or 595 grams of silver.</p>
              <p>Many scholars recommend using the silver standard as it results in a lower threshold, benefiting more people in need.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Zakat Rate (2.5%)
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>The rate of Zakat on monetary wealth is 2.5% (one-fortieth).</p>
              <p>This rate is derived from the Sunnah (prophetic practice) and has been unanimously agreed upon for monetary wealth.</p>
              <p>Different types of wealth like agricultural produce or livestock have different rates, but those are outside the scope of this calculator.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Holding Period (Haul)
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>A crucial condition for Zakat on wealth is that it must be held for a full lunar year (approximately 354 days) above the Nisab.</p>
              <p className="italic border-l-4 border-emerald-500 pl-3 my-2 bg-emerald-50 p-2 rounded">
                "No zakat is due on wealth until one year has passed over it."
              </p>
              <p>It is recommended to pick a consistent date each year to assess your Zakat.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Eligible Assets
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>Assets that are subject to Zakat include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cash (on hand or in bank)</li>
                <li>Gold and silver (in any form)</li>
                <li>Investment assets (stocks, business inventory)</li>
                <li>Cryptocurrencies</li>
                <li>Rental income that has accumulated</li>
                <li>Any other liquid or trade assets</li>
              </ul>
              <p>Personal-use assets like your home, car, and furniture are exempt from Zakat.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Gold and Silver Jewelry
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>All gold and silver is generally considered Zakatable, including jewelry.</p>
              <p>There is a difference of opinion among scholars about personal jewelry:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hanafi school: All gold/silver is subject to Zakat</li>
                <li>Some Shafi'i opinions: Jewelry that is regularly worn may be exempt</li>
              </ul>
              <p>This calculator takes the precautionary approach that any significant gold or silver wealth is subject to Zakat, as this is the majority view.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Debts and Liabilities
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>In traditional Fiqh, debts that are due can offset one's wealth for Zakat purposes.</p>
              <p>Generally, only debts due within the next year should be subtracted from total assets.</p>
              <p>Long-term loans (like a mortgage) beyond the current year are not fully deducted – only the imminent dues are considered.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg font-medium py-4 hover:text-emerald-700">
              Recipients of Zakat
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 space-y-2">
              <p>The Quran (9:60) specifies eight categories of people who are eligible to receive Zakat:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>The poor (al-fuqara')</li>
                <li>The needy (al-masakin)</li>
                <li>Zakat administrators</li>
                <li>Those whose hearts are to be reconciled</li>
                <li>Those in bondage (slaves and captives)</li>
                <li>The debt-ridden</li>
                <li>In the cause of Allah</li>
                <li>The wayfarer</li>
              </ol>
              <p>It is important to ensure that your Zakat reaches the eligible recipients.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default GuidelinesSidebar;
