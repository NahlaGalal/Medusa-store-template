// @ts-check

import React, { useContext, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { client } from "../utils/client"
import Forms from "../components/shipping/forms"
import { Container, Text } from "theme-ui"
import { getTokenCookie } from "../utils/cookie"
import { PublicContext } from "../context/publicContext"

const Shipping = ({ region, cart, cartId }) => {
  const { isRegistered } = useContext(PublicContext)
  const router = useRouter()

  useEffect(() => {
    if (!cart) router.push("/")
  }, [])

  return (
    <>
      <Head>
        <title>Shipping</title>
      </Head>
      <Container variant="layout.container">
        {isRegistered && cart ? (
          <Forms
            region={region}
            country={region?.countries[0].iso_2}
            customer={{}}
            cart={cart}
            cartId={cartId}
          />
        ) : (
          <Text
            sx={{
              color: "secondary",
              fontWeight: 500,
              fontSize: 20,
              textAlign: "center",
              my: 5,
            }}
            as="p"
          >
            You must Login first
          </Text>
        )}
      </Container>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { regions } = await client.regions.list()
  const cartId = getTokenCookie(req, "cart_id") || null
  let cart

  try {
    const response = await client.carts.retrieve(cartId)
    cart = response.cart
  } catch (err) {
    cart = null
  }

  const region = regions.find(region => region.name === "Afrika")

  return { props: { region, cart, cartId } }
}

export default Shipping
