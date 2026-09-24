import { createContext, useContext } from "react";

export type PlanId = "student" | "professional" | "ats" | "careerpro" | "international";

export type OrderCtx = {
  open: (plan?: PlanId) => void;
};

export const OrderContext = createContext<OrderCtx>({ open: () => {} });
export const useOrder = () => useContext(OrderContext);

export const PLANS: {
  id: PlanId;
  name: string;
  priceBDT: number; // price in Bangladeshi Taka
  priceUSD: number; // approximate price in US Dollars
  tagline: string;
  delivery: string;
  features: string[];
  popular?: boolean;
}[] = [
  {
    id: "student",
    name: "Student Resumes",
    priceBDT: 399,
    priceUSD: 3,
    tagline: "For students & fresh graduates",
    delivery: "4-day delivery",
    features: [
      "1-page professional resume",
      "Clean, recruiter-approved template",
      "Education, projects & societies highlighted",
      "1 round of revisions",
      "PDF + editable Word files",
    ],
  },
  {
    id: "professional",
    name: "Professional CVs",
    priceBDT: 699,
    priceUSD: 6,
    tagline: "For job seekers & working professionals",
    delivery: "3-day delivery",
    features: [
      "Professional CV rewrite (1–2 pages)",
      "Achievement-focused writing",
      "Keyword optimisation for recruiters",
      "2 rounds of revisions",
      "PDF + editable Word files",
    ],
  },
  {
    id: "ats",
    name: "ATS-Optimized Resumes",
    priceBDT: 999,
    priceUSD: 8,
    tagline: "Beat the robots, land the interview",
    delivery: "48-hour delivery",
    popular: true,
    features: [
      "Everything in Professional CVs",
      "Full ATS scan & optimisation report",
      "Industry keyword targeting",
      "Recruiter screening checklist",
      "Unlimited revisions for 14 days",
    ],
  },
  {
    id: "careerpro",
    name: "Career Pro Package",
    priceBDT: 1499,
    priceUSD: 12,
    tagline: "The complete career upgrade",
    delivery: "Priority 48-hour delivery",
    features: [
      "Everything in ATS-Optimized Resumes",
      "Tailored cover letter",
      "LinkedIn profile makeover",
      "1:1 kick-off call with your writer",
      "60-day Interview Guarantee",
    ],
  },
  {
    id: "international",
    name: "International Career Package",
    priceBDT: 1999,
    priceUSD: 16,
    tagline: "For jobs abroad & global remote roles",
    delivery: "Priority 24-hour delivery",
    features: [
      "Everything in Career Pro Package",
      "US, UK, EU & Middle-East formats",
      "Region-specific keyword strategy",
      "Native-level English polish",
      "Priority writer + 60-day Interview Guarantee",
    ],
  },
];

/** Optional add-on services — attachable to any package. */
export const ADDONS: { id: string; name: string }[] = [
  { id: "cover-letter", name: "Cover Letter Writing" },
  { id: "linkedin", name: "LinkedIn Profile Optimization" },
  { id: "bdjobs", name: "Bdjobs Profile Optimization" },
  { id: "indeed", name: "Indeed Profile Optimization" },
  { id: "tailoring", name: "Job-Specific Resume Tailoring" },
  { id: "europass", name: "Europass & Canadian CVs" },
  { id: "academic", name: "Academic & Executive Resumes" },
];
