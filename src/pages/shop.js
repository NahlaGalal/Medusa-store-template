// @ts-check
import React from "react"
import { Container, Grid } from "theme-ui"
import { client } from "../utils/client"
import Product from "../components/ProductCard"

const Shop = ({ products, region }) => {
  return (
    <Container variant="layout.container">
      <Grid columns={[1, 2, 3]} gap={24} my={4}>
        {products.map(product => (
          <Product product={product} region={region} key={product.id} />
        ))}
      </Grid>
    </Container>
  )
}

export async function getServerSideProps() {
  const { products } = await client.products.list()
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { products, region } }
}

export default Shop
