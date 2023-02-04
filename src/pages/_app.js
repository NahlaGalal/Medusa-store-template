import { CartProvider, MedusaProvider } from "medusa-react"
import Head from "next/head"
import React from "react"
import Router from "next/router"
import { QueryClient } from "react-query"
import { ThemeProvider } from "theme-ui"
import { ProductProvider } from "../context/product-context"
import { PublicProvider } from "../context/publicContext"
import theme from "../theme"
import Layout from "../components/layout/layout"

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
  return (
    <ThemeProvider theme={theme}>
      <MedusaProvider
        baseUrl={BACKEND_URL}
        queryClientProviderProps={{ client: queryClient }}
      >
        <CartProvider>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,700&family=Roboto:wght@400;700&display=swap"
              rel="stylesheet"
            ></link>
          </Head>
          <ProductProvider>
            <PublicProvider Router={Router}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PublicProvider>
          </ProductProvider>
        </CartProvider>
      </MedusaProvider>
    </ThemeProvider>
  )
}

export default App
