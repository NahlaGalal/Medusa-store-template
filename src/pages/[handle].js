// @ts-check

import Head from "next/head"
import React from "react"
import Layout from "../components/layout/layout"
import Steps from "../components/steps"
import { client } from "../utils/client"

const ProductPage = ({ product, region }) => {
  const country = region.countries[0].iso_2

  return (
    <>
      <Layout>
        <Head>
          <title>Medusa Express - {product.title}</title>
          <meta name="description" content={product?.description || ""} />
        </Head>
        <Steps
          product={product}
          region={region}
          country={country}
        />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const { products } = await client.products.list()

  const paths = products
    .map(product => ({
      params: { handle: product.handle },
    }))
    .filter(p => !!p.params.handle)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const response = await client.products.list({ handle: params.handle })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Africa")

  // handles are unique, so we'll always only be fetching a single product
  const [product] = response.products

  // Pass post data to the page via props
  return { props: { product, region } }
}

export default ProductPage
