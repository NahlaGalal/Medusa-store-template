// @ts-check
import React from "react"
import Layout from "../components/layout/layout"
import Product from "../components/ProductCard"
import { client } from "../utils/client"

const Shop = ({ products, region, regions }) => {
  return (
    <Layout>
      {products.map(product => (
        <Product
          key={product.id}
          country={region.countries[0]}
          product={product}
          region={region}
        />
      ))}
      {console.log(products)}
    </Layout>
  )
}

export async function getStaticProps() {
  const { products } = await client.products.list()
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Africa")

  return { props: { products, region } }
}

export default Shop
