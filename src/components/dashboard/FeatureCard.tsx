import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo: string;
}

const FeatureCard = ({
  icon = (
    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary"></div>
  ),
  title = "Feature Title",
  description = "This is a brief description of the feature and what it does.",
  linkTo = "/",
}: FeatureCardProps) => {
  return (
    <Card className="w-full h-full flex flex-col bg-white hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary/60 overflow-hidden">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-gray-600 leading-relaxed">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-primary-dark" asChild>
          <Link
            to={linkTo}
            className="flex items-center text-primary font-medium transition-colors"
          >
            View
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
