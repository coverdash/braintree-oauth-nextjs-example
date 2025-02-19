import { BraintreeGateway } from "braintree";
import type { TransactionResult } from "./types";

export async function createTransaction(
  accessToken: string,
  amount: string,
  paymentMethodToken: string
): Promise<TransactionResult> {
  if (!accessToken) {
    return {
      success: false,
      error: "No access token found. Please connect to Braintree first.",
    };
  }

  try {
    const gateway = new BraintreeGateway({
      accessToken,
    });

    const result = await gateway.transaction.sale({
      amount,
      sharedPaymentMethodToken: paymentMethodToken,
    });

    return result;
  } catch (error) {
    console.error("Transaction error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process transaction",
    };
  }
}
