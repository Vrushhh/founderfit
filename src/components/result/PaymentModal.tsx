'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Smartphone, CreditCard, QrCode, Loader2 } from 'lucide-react';
import { paymentService } from '@/lib/services/paymentService';
import { analyticsService } from '@/lib/services/analyticsService';

interface PaymentModalProps {
  blueprintId: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  blueprintId,
  onClose,
  onPaymentSuccess
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'qr'>('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    analyticsService.track('payment_started', { blueprintId, method });

    try {
      const order = await paymentService.createPayment({ blueprintId, amount: 299 });
      const verification = await paymentService.verifyPayment({
        orderId: order.orderId,
        paymentId: `pay_mock_${Date.now()}`
      });

      if (verification.success) {
        setPaymentSuccess(true);
        analyticsService.track('payment_completed', { orderId: order.orderId, amount: 299 });
        setTimeout(() => {
          onPaymentSuccess();
        }, 1200);
      }
    } catch (err) {
      console.error('Payment error', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl border border-[#252932] bg-[#121418] p-5 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute right-4 top-4 text-[#9BA1AD] hover:text-white transition-colors p-1"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-6 rounded bg-emerald-500 font-bold text-black text-xs flex items-center justify-center">
            FF
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-none">FOUNDERFIT Checkout</h3>
            <span className="text-[11px] text-[#9BA1AD]">Encrypted 256-Bit Payment</span>
          </div>
        </div>

        {/* Price Box */}
        <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3.5 mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9BA1AD] block">Item</span>
            <span className="text-sm font-semibold text-white">Full Business Blueprint</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#9BA1AD] block">Total Amount</span>
            <span className="text-lg font-extrabold text-emerald-400">₹299</span>
          </div>
        </div>

        {paymentSuccess ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 animate-scale" />
            </div>
            <h4 className="text-lg font-bold text-white">Payment Verified!</h4>
            <p className="text-xs text-[#9BA1AD]">Unlocking your personalized Business Blueprint...</p>
          </div>
        ) : (
          <>
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setMethod('upi')}
                className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-xs font-semibold transition-all ${
                  method === 'upi'
                    ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                    : 'border-[#252932] bg-[#16181E] text-[#9BA1AD]'
                }`}
              >
                <Smartphone className="h-4 w-4 mb-1" />
                <span>UPI Apps</span>
              </button>

              <button
                onClick={() => setMethod('qr')}
                className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-xs font-semibold transition-all ${
                  method === 'qr'
                    ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                    : 'border-[#252932] bg-[#16181E] text-[#9BA1AD]'
                }`}
              >
                <QrCode className="h-4 w-4 mb-1" />
                <span>QR Code</span>
              </button>

              <button
                onClick={() => setMethod('card')}
                className={`flex flex-col items-center justify-center rounded-xl p-2.5 border text-xs font-semibold transition-all ${
                  method === 'card'
                    ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                    : 'border-[#252932] bg-[#16181E] text-[#9BA1AD]'
                }`}
              >
                <CreditCard className="h-4 w-4 mb-1" />
                <span>Card / Net</span>
              </button>
            </div>

            {/* Method Details */}
            {method === 'upi' && (
              <div className="space-y-2.5 mb-5 text-xs">
                <label className="text-[#9BA1AD] block font-medium">Supported UPI Apps:</label>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] font-semibold text-white">
                  <div className="rounded-lg bg-[#16181E] border border-[#252932] p-2">Google Pay</div>
                  <div className="rounded-lg bg-[#16181E] border border-[#252932] p-2">PhonePe</div>
                  <div className="rounded-lg bg-[#16181E] border border-[#252932] p-2">Paytm</div>
                  <div className="rounded-lg bg-[#16181E] border border-[#252932] p-2">BHIM / CRED</div>
                </div>

                <div className="pt-2">
                  <label className="text-[#9BA1AD] block mb-1">Enter UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="w-full rounded-lg border border-[#252932] bg-[#16181E] px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {method === 'qr' && (
              <div className="text-center py-3 mb-4 space-y-2 text-xs">
                <div className="mx-auto w-32 h-32 rounded-lg bg-white p-2 flex items-center justify-center">
                  {/* Styled simulated QR */}
                  <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center font-mono text-[9px] text-black font-bold">
                    [ UPI QR ₹299 ]
                  </div>
                </div>
                <p className="text-[#9BA1AD] text-[11px]">Scan with any UPI app to pay</p>
              </div>
            )}

            {method === 'card' && (
              <div className="space-y-2 mb-4 text-xs">
                <input
                  type="text"
                  placeholder="Card Number (4111 2222 3333 4444)"
                  className="w-full rounded-lg border border-[#252932] bg-[#16181E] px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                  readOnly
                  value="•••• •••• •••• 4242"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="rounded-lg border border-[#252932] bg-[#16181E] px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    readOnly
                    value="12/28"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="rounded-lg border border-[#252932] bg-[#16181E] px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    readOnly
                    value="•••"
                  />
                </div>
              </div>
            )}

            {/* Simulated Payment Button */}
            <div className="space-y-2">
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-sm text-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all active:scale-[0.98] press-scale"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Authorizing ₹299...</span>
                  </>
                ) : (
                  <span>Pay ₹299 & Unlock Instantly</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#656C7A]">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>Sandbox / Mock Payment Active (Instant Unlock)</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
