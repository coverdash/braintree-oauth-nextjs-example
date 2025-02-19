import { createCustomer } from "@/lib/customers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { firstName, lastName, email, phone } = req.body;

    const customerResult = await createCustomer(
      firstName,
      lastName,
      email,
      phone
    );
    console.log("customerResult", customerResult);

    return res.json(customerResult);
  } catch (error) {
    console.error("Customer creation error:", error);
    return res.status(500).json({ error: "Failed to create customer" });
  }
}
