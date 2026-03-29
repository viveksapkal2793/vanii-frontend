"use client";

import axios, { AxiosInstance } from "axios";
import { createContext, ReactNode } from "react";

const normalizeBackendUrl = (rawUrl?: string) => {
  const fallback = "https://vanii-backend.onrender.com/auth";
  const value = (rawUrl || fallback).trim();
  const withoutTrailingSlash = value.replace(/\/+$/, "");

  // Backend routes are mounted under /auth in deployed environments.
  return withoutTrailingSlash.endsWith("/auth")
    ? withoutTrailingSlash
    : `${withoutTrailingSlash}/auth`;
};

const instance = axios.create({
  baseURL: normalizeBackendUrl(process.env.NEXT_PUBLIC_BACKEND_URL),
  withCredentials: true,
});

// Add request interceptor for debugging
instance.interceptors.request.use(
  (config) => {
    console.log('Making API request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      withCredentials: config.withCredentials,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
  (response) => {
    console.log('API response received:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API response error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

const AxiosContext = createContext<AxiosInstance>(instance);

const AxiosContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>
  );
};

export { AxiosContextProvider };
export default AxiosContext;
