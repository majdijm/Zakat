import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface GuidelineSearchProps {
  onSearch?: (query: string, category: string) => void;
}

const GuidelineSearch = ({ onSearch = () => {} }: GuidelineSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, category);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-sm">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search for guidelines, verses, or hadiths..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="quran">Quranic Verses</SelectItem>
              <SelectItem value="hadith">Hadiths</SelectItem>
              <SelectItem value="scholarly">Scholarly Opinions</SelectItem>
              <SelectItem value="faq">FAQs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="whitespace-nowrap">
          Search Guidelines
        </Button>
      </form>
    </div>
  );
};

export default GuidelineSearch;
