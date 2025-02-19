const origin =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
    ? `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const BRAINTREE_CONFIG = {
  merchantId: process.env.NEXT_PUBLIC_BRAINTREE_MERCHANT_ID,
  clientId: `client_id$sandbox$${process.env.NEXT_PUBLIC_BRAINTREE_OAUTH_CLIENT_ID}`,
  redirectUri: `${origin}${process.env.NEXT_PUBLIC_BRAINTREE_REDIRECT_URI}`,
  environment: process.env.NEXT_PUBLIC_BRAINTREE_ENVIRONMENT,
};
