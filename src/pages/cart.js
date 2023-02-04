import React, { useEffect, useState } from "react"
import { Card, Container, Grid, Link, Spinner, Text } from "theme-ui"
import Head from "next/head"
import { client } from "../utils/client"
import CartItem from "../components/Cart/CartItem"

const Cart = ({ collections }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCartItems = async () => {
      const cartId = localStorage.getItem("cart_id")
      let res

      setLoading(true)
      if (cartId) res = await client.carts.retrieve(cartId)
      else res = await client.carts.create()

      const {
        cart: { id, items },
      } = res
      localStorage.setItem("cart_id", id)
      setProducts(items)
      setLoading(false)
    }

    getCartItems()
  }, [])

  const getCollectionName = collectioId => {
    return collections.find(collection => collection.id === collectioId).title
  }

  const deleteItem = async lineItemId => {
    const cartId = localStorage.getItem("cart_id")
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
      {loading ? (
        <Spinner
          sx={{ margin: "auto", width: 100, height: 100, color: "brand" }}
        />
      ) : (
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
            <Text sx={{ color: "secondary" }}>No products in the cart yet</Text>
          )}
        </Container>
      )}
    </>
  )
}

export async function getServerSideProps() {
  const { collections } = await client.collections.list()

  return { props: { collections } }
}

export default Cart
