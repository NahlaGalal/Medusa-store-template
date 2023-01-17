import Head from "next/head"
import { useRouter } from "next/router"
import * as React from "react"
import Layout from "../components/layout/layout"
import { client } from "../utils/client"

const IndexPage = ({ product }) => {
  const router = useRouter()

  return (
    <main>
      <Head>
        <title>Princess Jwellery</title>
        <meta name="description" content="One-page checkout" />
      </Head>
      <Layout>
        
      </Layout>
    </main>
  )
}

export async function getStaticProps({ params }) {
  const response = await client.products.list({ limit: 1 })

  const [product, ...rest] = response.products

  return { props: { product } }
}

export default IndexPage
