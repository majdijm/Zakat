import React, { useState } from "react";
import { BookOpen, HelpCircle, Info, BookText, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import GuidelineSearch from "./GuidelineSearch";
import GuidelineContent from "./GuidelineContent";
import ZakatGuidelines from "./ZakatGuidelines";

interface IslamicGuidelinesProps {
  initialCategory?: string;
}

const IslamicGuidelines = ({
  initialCategory = "quran",
}: IslamicGuidelinesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("zakat-guidelines");

  const handleSearch = (query: string, category: string) => {
    setSearchQuery(query);
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
          Islamic Guidelines on Zakat
        </h1>
        <p className="text-gray-600">
          Explore Quranic verses, hadiths, and scholarly interpretations
          about Zakat obligations and practices.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-6 bg-emerald-50 p-1">
          <TabsTrigger
            value="zakat-guidelines"
            className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            <BookText className="h-4 w-4" />
            Zakat Guidelines
          </TabsTrigger>
          <TabsTrigger
            value="guidelines"
            className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            <BookOpen className="h-4 w-4" />
            Reference
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <HelpCircle className="h-4 w-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            <Info className="h-4 w-4" />
            About Zakat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="zakat-guidelines" className="space-y-6">
          <ZakatGuidelines />
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-emerald-100">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-emerald-500" />
              <h2 className="text-xl font-semibold text-emerald-700">Search References</h2>
            </div>
            <GuidelineSearch onSearch={handleSearch} />
          </div>
          <GuidelineContent
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card className="bg-white shadow-md border border-emerald-100">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-white">
              <CardTitle className="text-emerald-700">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions and answers about Zakat obligations and
                practices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Who is obligated to pay Zakat?
                </h3>
                <p className="text-gray-700">
                  Zakat is obligatory on every adult Muslim who possesses
                  wealth equal to or exceeding the nisab threshold for a
                  complete lunar year. The person must have full ownership
                  and control of the wealth.
                </p>
                <Separator className="bg-emerald-100" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  What is the nisab threshold?
                </h3>
                <p className="text-gray-700">
                  Nisab is the minimum amount of wealth a Muslim must
                  possess before Zakat becomes obligatory. It is equivalent
                  to 87.48 grams of gold or 612.36 grams of silver, or their
                  monetary equivalent.
                </p>
                <Separator className="bg-emerald-100" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  What rate of Zakat is paid?
                </h3>
                <p className="text-gray-700">
                  The standard rate for Zakat is 2.5% of the total eligible
                  wealth. However, different rates apply to certain
                  categories such as agricultural produce and livestock.
                </p>
                <Separator className="bg-emerald-100" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  When should Zakat be paid?
                </h3>
                <p className="text-gray-700">
                  Zakat is due after a complete lunar year (Hawl) has passed
                  on the wealth that meets the nisab threshold. Many Muslims
                  choose to pay during Ramadan for additional spiritual
                  rewards, though it can be paid at any time of the year.
                </p>
                <Separator className="bg-emerald-100" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Who can receive Zakat?
                </h3>
                <p className="text-gray-700">
                  According to the Quran (9:60), there are eight categories
                  of people eligible to receive Zakat: the poor, the needy,
                  Zakat administrators, those whose hearts are to be
                  reconciled, those in bondage (slaves and captives), those
                  in debt, in the cause of Allah, and the stranded traveler.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card className="bg-white shadow-md border border-emerald-100">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-white">
              <CardTitle className="text-emerald-700">About Zakat</CardTitle>
              <CardDescription>
                Understanding the fundamental principles and importance of
                Zakat in Islam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Definition and Purpose
                </h3>
                <p className="text-gray-700">
                  Zakat is the third pillar of Islam, representing a form of
                  obligatory charity that serves to purify wealth and souls.
                  The word "Zakat" means purification and growth. By giving
                  Zakat, Muslims purify their wealth and gain spiritual
                  growth while helping those in need.
                </p>
              </div>

              <Separator className="bg-emerald-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Spiritual Significance
                </h3>
                <p className="text-gray-700">
                  Zakat helps Muslims develop qualities of generosity and
                  compassion while reducing attachment to material wealth.
                  It reminds believers that all wealth ultimately belongs to
                  Allah, and humans are merely trustees. Paying Zakat is an
                  act of worship and obedience to Allah's commands.
                </p>
              </div>

              <Separator className="bg-emerald-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">Social Impact</h3>
                <p className="text-gray-700">
                  Zakat plays a crucial role in reducing economic inequality
                  and fostering social cohesion within Muslim communities.
                  It creates a safety net for the less fortunate, helps
                  alleviate poverty, and prevents the concentration of
                  wealth among a few individuals. Through Zakat, Islam
                  establishes a systematic approach to wealth redistribution
                  and social welfare.
                </p>
              </div>

              <Separator className="bg-emerald-100" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Historical Context
                </h3>
                <p className="text-gray-700">
                  Zakat was formally instituted as a mandatory practice
                  during the second year of Hijrah (Islamic calendar).
                  During the time of the Prophet Muhammad (peace be upon
                  him) and the early caliphs, Zakat was collected and
                  distributed by the Islamic state. Throughout Islamic
                  history, Zakat has remained a fundamental economic and
                  spiritual practice, though its implementation has varied
                  across different regions and time periods.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IslamicGuidelines;
