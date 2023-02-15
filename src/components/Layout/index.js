// @ts-check
import React, { useContext, useState } from "react"
import { PublicContext } from "../../context/publicContext"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Spinner from "./Spinner"

const Layout = ({ children }) => {
  const { loading } = useContext(PublicContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeMenusHandler = () => {
    setIsDrawerOpen(false)
    setIsDropdownOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen" onClick={closeMenusHandler}>
      <Navbar
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      {loading && <Spinner />}
      <div
        className={`relative overflow-hidden flex-1 ${
          loading ? "hidden" : "block"
        }`}
      >
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
