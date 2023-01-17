import { Flex, Link, Text } from "@theme-ui/components"
import React from "react"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      <Navbar />
      {children}
    </Flex>
  )
}

export default Layout
