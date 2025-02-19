import { exchangeToken } from "@/lib/braintree";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Authorization code is required" });
    }

    const accessTokensResponse = await exchangeToken(code);
    console.log("accessTokensResponse", accessTokensResponse);

    return res.json(accessTokensResponse);
  } catch (error) {
    console.error("Token exchange error:", error);
    return res.status(500).json({ error: "Failed to exchange token" });
  }
}
