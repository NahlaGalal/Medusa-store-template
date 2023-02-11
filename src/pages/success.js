// @ts-check
import React, { useEffect } from "react"
import Head from "next/head"
import { Container } from "theme-ui"
import { client } from "../utils/client"
import { getTokenCookie, removeTokenCookie } from "../utils/cookie"
import SuccessOrder from "../components/SuccessOrder"
import { useRouter } from "next/router"

const Payment = ({ cart }) => {
  const router = useRouter()

  useEffect(() => {
    if (!cart) router.push("/")
  }, [])

  return (
    <>
      <Head>
        <title>Review Products</title>
      </Head>
      <Container variant="layout.container">
        <SuccessOrder cart={cart} />
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
