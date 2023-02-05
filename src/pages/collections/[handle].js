// @ts-check
import React from "react"
import { Container, Grid, Heading, Text } from "theme-ui"
import Product from "../../components/ProductCard"
import { client } from "../../utils/client"

const Collections = ({ products, region, collection }) => {
  return (
    <Container variant="layout.container">
      <Heading sx={{ textAlign: "center", mt: 4 }}>
        {collection} Collection
      </Heading>
      {products.length ? (
        <Grid columns={[1, 2, 3]} gap={24} my={4}>
          {products.map(product => (
            <Product product={product} region={region} key={product.id} />
          ))}
        </Grid>
      ) : (
        <Text
          color="secondary"
          sx={{ fontWeight: 500, fontSize: 20, textAlign: "center" }}
          as={"p"}
          my={4}
        >
          Sorry, no products found
        </Text>
      )}
    </Container>
  )
}

export async function getStaticPaths() {
  const { collections } = await client.collections.list()

  const paths = collections
    .map(({ handle }) => ({
      params: { handle },
    }))
    .filter(p => !!p.params.handle)

  return { paths, fallback: false }
}

export async function getStaticProps({ params: { handle } }) {
  const { collections } = await client.collections.list({ handle: [handle] })
  const { products } = await client.products.list({
    collection_id: [collections[0].id],
  })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { products, region, collection: collections[0].title } }
}

export default Collections
