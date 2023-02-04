// @ts-check

import React from "react"
import Head from "next/head"
import { client } from "../utils/client"
import Forms from "../components/shipping/forms"
import { Container } from "theme-ui"

const Shipping = ({ region }) => {
  return (
    <>
      <Head>
        <title>Shipping</title>
      </Head>
      <Container variant="layout.container">
        <Forms region={region} country={region?.countries[0].iso_2} />
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { region } }
}

export default Shipping
