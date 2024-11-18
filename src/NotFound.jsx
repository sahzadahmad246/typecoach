import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
        <p className="text-lg text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Button onClick={() => navigate("/")}>Go back to Homepage</Button>
      </div>
    </div>
  );
};
