/**
 * ⚙️ Central site configuration — edit these values to update the whole site.
 */

/**
 * WhatsApp chat link — where orders and contact go.
 * Username format: "https://wa.me/@cvlab.official"
 * Phone format:    "https://wa.me/8801712345678" (digits only, with country code)
 */
export const WHATSAPP_LINK = "https://wa.me/@cvlab.official";

/** Build a WhatsApp chat link with a pre-filled message. */
export const waLink = (text: string) =>
  `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;

/** Format a Taka price: 699 → "৳699" */
export const bdt = (n: number) => `৳${n.toLocaleString("en-IN")}`;

/** Format a Dollar price: 6 → "$6" */
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
