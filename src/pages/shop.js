// @ts-check
import React, { useState } from "react"
import { Container, Grid, Text } from "theme-ui"
import Head from "next/head"
import { client } from "../utils/client"
import Product from "../components/ProductCard"
import Pagination, { LIMIT } from "../components/Pagination"

const Shop = ({ products, region, count, limit, offset }) => {
  const [pageProducts, setPageProducts] = useState(products)

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <Container variant="layout.container">
        {pageProducts.length ? (
          <>
            <Grid columns={[1, 2, 3]} gap={24} my={4}>
              {pageProducts.map(product => (
                <Product product={product} region={region} key={product.id} />
              ))}
            </Grid>

            {/* Paging */}
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

export async function getServerSideProps() {
  const { products, count, limit, offset } = await client.products.list({
    limit: LIMIT,
  })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { products, region, count, limit, offset } }
}

export default Shop
