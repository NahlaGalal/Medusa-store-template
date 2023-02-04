// @ts-check

import React from "react"
import { Container } from "@theme-ui/components"
import Forms from "./forms"

const ShippingAndInfo = ({ country, region }) => {
  return (
    <Container variant="layout.container">
      <Forms region={region} country={country} />
    </Container>
  )
}

export default ShippingAndInfo
