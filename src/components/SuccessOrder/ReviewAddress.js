// @ts-check
import React from "react"
import { Flex, Heading, Text } from "theme-ui"

const ReviewAddress = ({ delivery, displayCountry }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        pb: "16px",
        pt: "8px",
      }}
    >
      <Heading as="h3" sx={{ mb: "8px", color: "secondary" }}>
        Delivery
      </Heading>
      <Text variant="summary" color="darkGrey">
        {delivery.address_1}
      </Text>
      <Text
        variant="summary"
        color="darkGrey"
      >{`${delivery.postal_code}, ${delivery.city}`}</Text>
      <Text variant="summary" color="darkGrey">
        {displayCountry}
      </Text>
    </Flex>
  )
}

export default ReviewAddress
