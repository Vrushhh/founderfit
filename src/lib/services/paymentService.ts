import { PaymentOrder } from '../types';

export interface CreatePaymentParams {
  blueprintId?: string;
  amount?: number; // In INR, default 299
  customerName?: string;
  customerPhone?: string;
}

export interface PaymentVerificationParams {
  orderId: string;
  paymentId: string;
  signature?: string;
}

export interface PaymentServiceResponse {
  success: boolean;
  order?: PaymentOrder;
  message?: string;
}

class PaymentService {
  private mode: 'mock' | 'razorpay' | 'cashfree';

  constructor() {
    this.mode = (process.env.NEXT_PUBLIC_PAYMENT_MODE as 'mock' | 'razorpay' | 'cashfree') || 'mock';
  }

  public getMode(): string {
    return this.mode;
  }

  public async createPayment(params: CreatePaymentParams = {}): Promise<PaymentOrder> {
    const amount = params.amount || 299;
    const orderId = `nm_ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (this.mode === 'mock') {
      // Return simulated order object
      const order: PaymentOrder = {
        orderId,
        amount,
        currency: 'INR',
        status: 'created',
        blueprintId: params.blueprintId
      };
      return order;
    }

    // Extensible for Razorpay / Cashfree API calls in production
    // Example: const res = await fetch('/api/payment/create-order', { ... })
    return {
      orderId,
      amount,
      currency: 'INR',
      status: 'created',
      blueprintId: params.blueprintId
    };
  }

  public async verifyPayment(params: PaymentVerificationParams): Promise<PaymentServiceResponse> {
    if (this.mode === 'mock') {
      // Simulate successful verification
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        order: {
          orderId: params.orderId,
          amount: 299,
          currency: 'INR',
          status: 'paid'
        },
        message: 'Mock payment verified successfully'
      };
    }

    // In production, call backend /api/payment/verify
    return {
      success: true,
      order: {
        orderId: params.orderId,
        amount: 299,
        currency: 'INR',
        status: 'paid'
      }
    };
  }

  public async getPaymentStatus(orderId: string): Promise<'created' | 'paid' | 'failed'> {
    // Check localStorage in client or API
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`nextmove_paid_${orderId}`);
      if (stored) return 'paid';
    }
    return 'created';
  }
}

export const paymentService = new PaymentService();
