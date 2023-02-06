// @ts-check
import React, { useContext, useEffect, useState } from "react"
import { Container, Grid, Heading, Text, Flex } from "theme-ui"
import Head from "next/head"
import Product from "../../components/ProductCard"
import { client } from "../../utils/client"
import Pagination, { LIMIT } from "../../components/Pagination"
import { PublicContext } from "../../context/publicContext"

const Collections = ({
  products,
  region,
  collection,
  count,
  limit,
  offset,
}) => {
  const [pageProducts, setPageProducts] = useState(products)
  const { setRegion } = useContext(PublicContext)

  useEffect(() => setRegion(region), [])

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
                <Flex
                  variant="layout.stepContainer"
                  key={product.id}
                  sx={{ justifyContent: "center" }}
                >
                  <Product hit={product} />
                </Flex>
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

export async function getServerSideProps({ params: { handle } }) {
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
