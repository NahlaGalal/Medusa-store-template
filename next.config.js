// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

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
  { silent: true },
  { hideSourcemaps: true },
);
