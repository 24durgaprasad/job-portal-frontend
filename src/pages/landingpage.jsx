import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "../components/ui/carousel";
import faqs from '../data/faqs.json';
import { Link } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import companies from '../data/companies.json';

const LandingPage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const [userType, setUserType] = useState(null);

  return (
    <div className="h-full w-full text-center px-4 py-12">
      {/* Onboarding Buttons */}
      {!userType && (
        <div className="my-20">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-12">I am a...</h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button
              onClick={() => setUserType("candidate")}
              className="w-full sm:w-auto text-lg px-8 py-6 lg:px-20 lg:py-10 bg-blue-500 hover:bg-blue-600"
            >
              Candidate
            </Button>
            <Button
              onClick={() => setUserType("recruiter")}
              className="w-full sm:w-auto text-lg px-8 py-6 lg:px-20 lg:py-10 bg-red-500 hover:bg-red-600"
            >
              Recruiter
            </Button>
          </div>
        </div>
      )}

      {/* Main Landing Section */}
      {userType && (
        <>
          {/* Hero Heading */}
          <div className="flex flex-col justify-center items-center text-center px-4 mb-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">Find Your Dream Job</h1>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">and get hired today!</h1>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-2xl text-muted-foreground mb-8 px-2">
            Explore thousands of job listings or find the perfect candidate
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 my-10">
            <Link to="/jobs">
              <Button className="w-full sm:w-auto text-lg font-bold px-8 py-6 lg:px-20 lg:py-10 bg-blue-500 hover:bg-blue-600">
                Find Jobs
              </Button>
            </Link>
            {userType === "recruiter" && (
              <Link to="/post-job">
                <Button className="w-full sm:w-auto text-lg font-bold px-8 py-6 lg:px-20 lg:py-10 bg-red-500 hover:bg-red-600">
                  Post a Job
                </Button>
              </Link>
            )}
          </div>

          {/* Company Carousel */}
          <div className="my-10 max-w-7xl mx-auto px-4">
            <Carousel plugins={[plugin.current]}>
              <CarouselContent className="flex items-center">
                {companies.map((company, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/5 px-4"
                  >
                    <img
                      src={company.path}
                      alt={company.name}
                      className="max-h-20 object-contain mx-auto"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Banner */}
          <div className="flex justify-center items-center p-4 sm:p-10">
            <img
              src="/banner2.png"
              alt="banner"
              className="w-full max-w-5xl rounded-md shadow"
            />
          </div>

          {/* Role Cards */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12 px-4">
            <Card className="bg-[#020817] text-white border border-gray-600 w-full sm:w-80 p-6 text-left">
              <CardTitle className="text-2xl font-bold mb-2">For Job Seekers</CardTitle>
              <CardDescription className="text-white">
                Search and apply for jobs, track applications, and more.
              </CardDescription>
            </Card>
            <Card className="bg-[#020817] text-white border border-gray-600 w-full sm:w-80 p-6 text-left">
              <CardTitle className="text-2xl font-bold mb-2">For Employers</CardTitle>
              <CardDescription className="text-white">
                Post jobs, manage applications, and find the best candidates.
              </CardDescription>
            </Card>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-20 max-w-4xl mx-auto px-4">
            {faqs.map((faq, index) => (
              <Accordion
                type="single"
                collapsible
                key={index}
                className="w-full mb-4 border-b border-gray-700"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-left text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
