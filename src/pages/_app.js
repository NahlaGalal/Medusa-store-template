// @ts-check
import { CartProvider, MedusaProvider } from "medusa-react"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import { ErrorBoundary } from "react-error-boundary"
import Script from "next/script"
import { QueryClient } from "react-query"
import { PublicProvider } from "../context/publicContext"
import Layout from "../components/Layout"
import "../style/globals.css"
import "../components/Search/style.css"
import ErrorFallback from "../components/ErrorFallback"

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

// Your react-query's query client config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
      retry: 1,
    },
  },
})

const App = ({ Component, pageProps }) => {
  const { locale } = useRouter()
  const [explodeErr, setExplodeErr] = useState(false)

  const dir = locale === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <MedusaProvider
      baseUrl={BACKEND_URL}
      queryClientProviderProps={{ client: queryClient }}
    >
      <CartProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          ></meta>
          {/* Global Site Code Pixel - Facebook Pixel */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,700&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
          fbq('track', 'PageView');
          `,
          }}
        ></Script>
        <PublicProvider Router={Router}>
          <Layout>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              resetKeys={[explodeErr]}
              onReset={() => setExplodeErr(explodeErr)}
            >
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </PublicProvider>
      </CartProvider>
    </MedusaProvider>
  )
}

export default App
