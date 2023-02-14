// @ts-check
import React from "react"
import { Container, Flex, Heading, Text, Link, Image } from "theme-ui"
import NextLink from "next/link"

const Header = () => {
  return (
    <Container
      variant="layout.container"
      mt={4}
      as="header"
      sx={{
        display: "flex",
        gap: 4,
        maxHeight: ["auto", 600, 600],
        flexDirection: ["column-reverse", "row", "row"],
        position: "relative",
      }}
    >
      <Flex sx={{ flex: [1, 1, 2], flexDirection: "column" }}>
        <Heading
          as="h1"
          color="brand"
          sx={{ fontSize: [48, 70], display: "flex", flexDirection: "column" }}
        >
          <Text>A Dream</Text>
          <Text>You</Text>
          <Text>Deserve</Text>
        </Heading>
        <Text color="darkGrey" sx={{ fontSize: 24 }} my={3} as="p">
          Bed linen for those who love impeccable style and comfort
        </Text>

        <NextLink href={"/shop"} passHref>
          <Link
            variant="buttons.cta"
            sx={{ width: "max-content" }}
            py={2}
            px={3}
          >
            Shop now
          </Link>
        </NextLink>
      </Flex>

      <Flex sx={{ flex: 1 }}>
        <Image
          src={"/home_header.jpg"}
          sx={{
            objectFit: "cover",
            transform: "rotate(-5deg)",
            width: "100%",
            height: [300, "auto"]
          }}
        />
      </Flex>

      <Image
        src="/home_header2.jpg"
        sx={{
          position: "absolute",
          right: "-30%",
          top: "120px",
          transform: "rotate(5deg)",
          height: "80%",
          display: ["none", "block", "block"],
        }}
      />
    </Container>
  )
}

export default Header
