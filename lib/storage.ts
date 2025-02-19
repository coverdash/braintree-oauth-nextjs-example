import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TokenState {
  access_token: string;
  refresh_token: string;
  merchant_id: string;
  scope: string;
  expires_at: string;
  payment_nonce: string;
  // Actions
  setTokens: (tokens: Omit<TokenState, "setTokens" | "clearTokens">) => void;
  clearTokens: () => void;
}

const isClient = typeof window !== "undefined";

const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      access_token: "",
      refresh_token: "",
      merchant_id: "",
      scope: "",
      expires_at: "",
      payment_nonce: "",

      setTokens: (tokens) => set(tokens),
      clearTokens: () =>
        set({
          access_token: "",
          refresh_token: "",
          merchant_id: "",
          scope: "",
          expires_at: "",
          payment_nonce: "",
        }),
    }),
    {
      name: "braintree-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (!isClient) return null;
          try {
            return localStorage.getItem(name);
          } catch (error) {
            console.error("Failed to read from localStorage:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          if (!isClient) return;
          try {
            localStorage.setItem(name, value);
          } catch (error) {
            console.error("Failed to write to localStorage:", error);
          }
        },
        removeItem: (name) => {
          if (!isClient) return;
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error("Failed to remove from localStorage:", error);
          }
        },
      })),
    }
  )
);

export const useStorage = () => {
  const store = useTokenStore();

  return {
    // Getters
    getAccessToken: () => store.access_token,
    getRefreshToken: () => store.refresh_token,
    getMerchantId: () => store.merchant_id,
    getScope: () => store.scope,
    getExpiresAt: () => store.expires_at,
    getPaymentNonce: () => store.payment_nonce,

    // Setters
    saveTokens: (tokens: {
      access_token: string;
      refresh_token: string;
      expires_at: string;
      scope: string;
      merchant_id: string;
      payment_nonce: string;
    }) => store.setTokens(tokens),

    // Raw values for direct access if needed
    ...store,
  };
};
