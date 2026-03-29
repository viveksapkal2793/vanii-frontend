"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const CTA: FC = () => {
  return (
    <section id="cta" className="max-md:px-8 md:px-24 py-20 bg-card">
      <Card className="max-w-screen-xl mx-auto my-12">
        <CardContent
          className="flex flex-col justify-center items-center p-24 text-center bg-gradient-to-t from-black/20 to-black/20 bg-cover bg-no-repeat rounded-md"
          style={{ backgroundImage: "url('/images/home/cta.webp')" }}
        >
          <h2 className="mb-8 font-satoshi-bold text-card text-4xl">
            Join the Vartalaap Community and Learn!
          </h2>
          <Button
        variant="default"
            className="bg-primary text-primary-50 hover:bg-primary-700"
            onClick={() =>
              window.open("https://chat.whatsapp.com/BjP5YAWgQ53Js1eGSsmsNV")
            }
          >
            <span className="text-white text-lg">Join Community</span>
            <ArrowRight className="ml-2 w-6 h-6 transition-transform duration-200 ease-in-out hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default CTA;
