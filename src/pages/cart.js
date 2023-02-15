// @ts-check
import React, { useContext, useState } from "react"
import Head from "next/head"
import NextLink from "next/link"
import { client } from "../utils/client"
import CartItem from "../components/Cart/CartItem"
import { PublicContext } from "../context/publicContext"
import { getTokenCookie, setTokenCookie } from "../utils/cookie"

const Cart = ({ collections, items, cartId }) => {
  const [products, setProducts] = useState(items)
  const { setLoading } = useContext(PublicContext)

  const getCollectionName = collectioId => {
    return collections.find(collection => collection.id === collectioId).title
  }

  const deleteItem = async lineItemId => {
    setLoading(true)

    const {
      cart: { items },
    } = await client.carts.lineItems.delete(cartId, lineItemId)

    setProducts(items)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>My Cart</title>
      </Head>
      <div className="layoutContainer">
        {products.length ? (
          <>
            <section className="grid gap-6 my-8">
              {products.map(product => (
                <div
                  className="w-full bg-white px-6 py-4 h-auto rounded-lg justify-center shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] max-w-full"
                  key={product.id}
                >
                  <CartItem
                    product={product}
                    getCollectionName={getCollectionName}
                    deleteItem={deleteItem}
                  />
                </div>
              ))}
            </section>

            <NextLink href="/shipping" passHref>
              <a className="buttonCta mx-auto mb-8 block w-max px-4 py-2">
                Proceed to Buy
              </a>
            </NextLink>
          </>
        ) : (
          <p className="text-secondary font-medium text-xl text-center my-16">
            No products in the cart yet
          </p>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const { collections } = await client.collections.list()
  const cartId = getTokenCookie(req, "cart_id")
  let response

  if (cartId) response = await client.carts.retrieve(cartId)
  else
    response = await client.carts.create(undefined, {
      cookie: req.headers?.cookie || "",
    })

  const {
    cart: { id, items },
  } = response

  if (!cartId) setTokenCookie(res, "cart_id", id)

  return { props: { collections, items, cartId: cartId || id } }
}

export default Cart
