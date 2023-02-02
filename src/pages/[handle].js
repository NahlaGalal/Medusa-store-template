// @ts-check

import Head from "next/head"
import React, { useState } from "react"
import Layout from "../components/layout/layout"
import { client } from "../utils/client"
import { Container, Flex, Grid, Heading, Text, Image, Button } from "theme-ui"

const ProductPage = ({ product, region }) => {
  const country = region.countries[0].iso_2
  const [activeOption, setActiveOption] = useState(product.options[0].id)
  const [activeOptionVal, setActiveOptionVal] = useState({})
  const [currentImg, setCurrentImg] = useState({
    id: "thumbnail",
    url: product.thumbnail,
  })

  console.log(product)

  const renderOptionsValues = () => {
    const activeOptionObj = product.options.find(opt => opt.id === activeOption)
    const optionValues = activeOptionObj.values.filter(
      (val, index, self) => index === self.findIndex(t => t.value === val.value)
    )

    return optionValues.map(optionVal => (
      <Button
        variant="buttons.cta"
        key={optionVal.id}
        className={`${
          optionVal.id === activeOptionVal[activeOption] ? "active" : ""
        }`}
        onClick={() =>
          setActiveOptionVal({
            ...activeOptionVal,
            [activeOption]: optionVal.id,
          })
        }
        sx={{
          borderRadius: "4px",
          border: 0,
          minWidth: `calc(100% / ${optionValues.length})`,
        }}
      >
        {optionVal.value}
      </Button>
    ))
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{product.title}</title>
          <meta name="description" content={product?.description || ""} />
        </Head>
        <Grid as="main" py={4} backgroundColor="lightGrey">
          <Container className="layout.container">
            <Grid as="section" columns={[1, 2, 2]}>
              <Flex sx={{ flexDirection: "column" }}>
                {/* Product thumbnail */}
                <Image
                  src={currentImg.url}
                  alt="Product media"
                  sx={{ maxHeight: "200px", objectFit: "cover" }}
                />

                {/* Product images */}
                <Flex my={2} sx={{ gap: 3 }}>
                  {[
                    { url: product.thumbnail, id: "thumbnail" },
                    ...product.images,
                  ].map(({ id, url }) => (
                    <Image
                      key={id}
                      src={url}
                      alt="Product media"
                      sx={{
                        border: "1px solid",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.4s ease-in-out",
                        borderColor:
                          currentImg.id === id ? "secondary" : "brand",
                      }}
                      onClick={() => setCurrentImg({ id, url })}
                    />
                  ))}
                </Flex>
              </Flex>

              <Flex sx={{ flexDirection: "column" }}>
                {/* Product title and collection */}
                <Heading color="secondary" mb={2}>
                  {product.title}
                </Heading>
                <Text as="p">{product.collection.title}</Text>

                {/* Choose a variant */}
                <Flex my={2} sx={{ flexWrap: "wrap" }}>
                  {product.options.map((option, i) => (
                    <Button
                      variant="buttons.cta"
                      key={option.id}
                      className={`${
                        option.id === activeOption ? "active" : ""
                      }`}
                      onClick={() => setActiveOption(option.id)}
                      sx={{
                        borderRadius: !i
                          ? "4px 0 0 4px"
                          : i + 1 === product.options.length
                          ? "0 4px 4px 0"
                          : 0,
                        width: `calc(100% / ${product.options.length})`,
                      }}
                    >
                      {option.title}
                    </Button>
                  ))}
                </Flex>

                {/* Variant options */}
                <Flex sx={{ flexWrap: "wrap", gap: 2, mb: 3 }}>
                  {renderOptionsValues()}
                </Flex>

                {/* Add to cart button and price */}
                <Flex
                  sx={{
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 3,
                    mt: "auto",
                  }}
                >
                  <Button
                    variant="buttons.incrementor"
                    sx={{ borderRadius: "20px", gap: 3 }}
                  >
                    Add to Cart
                  </Button>

                  <Text
                    as="p"
                    color="secondary"
                    sx={{ fontSize: 20, fontWeight: 700 }}
                  >
                    {product.variants[0].prices[0].amount} L.E.
                  </Text>
                </Flex>
              </Flex>
            </Grid>
          </Container>
        </Grid>
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
