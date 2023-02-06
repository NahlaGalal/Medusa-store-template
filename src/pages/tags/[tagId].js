// @ts-check

import React, { useContext, useEffect, useState } from "react"
import Head from "next/head"
import { Container, Grid, Text } from "theme-ui"
import Pagination, { LIMIT } from "../../components/Pagination"
import { client } from "../../utils/client"
import Product from "../../components/ProductCard"
import { PublicContext } from "../../context/publicContext"

const Tags = ({ products, region, count, limit, offset, tagId }) => {
  const [pageProducts, setPageProducts] = useState(products)
  const { setRegion } = useContext(PublicContext)

  const getTagName = () => {
    const productTags = pageProducts[0].tags
    const currentTag = productTags.find(productTag => productTag.id === tagId)

    if (currentTag) return currentTag.value.toLocaleUpperCase()
    return ""
  }

  useEffect(() => setRegion(region), [])

  return (
    <>
      <Head>
        <title>{getTagName()} Tag</title>
      </Head>

      <Container variant="layout.container">
        {pageProducts.length ? (
          <>
            <Grid columns={[1, 2, 3]} gap={24} my={4}>
              {pageProducts.map(product => (
                <Product hit={product} key={product.id} />
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

export async function getServerSideProps(ctx) {
  const { tagId } = ctx.query

  const { products, count, limit, offset } = await client.products.list({
    limit: LIMIT,
    tags: [tagId],
  })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { products, region, count, limit, offset, tagId } }
}

export default Tags
