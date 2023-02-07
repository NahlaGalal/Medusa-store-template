// @ts-check

import React, { useEffect, useState } from "react"
import Head from "next/head"
import { client } from "../utils/client"
import Forms from "../components/shipping/forms"
import { Container, Text } from "theme-ui"
import { getTokenCookie, setTokenCookie } from "../utils/cookie"

const Shipping = ({ region, customer, cart, cartId }) => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("id")) setIsAuth(true)
  }, [])

  return (
    <>
      <Head>
        <title>Shipping</title>
      </Head>
      <Container variant="layout.container">
        {isAuth ? (
          <Forms
            region={region}
            country={region?.countries[0].iso_2}
            customer={customer}
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

export async function getServerSideProps({ req, res }) {
  const { regions } = await client.regions.list()
  const cartId = getTokenCookie(req, "cart_id")
  const { customer } = await client.customers.retrieve()

  const region = regions.find(region => region.name === "Afrika")

  let response

  if (cartId) response = await client.carts.retrieve(cartId)
  else response = await client.carts.create()

  const { cart } = response

  if (!cartId) setTokenCookie(res, "cart_id", cart.id)

  return { props: { region, customer, cart, cartId } }
}

export default Shipping
