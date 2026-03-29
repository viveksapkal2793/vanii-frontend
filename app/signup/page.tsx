"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { PostRegister, RegisterRequestData } from "@/lib/apis/otp/SendOtp";

import useAxiosContext from "@/hooks/custom/useAxiosContext";
import { countryCodesObject } from "../components/forms/CountryCode";
import PhoneNumberInput from "../components/forms/PhoneNumberInput";
import PasswordVerify from "@/lib/form/PasswordVerify";
import { GetCountry } from "@/lib/apis/util/GetCountry";
import GoogleWrapper from "../components/Google/GoogleWrapper";
import GoogleLogin from "../components/Google/GoogleLogin";

const signupSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    verifyPassword: z.string(),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords don't match",
    path: ["verifyPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const axios = useAxiosContext();

  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      password: "",
      verifyPassword: "",
    },
  });

  useEffect(() => {
    GetCountry({
      onSuccess: (response) => {
        setCountryCode(countryCodesObject[response.data.country].code);
      },
      onError: (error) => {
        console.log(error);
        
      },
    });
  }, [axios]);

  const onSubmit = async (values: SignupFormData) => {
    try {
      setIsLoading(true);

      const registerData: RegisterRequestData = {
        fullname: values.fullname,
        password: values.password,
        phone: `${countryCode}${values.phone}`,
      };

      await PostRegister({
        axios,
        data: registerData,
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Signup successful. Please provide your preferences.",
          });
          router.push("/onboarding");
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="relative lg:w-2/5 w-full lg:h-screen h-48 sm:h-64">
        <Image
          src="/images/login/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-card">
        <Card className="w-full max-w-md shadow-none border-none">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl sm:text-2xl">
              Welcome to Vartalaap!
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Speak Fluently, Connect Instantly
            </CardDescription>
          </CardHeader>

          <CardContent>
            <GoogleWrapper>
              <div className="mb-6">
                <GoogleLogin />
              </div>
            </GoogleWrapper>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneNumberInput
                          countryCode={countryCode}
                          onCountryCodeChange={setCountryCode}
                          phoneNumber={field.value}
                          onPhoneNumberChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PasswordVerify
                  password={form.watch("password")}
                  verifyPassword={form.watch("verifyPassword")}
                  onPasswordChange={(val) => form.setValue("password", val)}
                  onVerifyPasswordChange={(val) =>
                    form.setValue("verifyPassword", val)
                  }
                  errorMessageDisplay={{
                    password: form.formState.errors.password?.message || null,
                    verifyPassword:
                      form.formState.errors.verifyPassword?.message || null,
                  }}
                />

                <div className="space-y-4 pt-4">
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign Up
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      className="p-0 text-sm"
                      onClick={() => router.push("/login")}
                      type="button"
                    >
                      Already have an account? Sign in
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
