// @ts-check

import Head from "next/head"
import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { client } from "../utils/client"
import { PublicContext } from "../context/publicContext"
import Header from "../components/Home/Header"
import Features from "../components/Home/Features"
import MostPopular from "../components/Home/MostPopular"
import AboutUs from "../components/Home/AboutUs"
import GetInTouch from "../components/Home/GetInTouch"

const IndexPage = ({ products, region }) => {
  const { setRegion } = useContext(PublicContext)
  const { locale } = useRouter()

  useEffect(() => setRegion(region), [])

  return (
    <>
      <Head>
        <title>ElNagar Classic</title>
        <meta name="description" content="ElNagar classic landing page" />
      </Head>

      <main className="flex flex-col overflow-hidden">
        {/* Header */}
        <Header locale={locale} />

        <button
          onClick={() => {
            throw new Error("Sentry Frontend Error")
          }}
        >
          Throw error
        </button>

        {/* Features */}
        <Features locale={locale} />

        {/* Most popular products */}
        <MostPopular products={products} locale={locale} />

        {/* About us */}
        <AboutUs locale={locale} />

        {/* Get in touch */}
        <GetInTouch locale={locale} />
      </main>
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
