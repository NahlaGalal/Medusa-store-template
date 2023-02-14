// @ts-check
import React from "react"
import { Container, Flex, Box, Image, Heading, Grid, Text } from "theme-ui"

const GetInTouch = () => {
  return (
    <Container variant="layout.container" my={5} as="section">
      <Flex
        sx={{
          gap: "80px",
          alignItems: "flex-start",
          flexDirection: ["column", "row"],
        }}
      >
        <Box sx={{ flex: 1, position: "relative" }}>
          <Image
            src="/contact_section.jpg"
            alt="Contact illusturation"
            sx={{ borderRadius: 10, maxHeight: [300, "none"] }}
          />
          <Box
            as="span"
            sx={{
              position: "absolute",
              backgroundColor: "lightGrey",
              width: "100%",
              height: "100%",
              bottom: -40,
              right: -40,
              zIndex: -1,
              borderRadius: 10,
            }}
          ></Box>
        </Box>

        <Box sx={{ flex: 2, mt: [0, 5] }}>
          <Heading
            as="h2"
            sx={{ color: "secondary", width: ["100%", "50%"] }}
            mb={[4, 5]}
          >
            Get in touch with us & let's talk
          </Heading>

          <Grid columns={[1, 2, 2]} gap={4}>
            <Box>
              <Text as="p" sx={{ fontWeight: 700, mb: 2 }}>
                Office Hours
              </Text>
              <Text as="p" sx={{ color: "darkGrey" }}>
                Sunday to Thursday
              </Text>
              <Text as="p" sx={{ color: "darkGrey" }}>
                9:00 am to 5:00 pm
              </Text>
            </Box>

            <Box>
              <Text as="p" sx={{ fontWeight: 700, mb: 2 }}>
                Our Address
              </Text>
              <Text as="p" sx={{ color: "darkGrey" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolorum mollitia eius
              </Text>
            </Box>

            <Box>
              <Text as="p" sx={{ fontWeight: 700, mb: 2 }}>
                Get in Touch
              </Text>
              <Text as="p" sx={{ color: "darkGrey" }}>
                +1-264-124-6443
              </Text>
              <Text as="p" sx={{ color: "darkGrey" }}>
                +1-264-124-6443
              </Text>
            </Box>

            <Box>
              <Text as="p" sx={{ fontWeight: 700, mb: 2 }}>
                Email address
              </Text>
              <Text as="p" sx={{ color: "darkGrey" }}>
                elnagar@gmail.com
              </Text>
              <Text as="p" sx={{ color: "darkGrey" }}>
                elnagar2@gmail.com
              </Text>
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Container>
  )
}

export default GetInTouch
