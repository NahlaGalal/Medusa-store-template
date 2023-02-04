import { Flex, Spinner } from "@theme-ui/components"
import React, { useContext } from "react"
import { PublicContext } from "../../context/publicContext"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  const { setIsDropdownOpen, loading } = useContext(PublicContext)

  return (
    <Flex
      sx={{ flexDirection: "column" }}
      onClick={() => setIsDropdownOpen(false)}
    >
      <Navbar />
      {loading ? <Spinner /> : children}
    </Flex>
  )
}

export default Layout
