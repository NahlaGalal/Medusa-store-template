const Medusa = require("@medusajs/medusa-js").default

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const client = new Medusa({
  baseUrl: BACKEND_URL,
  publishableApiKey: process.env.NEXT_PUBLIC_PUBLISHABLE_API_KEY || "",
})

module.exports.client = client
