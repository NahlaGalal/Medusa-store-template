import { Flex, Grid, Image, Text } from "@theme-ui/components"
import React, { useMemo } from "react"

const Review = ({ cart }) => {
  return (
    <Grid>
      {cart.items.map(item => (
        <Flex
          sx={{
            alignItems: "top",
          }}
          key={item.id}
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            sx={{
              height: "90px",
              width: "50%",
              borderRadius: "4px",
              objectFit: "contain",
              objectPosition: "center center",
            }}
          />
          <Flex
            sx={{
              flex: 1,
              flexDirection: "column",
              fontWeight: "500",
              fontSize: ".8em",
              paddingLeft: "20px",
            }}
          >
            <Text sx={{ fontWeight: 550, marginBottom: "10px" }}>
              {item.title}
            </Text>
            <Flex
              sx={{
                width: "100%",
                fontWeight: 300,
                justifyContent: "space-between",
              }}
            >
              <Text sx={{ marginBottom: "15px", color: "darkBlack" }}>
                <Text sx={{ color: "darkGrey" }}>Size: </Text>
                {item.variant.title}
              </Text>
            </Flex>
            <Text sx={{ fontWeight: 300, color: "darkBlack" }}>
              <Text sx={{ color: "darkGrey" }}>Quantity: </Text>
              {item.quantity}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Grid>
  )
}

export default Review
