import { createTransaction } from "@/lib/transactions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { accessToken, amount, paymentMethodToken } = req.body;

    const transactionsResponse = await createTransaction(
      accessToken,
      amount,
      paymentMethodToken
    );
    console.log("transactionsResponse", transactionsResponse);

    return res.json(transactionsResponse);
  } catch (error) {
    console.error("Transaction creation error:", error);
    return res.status(500).json({ error: "Failed to create transaction" });
  }
}
