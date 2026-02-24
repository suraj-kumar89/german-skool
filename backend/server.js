// server.js
// Full backend from scratch: Express + HubSpot submit API (for your German lead form)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();

/* -------------------- Config -------------------- */
const PORT = process.env.PORT || 5000;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;

// If you know your frontend URL(s), lock CORS to them (recommended).
// Example: CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,http://localhost:5173
const CORS_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: CORS_ORIGINS.length ? CORS_ORIGINS : true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

/* -------------------- Startup check -------------------- */
console.log("ENV check:", {
  hubspot: Boolean(HUBSPOT_PORTAL_ID && HUBSPOT_FORM_ID),
  cors_locked: Boolean(CORS_ORIGINS.length),
  port: PORT,
});

function getCallingCode(countryCode = "") {
  const m = String(countryCode).match(/\+\d+/);
  return m?.[0] || "";
}

// HubSpot date fields typically want milliseconds since epoch
function safeDateMs(startDate) {
  if (!startDate) return "";
  const t = new Date(startDate).getTime();
  return Number.isNaN(t) ? "" : t;
}

/**
 * IMPORTANT:
 * The "name" values below MUST match the internal property names configured in your HubSpot form.
 * If your HubSpot form uses different internal names, update them in buildHubSpotPayload().
 */
function buildHubSpotPayload(body) {
  const b = body || {};
  const callingCode = getCallingCode(b.countryCode);
  const phone = b.phone ? `${callingCode}${b.phone}` : "";
  const startDateMs = safeDateMs(b.startDate);

  return {
    fields: [
      { name: "email", value: b.email || "" },

      // Send FULL NAME directly to firstname (as per HubSpot form)
      { name: "firstname", value: b.fullName || "" },

      { name: "phone", value: phone },

      { name: "goal", value: b.goal || "" },
      { name: "german_level", value: b.germanLevel || "" },
      { name: "start_date", value: startDateMs || "" },
      { name: "learning_needs", value: b.learningNeeds || "" },

      { name: "consent", value: b.consent ? "true" : "false" },
      { name: "expert_guidance", value: b.expertGuidance ? "true" : "false" },

      { name: "utm_source", value: b.utm_source || "" },
      { name: "utm_medium", value: b.utm_medium || "" },
      { name: "utm_campaign", value: b.utm_campaign || "" },
      { name: "utm_term", value: b.utm_term || "" },
      { name: "utm_content", value: b.utm_content || "" },

      { name: "referrer", value: b.referrer || "" },
      { name: "landing_page", value: b.landing_page || "" },
      { name: "user_agent", value: b.user_agent || "" },
    ],

    context: {
      hutk: b.hutk || undefined,
      pageUri: b.landing_page || b.pageUri || "",
      pageName: b.pageName || "",
    },

    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I agree to allow this website to store and process my personal data.",
      },
    },
  };
}
/* -------------------- Routes -------------------- */

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Backend running 🚀");
});

/**
 * POST /api/hubspot-submit-german
 * Frontend should send your LeadForm + hutk/pageName/pageUri optionally:
 * {
 *   fullName, countryCode, phone, email, goal, germanLevel, startDate,
 *   learningNeeds, consent, expertGuidance,
 *   utm_source, utm_medium, utm_campaign, utm_term, utm_content,
 *   referrer, landing_page, user_agent,
 *   hutk, pageName, pageUri
 * }
 */
app.post("/api/hubspot-submit-german", async (req, res) => {
  try {
    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
      return res.status(500).json({ error: "HUBSPOT_ENV_NOT_SET" });
    }

    const hubspotPayload = buildHubSpotPayload(req.body);

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hubspotPayload),
    });

    const raw = await r.text();
    let data = null;

    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = { raw };
    }

    if (!r.ok) {
      return res.status(500).json({
        error: "HUBSPOT_FAILED",
        status: r.status,
        details: data,
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR", details: String(err) });
  }
});

/* -------------------- Start -------------------- */
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});