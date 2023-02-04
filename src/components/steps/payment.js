// @ts-check

import { Box, Flex, Heading, Text } from "@theme-ui/components"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import React, { useState } from "react"
import PaymentDetails from "../payment/payment"
import Review from "../payment/review"
import Total from "../payment/total"

const DeliveryReview = ({ delivery, displayCountry }) => (
  <Flex
    sx={{
      flexDirection: "column",
      borderBottom: "1px solid #E5E7EB",
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

const Payment = ({ cart }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { pay } = useCart()

  console.log(cart)

  const submitPayment = async () => {
    // set Stripe as payment provider and navigate to confirmation page to complete order
    console.log("submitForm")
    // pay.mutate(
    //   { provider_id: "stripe" },
    //   { onSuccess: () => router.push(`/completing?cid=${cart.id}`) }
    // )
  }

  return cart ? (
    <Flex
      sx={{
        my: 4,
        flexDirection: "column",
      }}
    >
      <Heading color="brand">Payment</Heading>
      <Box mt={"16px"}>
        <Review cart={cart} />
        <Total cart={cart} />
        <DeliveryReview
          displayCountry={"Egypt"}
          delivery={cart?.shipping_address}
        />
        <Flex
          sx={{
            flexDirection: "column",
            py: "16px",
          }}
        >
          <Heading as="h3" sx={{ mb: "8px", color: "secondary" }}>
            Payment method
          </Heading>
          <PaymentDetails
            handleSubmit={submitPayment}
            setLoading={setLoading}
            cart={cart}
          />
        </Flex>
      </Box>
    </Flex>
  ) : (
    <></>
  )
}

export default Payment
