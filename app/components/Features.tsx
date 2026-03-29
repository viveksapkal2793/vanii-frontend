"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "/images/icons/Curate.svg",
    title: "Hyper-Realistic Language Teacher",
    description:
      "Experience an AI tutor that feels natural and adapts to your progress, so each session stays relevant to your communication goals.",
  },
  {
    icon: "/images/icons/Personalize.svg",
    title: "Personalized Feedback",
    description:
      "Receive quick, actionable feedback that helps you expand vocabulary, reduce grammar mistakes, and speak with greater confidence.",
  },
  {
    icon: "/images/icons/Culture.svg",
    title: "Interactive Sessions",
    description:
      "Learn through interactive conversations and realistic scenarios that make practice engaging, practical, and confidence-building.",
  },
  {
    icon: "/images/icons/Community.svg",
    title: "Community Support",
    description:
      "Connect with a supportive learner community to exchange tips, share progress, and enrich your learning with peer insights.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-primary-50 py-20">
      <div className="max-w-screen-xl mx-auto max-md:px-8 md:px-24">
        <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <h2 className="font-satoshi-medium text-3xl text-primary-700 max-w-xl max-md:mb-1 font-semibold md:order-2">
            Breaking Language Barriers, Creating Opportunities
          </h2>
          <p className="text-md md:order-1">
            We envision a world where language is a strength, not a limitation.
            By combining AI guidance with practical conversation practice, we
            help learners build the skills needed to thrive in a connected,
            global environment. Our goal is to keep language learning
            accessible, effective, and meaningful for everyone.
          </p>
        </div>

        <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border bg-primary/10 transition-colors duration-200 hover:bg-primary hover:text-neutral-50"
            >
              <CardContent className="p-8">
                <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
                  <div className="grid place-items-center max-w-20 aspect-square p-4 rounded-full bg-primary transition duration-200 group-hover:border-primary/5 max-md:hidden">
                    <Image
                      src={feature.icon}
                      alt={`${feature.title} icon`}
                      width={40}
                      height={40}
                      className="h-auto w-auto"
                    />
                  </div>
                  <div>
                    <h3 className="font-satoshi-medium text-lg max-md:mb-1 font-semibold">
                      {feature.title}
                    </h3>
                    <p className="align-self-start text-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
