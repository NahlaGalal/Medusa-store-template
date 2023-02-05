import React, { useState, useEffect, useContext } from "react"
import Head from "next/head"
import { Container } from "theme-ui"
import Payment2 from "../components/steps/payment"
import { client } from "../utils/client"
import { PublicContext } from "../context/publicContext"

const Payment = () => {
  const { setLoading } = useContext(PublicContext)
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
      <Container variant="layout.container">
        <Payment2 cart={cart} />
      </Container>
    </>
  )
}

export default Payment
