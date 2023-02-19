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
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,700&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
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
