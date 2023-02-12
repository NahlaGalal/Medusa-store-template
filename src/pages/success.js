// @ts-check
import React, { useContext, useEffect } from "react"
import Head from "next/head"
import { Flex, Heading, Box, Text, Container } from "theme-ui"
import { client } from "../utils/client"
import { getTokenCookie, removeTokenCookie } from "../utils/cookie"
import ReviewAddress from "../components/SuccessOrder/ReviewAddress"
import ReviewProducts from "../components/SuccessOrder/ReviewProducts"
import TotalPrice from "../components/SuccessOrder/TotalPrice"
import { useRouter } from "next/router"
import { PublicContext } from "../context/publicContext"

const Payment = ({ cart }) => {
  const router = useRouter()
  const { isRegistered } = useContext(PublicContext)

  useEffect(() => {
    if (!cart || !cart.items.length) router.push("/")
  }, [])

  return (
    <>
      <Head>
        <title>Review Products</title>
      </Head>
      <Container variant="layout.container">
        {isRegistered && cart && cart.items.length && (
          <Flex
            sx={{
              my: 4,
              flexDirection: "column",
            }}
          >
            <Heading color="brand" sx={{ textAlign: "center" }}>
              Congratulations, Order success
            </Heading>
            <Text sx={{ textAlign: "center", mb: 3 }}>
              We will call you soon, to deliver your order
            </Text>
            <Box mt={"16px"}>
              <ReviewProducts cart={cart} />
              <TotalPrice cart={cart} />
              <ReviewAddress
                displayCountry={"Egypt"}
                delivery={cart?.shipping_address}
              />
            </Box>
          </Flex>
        )}
      </Container>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const cartId = getTokenCookie(req, "cart_id")
  let cart

  try {
    const response = await client.carts.retrieve(cartId)
    cart = response.cart
  } catch (err) {
    cart = null
  }

  removeTokenCookie(res, "cart_id")

  return { props: { cart } }
}

export default Payment
