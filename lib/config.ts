export const BRAINTREE_CONFIG = {
  merchantId: process.env.NEXT_PUBLIC_BRAINTREE_MERCHANT_ID,
  clientId: `client_id$sandbox$${process.env.NEXT_PUBLIC_BRAINTREE_OAUTH_CLIENT_ID}`,
  redirectUri: process.env.NEXT_PUBLIC_BRAINTREE_REDIRECT_URI,
  environment: process.env.NEXT_PUBLIC_BRAINTREE_ENVIRONMENT,
};
