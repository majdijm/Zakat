import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { BookOpen, BookText, Users } from "lucide-react";

interface GuidelineContentProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const GuidelineContent = ({
  searchQuery = "",
  selectedCategory = "all",
}: GuidelineContentProps) => {
  // Mock data for guidelines
  const quranicVerses = [
    {
      id: 1,
      reference: "Surah Al-Baqarah 2:43",
      text: "And establish prayer and give zakah and bow with those who bow [in worship and obedience].",
      explanation:
        "This verse establishes Zakat as one of the fundamental pillars of Islam, alongside prayer.",
    },
    {
      id: 2,
      reference: "Surah Al-Baqarah 2:110",
      text: "And establish prayer and give zakah, and whatever good you put forward for yourselves - you will find it with Allah. Indeed, Allah is Seeing of what you do.",
      explanation:
        "This verse emphasizes that giving Zakat is beneficial for the giver, as Allah rewards such acts of charity.",
    },
    {
      id: 3,
      reference: "Surah At-Tawbah 9:60",
      text: "Zakah expenditures are only for the poor and for the needy and for those employed to collect [zakah] and for bringing hearts together and for freeing captives and for those in debt and for the cause of Allah and for the [stranded] traveler - an obligation [imposed] by Allah. And Allah is Knowing and Wise.",
      explanation:
        "This verse specifies the eight categories of people who are eligible to receive Zakat funds.",
    },
    {
      id: 4,
      reference: "Surah At-Tawbah 9:103",
      text: "Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase, and invoke [Allah's blessings] upon them. Indeed, your invocations are reassurance for them. And Allah is Hearing and Knowing.",
      explanation:
        "This verse highlights the purifying nature of Zakat for the wealth and soul of the giver.",
    },
  ];

  const hadiths = [
    {
      id: 1,
      narrator: "Bukhari and Muslim",
      text: "Islam is built upon five pillars: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, performing the prayers, paying the Zakat, making the pilgrimage to the House, and fasting in Ramadan.",
      explanation:
        "This hadith establishes Zakat as one of the five pillars of Islam.",
    },
    {
      id: 2,
      narrator: "Bukhari",
      text: "Whoever is made wealthy by Allah and does not pay the Zakat of his wealth, then on the Day of Resurrection his wealth will be made like a bald-headed poisonous male snake with two black spots over the eyes. The snake will encircle his neck and bite his cheeks and say, 'I am your wealth, I am your treasure.'",
      explanation:
        "This hadith warns about the severe consequences of not paying Zakat when it is due.",
    },
    {
      id: 3,
      narrator: "Muslim",
      text: "When you pay the Zakat of your wealth, you have fulfilled what is required of you.",
      explanation:
        "This hadith clarifies that paying Zakat fulfills one's financial obligation in Islam.",
    },
    {
      id: 4,
      narrator: "Abu Dawud",
      text: "There is no Zakat on less than five camels, and there is no Zakat on less than five awsuq (of agricultural produce), and there is no Zakat on less than five awaq (of silver).",
      explanation:
        "This hadith establishes minimum thresholds (nisab) for different types of wealth before Zakat becomes obligatory.",
    },
  ];

  const scholarlyInterpretations = [
    {
      id: 1,
      scholar: "Imam Abu Hanifa",
      topic: "Nisab for Gold and Silver",
      interpretation:
        "The nisab for gold is 87.48 grams (7.5 tolas, 20 dinars) and for silver is 612.36 grams (52.5 tolas, 200 dirhams). Zakat is due at 2.5% of the value once this threshold is reached and a lunar year has passed.",
      school: "Hanafi",
    },
    {
      id: 2,
      scholar: "Imam Malik",
      topic: "Zakat on Agricultural Produce",
      interpretation:
        "Zakat is due on crops at the rate of 10% if they are watered naturally (by rain), and 5% if they are watered artificially (requiring labor and equipment). This is payable at the time of harvest without waiting for a year to pass.",
      school: "Maliki",
    },
    {
      id: 3,
      scholar: "Imam Shafi'i",
      topic: "Zakat on Trade Goods",
      interpretation:
        "Goods intended for trade are subject to Zakat at 2.5% of their market value at the time Zakat is due, provided their value reaches the nisab of gold or silver and a lunar year has passed.",
      school: "Shafi'i",
    },
    {
      id: 4,
      scholar: "Imam Ahmad ibn Hanbal",
      topic: "Zakat on Debts",
      interpretation:
        "If a person has debts owed to them, Zakat is due on debts that are expected to be repaid (strong debts) but not on doubtful debts until they are recovered.",
      school: "Hanbali",
    },
  ];

  // Filter content based on search query if provided
  const filteredQuranicVerses = quranicVerses.filter(
    (verse) =>
      searchQuery === "" ||
      verse.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verse.reference.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredHadiths = hadiths.filter(
    (hadith) =>
      searchQuery === "" ||
      hadith.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredScholarlyInterpretations = scholarlyInterpretations.filter(
    (interpretation) =>
      searchQuery === "" ||
      interpretation.interpretation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      interpretation.scholar
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      interpretation.topic.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <Tabs defaultValue="quran" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="quran" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Quranic Verses
          </TabsTrigger>
          <TabsTrigger value="hadith" className="flex items-center gap-2">
            <BookText className="h-4 w-4" />
            Hadiths
          </TabsTrigger>
          <TabsTrigger value="scholarly" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Scholarly Interpretations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quran">
          <ScrollArea className="h-[500px] pr-4">
            {filteredQuranicVerses.length > 0 ? (
              filteredQuranicVerses.map((verse) => (
                <Card key={verse.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">
                      {verse.reference}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="pl-4 border-l-4 border-primary italic mb-4">
                      {verse.text}
                    </blockquote>
                    <Separator className="my-4" />
                    <CardDescription className="text-sm">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {verse.explanation}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No Quranic verses found matching your search criteria.
              </p>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="hadith">
          <ScrollArea className="h-[500px] pr-4">
            {filteredHadiths.length > 0 ? (
              filteredHadiths.map((hadith) => (
                <Card key={hadith.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">
                      Narrated by {hadith.narrator}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="pl-4 border-l-4 border-primary italic mb-4">
                      {hadith.text}
                    </blockquote>
                    <Separator className="my-4" />
                    <CardDescription className="text-sm">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {hadith.explanation}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hadiths found matching your search criteria.
              </p>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="scholarly">
          <ScrollArea className="h-[500px] pr-4">
            {filteredScholarlyInterpretations.length > 0 ? (
              filteredScholarlyInterpretations.map((interpretation) => (
                <Card key={interpretation.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">
                      {interpretation.topic}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium">
                      By {interpretation.scholar} ({interpretation.school}{" "}
                      School)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{interpretation.interpretation}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No scholarly interpretations found matching your search
                criteria.
              </p>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuidelineContent;
