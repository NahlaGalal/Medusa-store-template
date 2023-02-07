// @ts-check

import Head from "next/head"
import React, { useContext, useEffect } from "react"
import { Flex } from "theme-ui"
import { client } from "../utils/client"
import { PublicContext } from "../context/publicContext"
import Header from "../components/Home/Header"
import Features from "../components/Home/Features"
import AboutUs from "../components/Home/AboutUs"
import MostPopular from "../components/Home/MostPopular"
import ImageSec from "../components/Home/ImageSec"
import GetInTouch from "../components/Home/GetInTouch"

const IndexPage = ({ products, region }) => {
  const { setRegion } = useContext(PublicContext)

  useEffect(() => setRegion(region), [])

  return (
    <>
      <Head>
        <title>ElNagar Classic</title>
        <meta name="description" content="ElNagar classic landing page" />
      </Head>

      <Flex as="main" sx={{ flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <Header />

        {/* Features */}
        <Features />

        {/* About us */}
        <AboutUs />

        {/* Most popular products */}
        <MostPopular products={products} />

        {/* Image section */}
        <ImageSec />

        {/* Get in touch */}
        <GetInTouch />
      </Flex>
    </>
  )
}

export async function getStaticProps() {
  const { products } = await client.products.list({ limit: 4 })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { products, region } }
}

export default IndexPage

// FIXME: Image next vs theme UI
