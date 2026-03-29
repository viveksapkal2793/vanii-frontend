"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthContext from "@/hooks/custom/useAuthContext";
import useAxiosContext from "@/hooks/custom/useAxiosContext";
import { PostLogin } from "@/lib/apis/auth/Login";
import PhoneNumberInput from "../../components/forms/PhoneNumberInput";
import { countryCodesObject } from "../../components/forms/CountryCode";
import { GetCountry } from "@/lib/apis/util/GetCountry";

const formSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm: FC = () => {
  const router = useRouter();
  const auth = useAuthContext();
  const axios = useAxiosContext();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (auth?.config.loggedIn) {
        toast({
          title: "Already logged in",
          description: "You are already logged in. Navigating to Home Page",
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [auth, router, toast]);

  useEffect(() => {
    GetCountry({
      onSuccess: (response) => {
        setCountryCode(countryCodesObject[response.data.country].code);
      },
      onError: (error) => {
        console.log(error);
      }
    })
  }, [axios]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await PostLogin({
        axios,
        data: { ...values, phone: `${countryCode}${values.phone}` },
        onSuccess: (response) => {
          auth?.setConfig({
            loggedIn: true,
            id: response.data._id,
            email: response.data.email,
            voice: response.data.voice
          });
          toast({
            title: "Success",
            description: "Login Successful. Navigating to Home Page",
          });
          if ("dataLayer" in window) {
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            (window as any).dataLayer.push({
              user_id: response.data._id,
            });
          }
          setTimeout(() => {
            router.push("/");
          }, 1500);
        },
        onError: (error) => {
          console.log(error);
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message || "An error occurred",
          });
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl sm:text-2xl">
          Log in to your account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary text-sm"
                  onClick={() => router.push("/signup")}
                >
                  Create account
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-primary text-sm"
                  onClick={() => router.push("/forgotpassword")}
                >
                  Forgot password
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;