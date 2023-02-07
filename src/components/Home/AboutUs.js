// @ts-check
import React from "react"
import { Flex, Container, Heading, Box, Text, Image } from "theme-ui"

const AboutUs = () => {
  return (
    <Flex backgroundColor={"lightGrey"} my={5} as="section" py={4}>
      <Container variant="layout.container">
        <Heading
          as="h2"
          sx={{ textAlign: "center", color: "secondary" }}
          mb={3}
        >
          About US
        </Heading>

        <Flex sx={{ gap: "40px", alignItems: "center" }}>
          <Box sx={{ flex: 2 }}>
            <Heading sx={{ mb: 3, color: "brand" }} as="h3">
              Lorem ipsum dolor sit amet consectetur
            </Heading>
            <Text as="p" mb={2} sx={{ width: "70%" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              officia excepturi. Earum quod nesciunt quia ad. Consequuntur
              incidunt nulla quis at, ducimus ullam, soluta, excepturi sapiente
              voluptas placeat eligendi possimus?
            </Text>
            <Text as="p" sx={{ width: "70%" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              officia excepturi. Earum quod nesciunt quia ad. Consequuntur
              incidunt nulla quis at, ducimus ullam, soluta, excepturi sapiente
              voluptas placeat eligendi possimus?
            </Text>
          </Box>

          <Image src="/about_img2.svg" sx={{ flex: 1 }} />
        </Flex>
      </Container>
    </Flex>
  )
}

export default AboutUs
