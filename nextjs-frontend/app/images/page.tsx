"use client";
import { useUser } from "@clerk/nextjs";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";

interface Transaction {
  imageUrl?: string;
  prompt?: string;
  createdAt?: string;
}

export default function ImagesPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const email =
    isLoaded && isSignedIn ? user?.emailAddresses?.[0]?.emailAddress : "";

  const fetchTransactions = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/checkGenerations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchTransactions();
    }
  }, [email]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleImageClick = (imageUrl: string | undefined) => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />

      <div className="max-w-7xl w-full mx-auto px-4 py-10 flex flex-col items-center">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">
            Your Images
          </h1>
          <button
            onClick={fetchTransactions}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm sm:text-base"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {isLoading ? (
          <div className="w-full text-center text-gray-400 py-16 text-lg">
            Loading your images...
          </div>
        ) : transactions.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {transaction?.imageUrl && (
                  <div
                    className="h-48 bg-gray-700 flex items-center justify-center cursor-pointer"
                    onClick={() => handleImageClick(transaction.imageUrl)}
                  >
                    <img
                      src={transaction.imageUrl}
                      alt={transaction.prompt || "Generated image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col">
                  {/* line clamp reduces the lines length */}
                  <p className="font-medium text-white mb-3 text-center line-clamp-2">
                    {transaction?.prompt}
                  </p>
                  <p className="text-sm text-gray-400 text-center">
                    {transaction?.createdAt
                      ? formatDate(transaction.createdAt)
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-md bg-gray-800 rounded-lg p-10 text-center shadow-lg text-white text-lg">
            Sorry, No Image Available
          </div>
        )}
      </div>
    </div>
  );
}
