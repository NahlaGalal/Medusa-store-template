// @ts-check
import React, { useContext } from "react"
import { Box, Flex, Spinner } from "@theme-ui/components"
import { PublicContext } from "../../context/publicContext"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  const { setIsDropdownOpen, loading } = useContext(PublicContext)

  return (
    <Flex
      sx={{ flexDirection: "column", minHeight: "100vh" }}
      onClick={() => setIsDropdownOpen(false)}
    >
      <Navbar />
      {loading ? (
        <Spinner
          sx={{ margin: "auto", width: 100, height: 100, color: "brand" }}
        />
      ) : (
        <></>
      )}
      <Box sx={{ display: loading ? "none" : "block" }}>{children}</Box>
    </Flex>
  )
}

export default Layout
