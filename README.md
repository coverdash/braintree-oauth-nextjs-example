- Create Subscriptions

The integration uses the following Braintree APIs:

- [Access Token API](https://developer.paypal.com/braintree/docs/guides/extend/oauth/access-tokens/node#creating-an-access-token) - For OAuth authentication
- [Grant API](https://developer.paypal.com/braintree/docs/reference/xml-api/grant-api/overview/node) - For creating Payment Method Nonces
- [Customer API](https://developer.paypal.com/braintree/docs/reference/request/customer/create/node) - For creating Customers
- [Payment Method API](https://developer.paypal.com/braintree/docs/reference/request/payment-method/create/node) - For creating Payment Methods
- [Transaction API](https://developer.paypal.com/braintree/docs/guides/extend/oauth/shared-vault/node) - For creating Shared Vault Transactions
- [Subscription API](https://developer.paypal.com/braintree/docs/reference/request/subscription/create/node) - For creating Subscriptions

## Features

- OAuth connection flow
- Token management and storage
- Shared vault transaction processing
- Real-time transaction status updates
- Error handling and user feedback

## Prerequisites

Before running this application, you'll need:

- Node.js (v16 or higher)
- Yarn package manager
- Braintree sandbox account
- Environment variables (see `.env.example`)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn
```

## Terms

- **_Merchant A_**: The merchant that is initiating the connection (i.e. the merchant sharing customers from their Braintree vault).
- **_Merchant B_**: The merchant that is being connected to (i.e. the merchant receiving customers from Merchant A's Braintree vault).

## Configuration

Create a `.env` file in the root directory with the following variables:

**Note**: Remove prefix `client_id$sandbox$` and `client_secret$sandbox$` from the credentials provided by Braintree before adding them as environment variable values in the `.env` file. This prefix is hard-coded within the code to avoid issues with special characters. For example, `client_id$sandbox$1234567890` should be `1234567890`.

```env
# Client Environment Variables (Merchant A)
NEXT_PUBLIC_BRAINTREE_ENVIRONMENT=sandbox
NEXT_PUBLIC_BRAINTREE_MERCHANT_ID=MERCHANT_A_MERCHANT_ID
NEXT_PUBLIC_BRAINTREE_OAUTH_CLIENT_ID=MERCHANT_A_OAUTH_CLIENT_ID
NEXT_PUBLIC_BRAINTREE_REDIRECT_URI=http://localhost:3000/oauth-callback

BRAINTREE_ENVIRONMENT=sandbox

# Server Environment Variables (Merchant A)
BRAINTREE_OAUTH_CLIENT_ID=MERCHANT_A_OAUTH_CLIENT_ID
BRAINTREE_OAUTH_CLIENT_SECRET=MERCHANT_A_OAUTH_CLIENT_SECRET

# Server Environment Variables (Merchant B)
BRAINTREE_MERCHANT_ID=MERCHANT_B_MERCHANT_ID
BRAINTREE_PUBLIC_KEY=MERCHANT_B_PUBLIC_KEY
BRAINTREE_PRIVATE_KEY=MERCHANT_B_PRIVATE_KEY
```

> ⚠️ **IMPORTANT**: The value that you use for `NEXT_PUBLIC_BRAINTREE_REDIRECT_URI` must match a value from the list of `Redirect URIs` in the Braintree OAuth app and should be a valid URL linking to this application.

## Running the Application

```bash
yarn dev
```

The application will be available at:

- Frontend: http://localhost:3000

## How It Works

1. Merchant B accesses the application and initiates the OAuth connection
2. They are redirected to Braintree's OAuth consent page
3. Upon authorization, Braintree redirects back with an authorization code
4. The application exchanges this code for access/refresh tokens
5. Merchant A can now process transactions on Merchant B's behalf

## API Endpoints

- `POST /api/oauth/token` - Exchange authorization code for tokens
- `POST /api/transactions` - Create a shared vault transaction
- `POST /api/grant/nonce` - Create a payment method nonce
- `POST /api/subscriptions` - Create a subscription

## Security Considerations

- All sensitive credentials are stored in environment variables
- OAuth tokens are securely managed
- CORS is properly configured
- Input validation is implemented

> ⚠️ **WARNING**: This project is a demonstration and should not be used in production as-is. Ensure that all sensitive information, such as OAuth tokens and API keys, are stored securely and not in local storage. Follow best practices for security and data protection.

## Token Storage

For demonstration purposes, the returned access token and refresh token are stored in local storage to demo the create transaction API. However, this would not happen in the real use case of this project. In reality, once Merchant B completes the OAuth approval process, Merchant A's environment of this app should store the access token and refresh token securely so that they can use it to perform actions on Merchant B's behalf as mentioned above. It is highly recommended to store these tokens securely in secure HTTP-only cookies or a secure storage service to prevent potential security vulnerabilities.
