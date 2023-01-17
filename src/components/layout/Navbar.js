import React from "react"
import NextLink from "next/link"
import { Flex, Link, NavLink } from "theme-ui"

const Navbar = () => {
  return (
    <Flex
      as="nav"
      sx={{
        flexWrap: "wrap",
        backgroundColor: "secondary",
        color: "white",
        py: 20,
        px: "5%",
      }}
    >
      <NextLink href="/" passHref>
        <Link sx={{ color: "white" }}>Logo</Link>
      </NextLink>

      <Flex as="ul" sx={{ listStyleType: "none", gap: 16, p: 0, mx: "auto" }}>
        <li>
          <NextLink href={"/"} passHref>
            <NavLink sx={{ fontWeight: 400 }}>Home</NavLink>
          </NextLink>
        </li>
        <li>
          <NextLink href={"/shop"} passHref>
            <NavLink sx={{ fontWeight: 400 }}>Shop</NavLink>
          </NextLink>
        </li>
        <li>
          <NextLink href={"/collection"} passHref>
            <NavLink sx={{ fontWeight: 400 }}>Collection</NavLink>
          </NextLink>
        </li>
        <li>
          <NextLink href={"/about"} passHref>
            <NavLink sx={{ fontWeight: 400 }}>About</NavLink>
          </NextLink>
        </li>
        <li>
          <NextLink href={"/register"} passHref>
            <NavLink sx={{ fontWeight: 400 }}>Register</NavLink>
          </NextLink>
        </li>
      </Flex>
    </Flex>
  )
}

export default Navbar
