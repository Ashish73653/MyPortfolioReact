// Simple Google Analytics utility for tracking custom events
// This file provides a clean interface for analytics in your React components

interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

/**
 * Track a custom event in Google Analytics
 * @param event - The event object with action, category, label, and value
 */
export const trackEvent = (event: AnalyticsEvent) => {
  // Only track in production and if gtag is available
  if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
    window.gtag('event', event.action, {
      event_category: event.category || 'general',
      event_label: event.label,
      value: event.value,
    });
  }
};

/**
 * Track page views (useful for SPA navigation)
 * @param path - The page path to track
 * @param title - The page title
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track when users download your resume
 */
export const trackResumeDownload = () => {
  trackEvent({
    action: 'download',
    category: 'resume',
    label: 'pdf_download',
  });
};

/**
 * Track when users visit external links (GitHub, LinkedIn, etc.)
 */
export const trackExternalLink = (url: string, source: string) => {
  trackEvent({
    action: 'click',
    category: 'external_link',
    label: `${source}_to_${url}`,
  });
};

/**
 * Track contact form submissions
 */
export const trackContactFormSubmission = (method: string) => {
  trackEvent({
    action: 'submit',
    category: 'contact_form',
    label: method, // 'email', 'contact_form', etc.
  });
};

/**
 * Track admin actions (for your own analytics)
 */
export const trackAdminAction = (action: string, item_type: string) => {
  trackEvent({
    action,
    category: 'admin',
    label: `${action}_${item_type}`, // 'add_project', 'edit_skill', etc.
  });
};

/**
 * Track project interactions
 */
export const trackProjectInteraction = (action: string, project_name: string) => {
  trackEvent({
    action,
    category: 'project',
    label: project_name,
  });
};

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default {
  trackEvent,
  trackPageView,
  trackResumeDownload,
  trackExternalLink,
  trackContactFormSubmission,
  trackAdminAction,
  trackProjectInteraction,
};
