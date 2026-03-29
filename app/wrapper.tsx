"use client";
import useAuthContext from "@/hooks/custom/useAuthContext";
import useAxiosContext from "@/hooks/custom/useAxiosContext";
import { GetUser } from "@/lib/apis/auth/GetUser";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface wrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<wrapperProps> = ({ children }) => {
  const axios = useAxiosContext();
  const auth = useAuthContext();
  const pathname = usePathname();
  const hasTriedGetUser = useRef(false);

  const publicRoutes = new Set([
    "/",
    "/login",
    "/signup",
    "/forgotpassword",
    "/pricing",
    "/terms",
    "/blogs",
  ]);

  const shouldSkipGetUser =
    publicRoutes.has(pathname) || pathname.startsWith("/auth/google/");

  useEffect(() => {
    if (auth.config.loggedIn || shouldSkipGetUser || hasTriedGetUser.current) {
      return;
    }

    hasTriedGetUser.current = true;

    GetUser({
      axios,
      onSuccess: (data) => {
        auth.setConfig({
          loggedIn: true,
          id: data.data.user._id,
          email: data.data.user.email,
          voice: data.data.user.voice,
        });
      },
      onError: () => {
        // Unauthenticated users are valid on public pages.
      },
    });
  }, [axios, auth.config.loggedIn, auth, shouldSkipGetUser]);

  return <>{children}</>;
};

export default Wrapper;
