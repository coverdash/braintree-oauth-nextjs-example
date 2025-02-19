// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import { ConnectButton } from "@/components/ConnectButton";
import { CustomerForm } from "@/components/CustomerForm";
import { NonceTrigger } from "@/components/NonceTrigger";
import { PaymentForm } from "@/components/PaymentForm";
import { SubscriptionForm } from "@/components/SubscriptionForm";
// import { NonceTrigger } from "@/components/NonceTrigger";
// import { OAuthCallback } from "@/components/OAuthCallback";
import { useStorage } from "@/lib/storage";
// import { SubscriptionForm } from "@/components/SubscriptionForm";
import { useState } from "react";
// import { PaymentForm } from "@/components/PaymentForm";
// import { CustomerForm } from "@/components/CustomerForm";

export default function Home() {
  const {
    access_token,
    // refresh_token,
    // merchant_id,
    // scope,
    // expires_at,
    // payment_nonce,
    clearTokens,
  } = useStorage();
  const isConnected = !!access_token;
  const [view, setView] = useState("create-transaction");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Braintree OAuth Integration
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md min-h-96">
          {!isConnected ? (
            <>
              <h2 className="text-xl mb-4">Connect Your Braintree Account</h2>
              <p className="text-gray-600 mb-6">
                Click below to connect your Braintree account and enable payment
                processing.
              </p>
              <ConnectButton />
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Your account is connected. You can now process payments.
              </p>
              <div className="text-sm mb-6 flex gap-4">
                <button
                  className={`${
                    view === "create-transaction"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } px-4 py-2 rounded-md`}
                  onClick={() => setView("create-transaction")}
                >
                  Create Transaction
                </button>
                <button
                  className={`${
                    view === "create-customer"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } px-4 py-2 rounded-md`}
                  onClick={() => setView("create-customer")}
                >
                  Create Customer
                </button>
                <button
                  className={`${
                    view === "create-nonce"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } px-4 py-2 rounded-md`}
                  onClick={() => setView("create-nonce")}
                >
                  Create Nonce
                </button>
                <button
                  className={`${
                    view === "create-subscription"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } px-4 py-2 rounded-md`}
                  onClick={() => setView("create-subscription")}
                >
                  Create Subscription
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    clearTokens();
                    window.location.reload();
                  }}
                >
                  Clear Tokens
                </button>
              </div>

              {view === "create-transaction" && <PaymentForm />}
              {view === "create-nonce" && <NonceTrigger />}
              {view === "create-subscription" && <SubscriptionForm />}
              {view === "create-customer" && <CustomerForm />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
