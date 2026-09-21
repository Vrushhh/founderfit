export type TrackingEvent =
  | 'landing_view'
  | 'assessment_started'
  | 'question_answered'
  | 'assessment_completed'
  | 'payment_started'
  | 'payment_completed'
  | 'result_viewed'
  | 'share_clicked';

export interface EventProperties {
  [key: string]: string | number | boolean | undefined | null;
}

class AnalyticsService {
  private isMetaPixelActive: boolean = false;
  private isGAActive: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMetaPixelActive = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
      this.isGAActive = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
  }

  public track(event: TrackingEvent, properties?: EventProperties): void {
    const timestamp = new Date().toISOString();

    // Log cleanly to console in dev mode
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[NextMove Analytics] 📊 ${event}`, properties || {});
    }

    if (typeof window === 'undefined') return;

    // Meta Pixel integration hook
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.fbq) {
        if (event === 'payment_completed') {
          w.fbq('track', 'Purchase', { value: 299, currency: 'INR', ...properties });
        } else if (event === 'payment_started') {
          w.fbq('track', 'InitiateCheckout', properties);
        } else if (event === 'assessment_completed') {
          w.fbq('track', 'CompleteRegistration', properties);
        } else {
          w.fbq('trackCustom', event, properties);
        }
      }
    } catch {
      // ignore tracker failures
    }

    // Google Analytics integration hook
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (w.gtag) {
        w.gtag('event', event, {
          event_category: 'NextMove Assessment',
          event_label: properties?.label || event,
          ...properties
        });
      }
    } catch {
      // ignore
    }

    // Local storage event audit trail for dev inspectability
    try {
      const history = JSON.parse(sessionStorage.getItem('nm_event_history') || '[]');
      history.push({ event, properties, timestamp });
      sessionStorage.setItem('nm_event_history', JSON.stringify(history.slice(-30)));
    } catch {
      // ignore
    }
  }
}

export const analyticsService = new AnalyticsService();
