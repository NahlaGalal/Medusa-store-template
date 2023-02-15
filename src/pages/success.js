// @ts-check
import React, { useContext, useEffect } from "react"
import Head from "next/head"
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
      <div className="layoutContainer">
        {isRegistered && cart && cart.items.length && (
          <div className="my-8">
            <h2 className="text-brand text-center text-2xl">
              Congratulations, Order success
            </h2>
            <p className="text-center mb-4">
              We will call you soon, to deliver your order
            </p>
            <div className="mt-4">
              <ReviewProducts cart={cart} />
              <TotalPrice cart={cart} />
              <ReviewAddress
                displayCountry={"Egypt"}
                delivery={cart?.shipping_address}
              />
            </div>
          </div>
        )}
      </div>
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
