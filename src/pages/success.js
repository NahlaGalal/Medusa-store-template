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
import translations from "../translations/success.json"

const Payment = ({ cart }) => {
  let { push, locale } = useRouter()
  const { isRegistered } = useContext(PublicContext)

  if (!locale) locale = "en-US"

  useEffect(() => {
    if (!cart || !cart.items.length) push("/")
  }, [])

  return (
    <>
      <Head>
        <title>Review Products</title>
      </Head>
      <div className="layoutContainer">
        {isRegistered && cart && cart.items.length && (
          <div className="my-8">
            <h2 className="text-brand text-center text-2xl font-bold">
              {translations[locale].congratulations}
            </h2>
            <p className="text-center mb-4">
              {translations[locale].we_call_you}
            </p>
            <div className="mt-4">
              <ReviewProducts cart={cart} locale={locale} />
              <TotalPrice cart={cart} locale={locale} />
              <ReviewAddress
                displayCountry={"Egypt"}
                delivery={cart?.shipping_address}
                locale={locale}
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
