// @ts-check
import React from "react"
import { Box, Container, Flex, Heading, Text } from "theme-ui"

const ImageSec = () => {
  return (
    <Flex
      as="section"
      sx={{
        backgroundImage: "url('/home_section.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
        alignItems: "center",
      }}
    >
      <Container
        variant="layout.container"
        backgroundColor={"rgba(255,255,255,0.5)"}
        py={5}
        px={3}
        my={5}
        sx={{
          height: "calc(100% - 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Heading
          as="h2"
          sx={{ textAlign: "center", color: "secondary" }}
          mb={4}
        >
          About US
        </Heading>

        <Heading sx={{ mb: 3, color: "brand", textAlign: "center" }} as="h3">
          Lorem ipsum dolor sit amet consectetur
        </Heading>
        <Text
          as="p"
          mb={3}
          sx={{ width: ["100%", "50%"], mx: "auto", textAlign: "center" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          officia excepturi. Earum quod nesciunt quia ad. Consequuntur incidunt
          nulla quis at, ducimus ullam, soluta, excepturi sapiente voluptas
          placeat eligendi possimus?
        </Text>
        <Text as="p" sx={{ width: ["100%", "50%"], mx: "auto", textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          officia excepturi. Earum quod nesciunt quia ad. Consequuntur incidunt
          nulla quis at, ducimus ullam, soluta, excepturi sapiente voluptas
          placeat eligendi possimus?
        </Text>
      </Container>
    </Flex>
  )
}

export default ImageSec
