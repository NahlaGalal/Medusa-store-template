// @ts-check
import React, { useContext, useState } from "react"
import { Box, Flex, Spinner } from "@theme-ui/components"
import { PublicContext } from "../../context/publicContext"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const { loading } = useContext(PublicContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeMenusHandler = () => {
    setIsDrawerOpen(false)
    setIsDropdownOpen(false)
  }

  return (
    <Flex
      sx={{ flexDirection: "column", minHeight: "100vh" }}
      onClick={closeMenusHandler}
    >
      <Navbar
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      {loading ? (
        <Spinner
          sx={{ margin: "auto", width: 100, height: 100, color: "brand" }}
        />
      ) : (
        <></>
      )}
      <Box
        sx={{
          display: loading ? "none" : "block",
          position: "relative",
          overflow: "hidden",
          flex: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout
