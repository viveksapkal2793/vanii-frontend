import React from "react";
import { Sparkles } from "lucide-react";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import { pricingData } from "@/lib/data/pricing";
import { renderPriceCard } from "./components/pricingcard";

// Define types for the pricing plans and features

const PricingPage: React.FC = () => {



  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-primary-50/30 py-8 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 lg:mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="text-center md:text-left md:order-2">
              <div className="inline-flex items-center gap-2 bg-primary-100/50 px-3 sm:px-4 py-2 rounded-full text-primary-700 mb-2 sm:mb-4">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">
                  Find the Plan That Fits You
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-2 sm:mb-4 leading-tight">
                Clear Pricing, No Surprises
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed text-center md:text-left md:order-1">
              Start your spoken English journey with flexible plans designed
              for different learning needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {Object.values(pricingData).map((plan) => renderPriceCard(plan))}
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20 text-center px-4">
            <div className="bg-primary-50/50 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                Every plan gives you access to our core learning experience.
                Begin with the option that works for you and switch plans
                whenever you need. Need guidance before choosing?{" "}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 font-medium underline decoration-2 underline-offset-4"
                >
                  Reach out to our support team
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
