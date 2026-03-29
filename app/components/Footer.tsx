"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/#about-us", label: "About Us" },
  { href: "/#features", label: "Features" },
  { href: "/terms", label: "Terms and Conditions" },
];

const contactLinks = [
  {
    href: "mailto:b22ai066@iitj.ac.in",
    label: "dev@vartalaap.ai",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    href: "tel:+91 8830513212",
    label: "+91 8830513212",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    href: "https://maps.app.goo.gl/nxyLDJjY5BXymPvA6",
    label: "IIT Jodhpur",
    icon: <MapPin className="h-5 w-5" />,
  },
  // {
  //   href: "https://www.linkedin.com/company/vanii-ai",
  //   label: "LinkedIn",
  //   icon: <Linkedin className="h-5 w-5" />,
  // },
];

export default function Footer() {
  return (
    <footer className="bg-primary-50 w-full max-w-screen-2xl mx-auto">
      <div className="mx-auto py-14 px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Navigation Links */}
        <nav className="order-2 md:order-1">
          <ul className="space-y-1 flex flex-col items-center md:items-start">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Button
                  variant="ghost"
                  className="w-fit hover:text-primary-700 transition-colors"
                  asChild
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo and Tagline */}
        <div className="order-1 md:order-2 flex items-center justify-center max-md:flex-col gap-4 text-center">
          <div className="flex-shrink-0">
            <Image
              src="/images/icons/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="w-auto h-10 object-contain"
            />
          </div>
          <p className="whitespace-nowrap font-medium">
            Achieve Fluency
            <br /> with Vartalaap Today!
          </p>
        </div>

        {/* Contact Section */}
        <div className="order-3 flex max-md:flex-col items-center md:items-end justify-center gap-3">
          <h3 className="text-lg md:text-xl font-medium text-primary-700">
            We&apos;d Like &<br className=" md:inline" /> Love to Help
          </h3>
          <div className="flex flex-col max-md:flex-row flex-wrap items-start md:items-end">
            {contactLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:text-primary-700"
                asChild
              >
                <Link href={link.href}>
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
