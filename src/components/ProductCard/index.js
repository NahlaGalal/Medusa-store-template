// @ts-check

import { Card, Flex } from "@theme-ui/components"
import { useCart } from "medusa-react"
import React, { useState } from "react"
import ProductSelection from "../product-selection"
import Spinner from "../spinner/spinner"

const Product = ({ region, country, product }) => {
  const [loading, setLoading] = useState(false)
  const { cart } = useCart()

  let triggerStyles = {}

  if (cart?.id) {
    triggerStyles.color = "darkgrey"
    triggerStyles.cursor = "pointer"
  }

  return (
    <Flex variant="layout.stepContainer" sx={{ position: "relative" }}>
      {loading && (
        <Flex
          sx={{
            position: "absolute",
            bg: "#ffffff",
            opacity: 0.8,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </Flex>
      )}
      <Card variant="container">
        <ProductSelection
          region={region}
          country={country.iso_2}
          product={product}
          setLoading={setLoading}
          nextStep={() => {}}
        />
      </Card>
      {/* <Card variant="accordionTrigger" sx={{ ...triggerStyles }}>
        Product
        {cart?.id && (
          <Image src={"/check.png"} height={"11px"} width={"16px"} />
        )}
      </Card> */}
    </Flex>
  )
}

export default Product
