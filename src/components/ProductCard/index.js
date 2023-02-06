import React, { useContext } from "react"
import { Card, Flex, Image, Text, Link } from "@theme-ui/components"
import { formatVariantPrice } from "medusa-react"
import NextLink from "next/link"
import { PublicContext } from "../../context/publicContext"

const Product = ({ hit: product }) => {
  const { region } = useContext(PublicContext)

  return (
    <Card variant="container">
      <Flex sx={{ flexDirection: "column", mt: 16 }}>
        <Image
          sx={{
            width: "100%",
            borderRadius: "4px",
            objectFit: "contain",
          }}
          src={product.thumbnail}
          alt={product.title}
        />
        <Flex sx={{ flexDirection: "column", gap: 2 }}>
          <Text
            sx={{
              fontSize: "12px",
              fontWeight: 300,
              color: "#6B7280",
            }}
          >
            {product.collection_title}
          </Text>
          <Text
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <NextLink href={`/${product.handle}`} passHref>
              <Link color="brand" sx={{ textDecoration: "none" }}>
                {product.title}
              </Link>
            </NextLink>
          </Text>
          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 300,
              mb: "1em",
            }}
          >
            {`${formatVariantPrice({
              variant: product.variants[0],
              region,
            })}`}
          </Text>
        </Flex>
      </Flex>
      <Text
        sx={{
          mt: "16px",
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
        {product.description}
      </Text>
    </Card>
  )
}

export default Product
