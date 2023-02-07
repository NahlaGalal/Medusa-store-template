// @ts-check
import React, { useState } from "react"
import { Flex, Container, Button, Text } from "theme-ui"

const TabsContainer = ({ description }) => {
  const [currentSection, setCurrentSection] = useState("description")

  return (
    <Flex sx={{ height: "100%", flexDirection: "column", gap: 3 }}>
      <Flex
        as="header"
        sx={{
          gap: 3,
          backgroundColor: "lightGrey",
          borderBottom: "1px solid",
          borderBottomColor: "darkGrey",
        }}
      >
        <Container className="layout.container">
          <Button
            onClick={() => setCurrentSection("description")}
            variant="buttons.decrementor"
            sx={{
              height: "auto",
              py: "20px",
              borderBottomColor: "secondary",
              borderBottomStyle: "solid",
              borderBottomWidth: currentSection === "description" ? 1 : 0,
            }}
          >
            Description
          </Button>
        </Container>
      </Flex>

      <Container className="layout.container" pb={3}>
        {currentSection === "description" ? (
          <Text
            as="p"
            dangerouslySetInnerHTML={{
              __html: description.replaceAll("\n", "<br />"),
            }}
          />
        ) : undefined}
      </Container>
    </Flex>
  )
}

export default TabsContainer
