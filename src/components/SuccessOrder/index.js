// @ts-check
import React from "react"
import { Flex, Heading, Box, Text } from "theme-ui"
import ReviewAddress from "./ReviewAddress"
import ReviewProducts from "./ReviewProducts"
import TotalPrice from "./TotalPrice"

const SuccessOrder = ({ cart }) => {
  return cart ? (
    <Flex
      sx={{
        my: 4,
        flexDirection: "column",
      }}
    >
      <Heading color="brand" sx={{ textAlign: "center" }}>
        Congratulations, Order success
      </Heading>
      <Text sx={{ textAlign: "center", mb: 3 }}>
        We will call you soon, to deliver your order
      </Text>
      <Box mt={"16px"}>
        <ReviewProducts cart={cart} />
        <TotalPrice cart={cart} />
        <ReviewAddress
          displayCountry={"Egypt"}
          delivery={cart?.shipping_address}
        />
      </Box>
    </Flex>
  ) : (
    <></>
  )
}

export default SuccessOrder
