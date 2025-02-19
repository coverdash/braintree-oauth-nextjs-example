import type { NextApiRequest, NextApiResponse } from "next";
import { createSubscription } from "@/lib/subscriptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { paymentMethodNonce, planId, price, downPayment } = req.body;

    const subscriptionResult = await createSubscription(
      paymentMethodNonce,
      planId,
      downPayment,
      price
    );

    return res.json(subscriptionResult);
  } catch (error) {
    console.error("Subscription creation error:", error);
    return res.status(500).json({ error: "Failed to create subscription" });
  }
}
