// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs")

module.exports = {
  i18n: {
    // providing the locales supported by your application
    locales: ["en-US", "ar"],
    //  default locale used when the non-locale paths are visited
    defaultLocale: "en-US",
  },
}

module.exports = withSentryConfig(
  module.exports,
  { dryRun: process.env.VERCEL_ENV !== "production" },
  { silent: true, authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN },
  { hideSourcemaps: true }
)
