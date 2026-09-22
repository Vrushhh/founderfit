import { createServerFn } from "@tanstack/react-start";
import Razorpay from "razorpay";
import crypto from "crypto";
import { z } from "zod";

function getRazorpay(): Razorpay {
  const key_id = process.env["RAZORPAY_KEY_ID"];
  const key_secret = process.env["RAZORPAY_KEY_SECRET"];
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials are not configured on the server.");
  }
  return new Razorpay({ key_id, key_secret });
}

// ── Create Order ─────────────────────────────────────────────────────────────

const CreateOrderInput = z.object({
  amount: z.number().int().min(100), // paise, minimum ₹1
  receipt: z.string().optional(),
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator(CreateOrderInput)
  .handler(async ({ data }) => {
    try {
      const rzp = getRazorpay();
      const order = await rzp.orders.create({
        amount: data.amount,
        currency: "INR",
        receipt: data.receipt ?? `rcpt_${Date.now()}`,
      });
      return {
        order_id: order.id,
        amount: order.amount as number,
        currency: order.currency,
        key_id: process.env["RAZORPAY_KEY_ID"] || "",
      };
    } catch (err: unknown) {
      console.error("Razorpay order creation error:", err);
      const rzpErr = err as {
        description?: string;
        message?: string;
        error?: { description?: string; code?: string };
      };
      const msg =
        rzpErr?.error?.description ||
        rzpErr?.description ||
        (err instanceof Error ? err.message : "Razorpay order creation failed");
      throw new Error(msg);
    }
  });

// ── Verify Payment ────────────────────────────────────────────────────────────

const VerifyInput = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator(VerifyInput)
  .handler(async ({ data }) => {
    const secret = process.env["RAZORPAY_KEY_SECRET"]!;
    const body = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;
    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

    if (expected !== data.razorpay_signature) {
      throw new Error("Payment signature mismatch — possible tampering detected.");
    }

    return { success: true, payment_id: data.razorpay_payment_id };
  });
