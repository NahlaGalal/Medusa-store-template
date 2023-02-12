// @ts-check

import React from "react"
import { Flex, Close, Image, Text, Link } from "theme-ui"
import NextLink from "next/link"

const CartItem = ({ product, getCollectionName, deleteItem }) => {
  return (
    <Flex variant="layout.stepContainer" sx={{ gap: 3, position: "relative" }}>
      <Close
        sx={{
          position: "absolute",
          right: "-36px",
          padding: 0,
          backgroundColor: "secondary",
          borderRadius: "50%",
          top: "-24px",
          cursor: "pointer",
          color: "white",
        }}
        onClick={() => deleteItem(product.id)}
      />

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
          as="p"
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <NextLink href={`/${product.variant.product.handle}`} passHref>
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
          {getCollectionName(product.variant.product.collection_id) || ""}
        </Text>

        <Text
          sx={{
            mt: "8px",
            width: "max-content",
          }}
          variant="buttons.tags"
        >
          {product.description}
        </Text>

        <Text
          as="p"
          sx={{
            mb: "8px",
            lineHeight: "24px",
            fontSize: "14px",
            fontWeight: 300,
            color: "darkGrey",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.variant.product.description}
        </Text>

        <Text as="p">Qty: {product.quantity}</Text>
        <Text as="p" sx={{ textAlign: "right", color: "brand" }}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EGP",
          }).format(product.total / 100)}{" "}
        </Text>
      </Flex>
    </Flex>
  )
}

export default CartItem
