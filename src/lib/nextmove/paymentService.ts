export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: "INR";
  status: PaymentStatus;
}

const MODE = (import.meta.env["VITE_PAYMENT_MODE"] as string | undefined) ?? "mock";
const KEY = "nextmove.payment";
export const PRICE_INR = 299;

function read(): PaymentIntent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PaymentIntent) : null;
  } catch {
    return null;
  }
}

function write(intent: PaymentIntent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(intent));
}

/**
 * Single abstraction over the payment provider. Razorpay (or any other
 * Indian gateway) can be added inside these three methods later without
 * touching any UI code.
 */
export const paymentService = {
  mode: MODE,

  async createPayment(amount = PRICE_INR): Promise<PaymentIntent> {
    const intent: PaymentIntent = {
      id: `nm_${Date.now().toString(36)}`,
      amount,
      currency: "INR",
      status: "pending",
    };
    write(intent);
    return intent;
  },

  async verifyPayment(id: string): Promise<PaymentIntent> {
    if (MODE === "mock") {
      await new Promise((r) => setTimeout(r, 1400));
      const intent: PaymentIntent = { id, amount: PRICE_INR, currency: "INR", status: "paid" };
      write(intent);
      return intent;
    }
    // Real provider verification goes here.
    const existing = read();
    return existing ?? { id, amount: PRICE_INR, currency: "INR", status: "failed" };
  },

  getPaymentStatus(): PaymentStatus {
    return read()?.status ?? "unpaid";
  },

  reset() {
    if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
  },
};
