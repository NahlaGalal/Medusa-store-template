import { Flex } from "@theme-ui/components"
import React, { useContext } from "react"
import { CollectionContext } from "../../context/collectionContext"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  const { setIsDropdownOpen } = useContext(CollectionContext)

  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
      onClick={() => setIsDropdownOpen(false)}
    >
      <Navbar />
      {children}
    </Flex>
  )
}

export default Layout
