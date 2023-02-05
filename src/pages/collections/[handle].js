// @ts-check
import React, { useState } from "react"
import { Container, Grid, Heading, Text } from "theme-ui"
import Head from "next/head"
import Product from "../../components/ProductCard"
import { client } from "../../utils/client"
import Pagination, { LIMIT } from "../../components/Pagination"

const Collections = ({ products, region, collection, count, limit, offset }) => {
  const [pageProducts, setPageProducts] = useState(products)

  return (
    <>
      <Head>
        <title>{collection} Collection</title>
      </Head>

      <Container variant="layout.container">
        <Heading sx={{ textAlign: "center", mt: 4 }}>
          {collection} Collection
        </Heading>
        {pageProducts.length ? (
          <>
            <Grid columns={[1, 2, 3]} gap={24} my={4}>
              {pageProducts.map(product => (
                <Product product={product} region={region} key={product.id} />
              ))}
            </Grid>

            <Pagination
              count={count}
              limit={limit}
              offset={offset}
              setPageProducts={setPageProducts}
            />
          </>
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
    </>
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
  const { products, count, limit, offset } = await client.products.list({
    collection_id: [collections[0].id],
    limit: LIMIT,
  })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return {
    props: {
      products,
      region,
      collection: collections[0].title,
      count,
      limit,
      offset,
    },
  }
}

export default Collections
