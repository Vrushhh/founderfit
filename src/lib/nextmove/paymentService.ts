import { createRazorpayOrder, verifyRazorpayPayment } from "./razorpayServer";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: "INR";
  status: PaymentStatus;
}

export const PRICE_INR = 299;
const PRICE_PAISE = PRICE_INR * 100;
const KEY = "founderfit.payment";
const KEY_ID = import.meta.env["VITE_RAZORPAY_KEY_ID"] as string | undefined;

// Razorpay checkout.js is loaded lazily so it only loads when needed
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("Not in browser"));
    if (document.getElementById("rzp-checkout-js")) return resolve();
    const script = document.createElement("script");
    script.id = "rzp-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout.js"));
    document.body.appendChild(script);
  });
}

function readIntent(): PaymentIntent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PaymentIntent) : null;
  } catch {
    return null;
  }
}

function writeIntent(intent: PaymentIntent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(intent));
}

/**
 * Opens the Razorpay Standard Checkout modal.
 * Resolves with the three Razorpay response fields on success.
 * Rejects if the user dismisses or payment fails.
 */
function openRazorpayCheckout(params: {
  orderId: string;
  amount: number;
  name?: string;
  description?: string;
}): Promise<{ razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Razorpay = (window as any).Razorpay;
    if (!Razorpay) return reject(new Error("Razorpay not loaded"));

    const options = {
      key: KEY_ID,
      amount: params.amount,
      currency: "INR",
      name: params.name ?? "FounderFit",
      description: params.description ?? "Business Blueprint — ₹299",
      order_id: params.orderId,
      theme: { color: "#10b981" },
      handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled by user")),
      },
    };

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", (res: { error: { description: string } }) => {
      reject(new Error(res.error?.description ?? "Payment failed"));
    });
    rzp.open();
  });
}

export const paymentService = {
  getPaymentStatus(): PaymentStatus {
    return readIntent()?.status ?? "unpaid";
  },

  /**
   * Full Razorpay checkout flow:
   * 1. Create server-side order
   * 2. Open Razorpay modal
   * 3. Verify signature server-side
   * 4. Persist paid status locally
   */
  async checkout(): Promise<PaymentIntent> {
    // Load Razorpay script
    await loadRazorpayScript();

    // Step 1 — Create order via server function
    const order = await createRazorpayOrder({ data: { amount: PRICE_PAISE } });

    // Step 2 — Open modal
    const response = await openRazorpayCheckout({
      orderId: order.order_id,
      amount: order.amount,
    });

    // Step 3 — Verify signature server-side
    await verifyRazorpayPayment({ data: response });

    // Step 4 — Mark paid
    const intent: PaymentIntent = {
      id: response.razorpay_payment_id,
      amount: PRICE_INR,
      currency: "INR",
      status: "paid",
    };
    writeIntent(intent);
    return intent;
  },

  reset() {
    if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
  },
};
