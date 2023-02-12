import React, { useContext, useEffect, useState } from "react"
import { Card, Container, Grid, Link, Text } from "theme-ui"
import Head from "next/head"
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
      <Container variant="layout.container">
        {products.length ? (
          <>
            <Grid gap={24} my={4}>
              {products.map(product => (
                <Card
                  variant="container"
                  sx={{ width: "100%" }}
                  key={product.id}
                >
                  <CartItem
                    product={product}
                    getCollectionName={getCollectionName}
                    deleteItem={deleteItem}
                  />
                </Card>
              ))}
            </Grid>

            <Link
              variant="buttons.cta"
              sx={{
                mx: "auto",
                mb: 4,
                display: "block",
                width: "max-content",
                padding: "8px 16px",
              }}
              href="/shipping"
            >
              Proceed to Buy
            </Link>
          </>
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
            No products in the cart yet
          </Text>
        )}
      </Container>
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
      cookie: req.headers.cookie,
    })

  const {
    cart: { id, items },
  } = response

  if (!cartId) setTokenCookie(res, "cart_id", id)

  return { props: { collections, items, cartId: cartId || id } }
}

export default Cart
