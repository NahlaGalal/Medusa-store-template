// @ts-check
import Document, { Head, Html, Main, NextScript } from "next/document"
import React from "react"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    // locale is in ctx.locale

    return { ...initialProps, locale: ctx?.locale || "en-US" }
  }

  render() {
    return (
      <Html
        dir={this.props.locale === "ar" ? "rtl" : "ltr"}
        lang={this.props.locale}
      >
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,700&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
          {/* Meta Pixel Code */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
          {/* End Meta Pixel Code */}
        </Head>
        <body>
          {}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
