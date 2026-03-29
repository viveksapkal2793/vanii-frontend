"use client";

import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/hooks/custom/useAuthContext";

const Hero: FC = () => {
  const router = useRouter();
  const auth = useAuthContext();

  return (
    <section id="hero" className="observe bg-primary-50 py-14">
      <div className="max-w-screen-xl mx-auto max-md:px-8 md:px-24 flex flex-col justify-center items-center gap-16">
        <h1 className="font-satoshi-medium text-4xl leading-tight text-center bg-gradient-to-r from-black to-primary bg-clip-text text-transparent">
          India&#39;s AI for Spoken English Learning
        </h1>

        <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:flex max-md:flex-row-reverse gap-8 items-center">
          <Card className="rounded-medium h-full min-h-[29rem] border-none shadow-none max-md:hidden">
            <CardContent className="p-0 h-full">
              <div className="relative w-full h-full">
                <Image
                  src="/images/home/heroSection2.webp"
                  alt="Hero section image"
                  fill
                  className="object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col h-full w-full gap-8">
            <Card className="rounded-medium bg-primary-100">
              <CardContent className="p-8 flex flex-col items-start gap-6">
                <h2 className="font-satoshi-medium text-lg">
                  Quick Onboarding | Speaking with AI | Personalized Learning |
                  Automated Processes
                </h2>
                <p className="text-md">
                  At Vartalaap, our mission is to make language learning accessible,
                  personalized, practical and enjoyable for everyone, regardless
                  of their background or location.
                </p>
                <div className="flex flex-wrap gap-5">
                  <Button
                    variant="outline"
                    className="animate-pulse border-2 border-dashed border-primary text-primary/90 font-bold hover:bg-primary-100"
                    onClick={() =>
                      auth.config.loggedIn
                        ? router.push("/learn")
                        : router.push("/signup")
                    }
                  >
                    {auth?.config.loggedIn ? "Start Learning" : "Get Started"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="relative  w-full aspect-video">
              <Image
                src="/images/home/heroSection1.webp"
                alt="Decorative 3D illustration"
                className="rounded-lg object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
