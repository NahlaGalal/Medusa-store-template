// @ts-check
import { CartProvider, MedusaProvider } from "medusa-react"
import Head from "next/head"
import React, { useEffect } from "react"
import Router, { useRouter } from "next/router"
import { QueryClient } from "react-query"
import { PublicProvider } from "../context/publicContext"
import Layout from "../components/Layout"
import "../style/globals.css"
import "../components/Search/style.css"

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
  const {locale} = useRouter();

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
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,700&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <PublicProvider Router={Router}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PublicProvider>
      </CartProvider>
    </MedusaProvider>
  )
}

export default App
