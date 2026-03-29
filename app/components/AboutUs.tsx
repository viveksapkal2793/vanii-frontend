import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const AboutSection = () => {
  
  return (
    <section id="about-us" className="py-24 bg-card">
      <div className="max-w-screen-xl mx-auto max-md:px-8 md:px-24 grid max-md:grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Card className="border-none shadow-none md:order-2">
          <CardContent className="p-0">
            <h2 className="font-satoshi-medium text-4xl text-primary- font-bold">
              Who We Are
            </h2>
            <p className="mt-12 text-xl tracking-wider">
              Vartalaap is an AI-powered language learning platform built to
              guide you toward confident communication. Whether you are
              preparing for exams like IELTS or TOEFL, sharpening workplace
              communication, or improving everyday speaking, the platform adapts
              to your goals. Our assistant delivers practical practice,
              personalized guidance, and a learning journey designed around your
              pace.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none md:order-1">
          <CardContent className="p-0">
            <div className="img-transition rounded-medium min-h-[29rem] relative">
              <Image
                src="/images/home/aboutUs1.webp"
                alt="abstract 3d image of blocks depicting language learning"
                fill
                priority
                className="transition-transform duration-1000 ease-in-out rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
