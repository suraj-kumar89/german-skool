import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- content ---------- */
export const COLORS = {
  primary: "#826BFB",
  ctaBg: "#A894FF",
  ctaText: "#E4F1FE",
  body: "#6B6A70",
  bannerText: "#FFFFFF",
};

export const content = {
  badge: "A1 Beginner Course Starts Soon",
  title: "German Language Courses",
  subtitle: "From Beginner to Advanced (A1–C2)",
  description:
    "Live online classes with certified German tutors. Flexible schedules, personalized learning, and a trial class to help you start with confidence.",
  ctas: {
    book: "Book Trial Class",
    explore: "Explore Courses",
    submit: "Get Started for Trail →",
  },
  bulletsLeft: [
    "Super Intensive Fast Track Course",
    "Easy Payment Method",
    "100% LIVE + Recorded Sessions",
  ],
  bulletsRight: [
    "Regular Batches Available",
    "24x7 Support",
  ],
  socialProof: "Trusted by over 1000+ learners worldwide.",
  formTitle: "Get Personalized Guidance",
};

export const tefGoalOptions = [
  "Germany PR",
  "Job Seeker Visa",
  "Study in Germany",
  "Work Abroad",
];

export const germanLevelOptions = [
  "Beginner (A1)",
  "Beginner (A2)",
  "Intermediate (B1)",
  "Upper Intermediate (B2)",
  "Advanced (C1/C2)",
  "Not Sure",
];

/* ---------- form type ---------- */

export type LeadForm = {
  fullName: string;
  countryCode: string;
  phone: string;
  email: string;
  goal: string;
  germanLevel: string;
  startDate: string;
  learningNeeds: string;
  consent: boolean;
  expertGuidance: boolean;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  referrer?: string;
  landing_page?: string;
  user_agent?: string;
};

/* ---------- initial ---------- */

const initial: LeadForm = {
  fullName: "",
  countryCode: "India (+91)",
  phone: "",
  email: "",
  goal: "",
  germanLevel: "",
  startDate: "",
  learningNeeds: "",
  consent: false,
  expertGuidance: false,

  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",

  referrer: "",
  landing_page: "",
  user_agent: "",
};

export default function useGerman() {
  const [form, setForm] = useState<LeadForm>(initial);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ---------- capture UTM ---------- */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setForm((prev) => ({
      ...prev,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      referrer: document.referrer,
      landing_page: window.location.href,
      user_agent: navigator.userAgent,
    }));
  }, []);

  /* ---------- set field ---------- */

  const setField = useCallback((k: keyof LeadForm, v: any) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  }, []);

  /* ---------- submit (No Database) ---------- */

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      // 🔹 Instead of database, just log data
      console.log("Form Submitted:", form);

      // Optional: Save to localStorage
      localStorage.setItem("german_lead", JSON.stringify(form));

      // Redirect
      navigate("/thank_you", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Failed to submit form");
    } finally {
      setLoading(false);
    }
  }, [form, navigate]);

  return {
    COLORS,
    content,
    form,
    setField,
    handleSubmit,
    loading,
    tefGoalOptions,
    germanLevelOptions,
  };
}