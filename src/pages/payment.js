import React, { useState, useEffect } from "react"
import Head from "next/head"
import { Container, Spinner } from "theme-ui"
import Payment2 from "../components/steps/payment"
import { client } from "../utils/client"

const Payment = () => {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState()

  useEffect(() => {
    const getCart = async () => {
      setLoading(true)

      const cartId = localStorage.getItem("cart_id")
      let res

      if (cartId) res = await client.carts.retrieve(cartId)
      else res = await client.carts.create()

      setCart(res.cart)
      setLoading(false)
    }

    getCart()
  }, [])

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      {loading ? (
        <Spinner
          sx={{ margin: "auto", width: 100, height: 100, color: "brand" }}
        />
      ) : (
        <Container variant="layout.container">
          <Payment2 cart={cart} />
        </Container>
      )}
    </>
  )
}

export default Payment
