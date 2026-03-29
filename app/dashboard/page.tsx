"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, User, Mail, Phone } from "lucide-react";
import useAuthContext from "@/hooks/custom/useAuthContext";

const Dashboard = () => {
  const router = useRouter();
  const auth = useAuthContext();

  useEffect(() => {
    // If not logged in, redirect to login
    if (!auth?.config.loggedIn) {
      router.push("/login");
    }
  }, [auth, router]);

  if (!auth?.config.loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Welcome to Vartalaap!
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            You have successfully logged in with Google Auth
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">
                  Email: {auth.config.email || "Not provided"}
                </span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">
                  User ID: {auth.config.id || "Not provided"}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">
                  Voice: {auth.config.voice || "Not set"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => router.push("/learn")} 
                className="w-full"
              >
                Start Learning
              </Button>
              <Button 
                onClick={() => router.push("/sessions")} 
                variant="outline" 
                className="w-full"
              >
                View Sessions
              </Button>
              <Button 
                onClick={() => router.push("/pricing")} 
                variant="outline" 
                className="w-full"
              >
                View Pricing
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">
                🎉 Google Authentication Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Your Google account has been successfully linked to Vartalaap. 
                You can now enjoy all the features of our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => router.push("/")}>
                  Go to Home
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    auth?.setConfig({
                      loggedIn: false,
                      id: "",
                      email: "",
                      voice: ""
                    });
                    router.push("/login");
                  }}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
