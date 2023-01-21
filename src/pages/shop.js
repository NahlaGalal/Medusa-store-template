// @ts-check
import React from "react"
import { Card, Flex, Grid, Heading, Image, Link, Text } from "theme-ui"
import NextLink from "next/link"
import { formatVariantPrice } from "medusa-react"
import Layout from "../components/layout/layout"
import { client } from "../utils/client"

const Shop = ({ products, region }) => {
  return (
    <Layout>
      <Grid columns={3} gap={24}>
        {products.map(product => (
          <Flex variant="layout.stepContainer" key={product.id}>
            <Card variant="container">
              <Flex sx={{ flexDirection: "column", mt: 16 }}>
                <Image
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    objectFit: "contain",
                  }}
                  src={product.thumbnail}
                  alt={product.title}
                />
                <Flex sx={{ flexDirection: "column", gap: 2 }}>
                  {product?.collection?.title && (
                    <Text
                      sx={{
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "#6B7280",
                      }}
                    >
                      {product.collection.title}
                    </Text>
                  )}
                  <Text
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                    }}
                  >
                    <NextLink href={`/${product.handle}`} passHref>
                      <Link color="brand" sx={{ textDecoration: "none" }}>
                        {product.title}
                      </Link>
                    </NextLink>
                  </Text>
                  <Text
                    sx={{
                      fontSize: "14px",
                      fontWeight: 300,
                      mb: "1em",
                    }}
                  >
                    {`${formatVariantPrice({
                      variant: product.variants[0],
                      region,
                    })}`}
                  </Text>
                </Flex>
              </Flex>
              <Text
                sx={{
                  mt: "16px",
                  lineHeight: "24px",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "#6B7280",
                }}
                variant="fz_s"
              >
                {product.description}
              </Text>
            </Card>
          </Flex>
        ))}
      </Grid>
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