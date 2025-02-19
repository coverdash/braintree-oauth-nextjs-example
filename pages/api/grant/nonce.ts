import { createNonce } from "@/lib/braintree";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { accessToken, paymentMethodToken } = req.body;

    const nonceResult = await createNonce(accessToken, paymentMethodToken);
    console.log("nonceResult", nonceResult);

    return res.json(nonceResult);
  } catch (error) {
    console.error("Nonce creation error:", error);
    return res.status(500).json({ error: "Failed to create nonce" });
  }
}
