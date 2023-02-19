// @ts-check

import React, { useContext, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import axios from "axios"
import { client } from "../utils/client"
import Forms from "../components/shipping"
import { getTokenCookie } from "../utils/cookie"
import { PublicContext } from "../context/publicContext"

const Shipping = ({ region, cart, cartId, customer }) => {
  const { setLoading } = useContext(PublicContext)
  const { isRegistered } = useContext(PublicContext)
  const { push, locale } = useRouter()

  useEffect(() => {
    if (!isRegistered) push("/login", { pathname: "not-loggedin" })
    else if (!cart || !cart.items.length) push("/")
  }, [])

  const createOrder = async ({ contact, delivery }) => {
    setLoading(true)

    const {
      // @ts-ignore
      data: { message },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/create-order?cartId=${cartId}`,
      {
        cart,
        shipping_address: {
          first_name: contact.first_name,
          last_name: contact.last_name,
          address_1: delivery.address_1,
          country_code: delivery.country_code,
          postal_code: delivery.postal_code,
          city: delivery.city,
          phone: contact.phone,
        },
      },
      {
        withCredentials: true,
      }
    )

    await client.carts.complete(cartId)

    if (message === "Done") push("/success")
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Shipping</title>
      </Head>
      <div className="layoutContainer">
        {isRegistered && cart && cart.items.length ? (
          <Forms
            region={region}
            country={region?.countries[0].iso_2}
            customer={customer}
            cart={cart}
            createOrder={createOrder}
            locale={locale}
          />
        ) : undefined}
      </div>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { regions } = await client.regions.list()
  const cartId = getTokenCookie(req, "cart_id") || null
  let cart, customer

  try {
    const response = await client.auth.getSession({
      cookie: req.headers.cookie,
    })
    customer = response.customer
  } catch (err) {
    customer = {}
  }

  try {
    const response = await client.carts.retrieve(cartId)
    cart = response.cart
  } catch (err) {
    cart = null
  }

  const region = regions.find(region => region.name === "Afrika")

  return { props: { region, cart, cartId, customer } }
}

export default Shipping
