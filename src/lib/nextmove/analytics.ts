export type FounderFitEvent =
  | "landing_view"
  | "assessment_started"
  | "question_answered"
  | "assessment_completed"
  | "payment_started"
  | "payment_completed"
  | "result_viewed"
  | "share_clicked";

type Props = Record<string, string | number | boolean | undefined>;

const metaPixelId = import.meta.env["VITE_META_PIXEL_ID"] as string | undefined;
const gaId = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Provider-agnostic analytics. Meta Pixel / GA are only used when their
 * IDs are supplied through environment variables.
 */
export const analytics = {
  track(event: FounderFitEvent, props: Props = {}) {
    if (typeof window === "undefined") return;

    if (window.fbq) {
      window.fbq("trackCustom", event, props);

      // Standard Meta Pixel conversion events for ad campaign optimization
      if (event === "landing_view") {
        window.fbq("track", "PageView");
      } else if (event === "result_viewed") {
        window.fbq("track", "ViewContent", { content_name: "FounderFit Blueprint" });
      } else if (event === "payment_started") {
        window.fbq("track", "InitiateCheckout", { value: 299, currency: "INR" });
      } else if (event === "payment_completed") {
        window.fbq("track", "Purchase", { value: 299, currency: "INR" });
      }
    }

    if (gaId && window.gtag) window.gtag("event", event, props);
    if (import.meta.env.DEV) console.debug("[nextmove:event]", event, props);
  },
};
