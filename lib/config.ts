const origin =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
    ? `http://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;

export const BRAINTREE_CONFIG = {
  merchantId: process.env.NEXT_PUBLIC_BRAINTREE_MERCHANT_ID,
  clientId: `client_id$${process.env.NEXT_PUBLIC_BRAINTREE_ENVIRONMENT}$${process.env.NEXT_PUBLIC_BRAINTREE_OAUTH_CLIENT_ID}`,
  redirectUri: `${origin}${process.env.NEXT_PUBLIC_BRAINTREE_REDIRECT_URI}`,
  environment: process.env.NEXT_PUBLIC_BRAINTREE_ENVIRONMENT,
};
