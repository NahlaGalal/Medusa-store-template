// @ts-check
import React from "react"
import { Container, Flex, Box, Text } from "theme-ui"

const Features = () => {
  return (
    <Container variant="layout.container" mt={5}>
      <Flex sx={{ flexDirection: ["column", "row", "row"], rowGap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Text
            as="p"
            color="darkGrey"
            sx={{ textAlign: "center", fontStyle: "italic" }}
            mb={2}
          >
            Satisfaction is
          </Text>
          <Text as="p" sx={{ textAlign: "center", fontSize: 24 }}>
            100% Guaranteed
          </Text>
        </Box>

        <Box
          sx={{
            flex: 1,
            borderWidth: [0, "0 1px"],
            borderStyle: "solid",
            borderColor: "lightGrey",
          }}
        >
          <Text
            as="p"
            color="darkGrey"
            sx={{ textAlign: "center", fontStyle: "italic" }}
            mb={2}
          >
            On all standard offers
          </Text>
          <Text as="p" sx={{ textAlign: "center", fontSize: 24 }}>
            Free Shipping
          </Text>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Text
            as="p"
            color="darkGrey"
            sx={{ textAlign: "center", fontStyle: "italic" }}
            mb={2}
          >
            Only in 30 days
          </Text>
          <Text as="p" sx={{ textAlign: "center", fontSize: 24 }}>
            Free Returns
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}

export default Features
