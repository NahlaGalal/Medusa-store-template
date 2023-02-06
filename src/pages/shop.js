// @ts-check
import React, { useContext, useEffect } from "react"
import { Container, Flex } from "theme-ui"
import Head from "next/head"
import { client } from "../utils/client"
import Filter from "../components/Filter"
import Search from "../components/Search"
import { PublicContext } from "../context/publicContext"

const Shop = ({ variants, region }) => {
  const { setRegion } = useContext(PublicContext)

  const getVariants = () => {
    const variantsTitle = [...new Set(variants.map(({ title }) => title))]
    return variantsTitle
  }

  useEffect(() => setRegion(region), [])

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <Container variant="layout.container">
        <Flex sx={{ gap: 5, flexDirection: ["column", "row", "row"] }} my={4}>
          {/* Filters */}
          <Filter variants={getVariants()} client={client} />

          <Flex sx={{ flex: 4, flexDirection: "column", gap: 3 }}>
            {/* Search */}
            <Search />
          </Flex>
        </Flex>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const { regions } = await client.regions.list()
  const { variants } = await client.products.variants.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { region, variants } }
}

export default Shop
