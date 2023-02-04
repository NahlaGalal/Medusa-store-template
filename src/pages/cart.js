import React, { useEffect, useState } from "react"
import {
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Link,
  Spinner,
  Text,
} from "theme-ui"
import NextLink from "next/link"
import { client } from "../utils/client"

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

      const cart = res.cart
      localStorage.setItem("cart_id", cart.id)
      setProducts(cart.items)
      setLoading(false)
    }

    getCartItems()
  }, [])

  const getCollectionName = collectioId => {
    return collections.find(collection => collection.id === collectioId).title
  }

  return loading ? (
    <Spinner sx={{ margin: "auto", width: 100, height: 100, color: "brand" }} />
  ) : (
    <Container variant="layout.container">
      <Grid gap={24} my={4}>
        {products.map(product => (
          <Card variant="container" sx={{ width: "100%" }} key={product.id}>
            <Flex variant="layout.stepContainer" sx={{ gap: 3 }}>
              <Image
                sx={{
                  borderRadius: "4px",
                  objectFit: "contain",
                  flex: 1,
                  maxWidth: "100px",
                }}
                src={product.thumbnail}
                alt={product.title}
              />

              <Flex sx={{ flexDirection: "column", flex: 1 }}>
                <Text
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <NextLink
                    href={`/${product.variant.product.handle}`}
                    passHref
                  >
                    <Link color="brand" sx={{ textDecoration: "none" }}>
                      {product.title}
                    </Link>
                  </NextLink>
                </Text>

                <Text
                  sx={{
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "#6B7280",
                  }}
                >
                  {getCollectionName(product.variant.product.collection_id) ||
                    ""}
                </Text>

                <Text
                  sx={{
                    mt: "8px",
                    lineHeight: "24px",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "#6B7280",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="fz_s"
                >
                  {product.variant.product.description}
                </Text>

                <Text>Qty: {product.quantity}</Text>
                <Text>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EGP",
                  }).format(product.total / 100)}{" "}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>

      {products.length ? (
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
      ) : undefined}
    </Container>
  )
}

export async function getServerSideProps() {
  const { collections } = await client.collections.list()

  return { props: { collections } }
}

export default Cart
