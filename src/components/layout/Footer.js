import React, { useContext, useEffect, useState } from "react"
import NextLink from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { client } from "../../utils/client"
import { Button, Container, Flex, Link, NavLink, Text } from "theme-ui"
import { PublicContext } from "../../context/publicContext"

const Footer = () => {
  const { setIsDropdownOpen, isDropdownOpen, isRegistered, setIsRegistered } =
    useContext(PublicContext)
  const [collection, setCollection] = useState([])
  const route = useRouter()

  useEffect(() => {
    const getCollections = async () => {
      const res = await client.collections.list()
      setCollection(res.collections)
    }

    getCollections()
    setIsRegistered(!!localStorage.getItem("id"))
  }, [])

  const logoutHandler = async () => {
    const res = await client.auth.deleteSession()
    if (res.response.status === 200) {
      localStorage.removeItem("id")
      route.push("/login")
      setIsRegistered(false)
    }
  }

  return (
    <Flex as="footer" backgroundColor={"lightGrey"} pt={5}>
      <Container variant="layout.container">
        <Flex
          sx={{
            flexWrap: "wrap",
            borderBottom: "1px solid",
            borderColor: "darkGrey",
            pb: 3,
          }}
        >
          <NextLink href="/" passHref>
            <Link sx={{ color: "white" }}>
              <Image src={"/Logo.png"} alt="Logo" height={60} width={60} />
            </Link>
          </NextLink>

          <Flex
            as="ul"
            sx={{
              listStyleType: "none",
              gap: 16,
              p: 0,
              mx: "auto",
              alignItems: "center",
            }}
          >
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
            <li style={{ position: "relative" }}>
              <Button
                sx={{
                  p: 0,
                  background: "transparent",
                  cursor: "pointer",
                  color: "darkBlack",
                }}
                onClick={e => {
                  e.stopPropagation()
                  setIsDropdownOpen(!isDropdownOpen)
                }}
              >
                Collection
              </Button>

              {isDropdownOpen && (
                <Flex
                  as="ul"
                  sx={{
                    flexDirection: "column",
                    position: "absolute",
                    backgroundColor: "brand",
                    listStyle: "none",
                    px: 3,
                    py: 2,
                    gap: 2,
                    borderRadius: 4,
                    top: 24,
                    width: "max-content",
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {collection.map(item => (
                    <li key={item.id}>
                      <NextLink href={`/collections/${item.handle}`} passHref>
                        <NavLink
                          sx={{ fontWeight: 400, color: "white" }}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.title}
                        </NavLink>
                      </NextLink>
                    </li>
                  ))}
                </Flex>
              )}
            </li>
            <li>
              <NextLink href={"/cart"} passHref>
                <NavLink sx={{ fontWeight: 400 }}>Cart</NavLink>
              </NextLink>
            </li>
            <li>
              {isRegistered ? (
                <Button
                  sx={{
                    p: 0,
                    background: "transparent",
                    cursor: "pointer",
                    color: "brand",
                  }}
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              ) : (
                <NextLink href={"/register"} passHref>
                  <NavLink sx={{ fontWeight: 400 }}>Register</NavLink>
                </NextLink>
              )}
            </li>
          </Flex>
        </Flex>

        <Text mt={5} mb={3} as="p" sx={{ textAlign: "center", fontSize: 12 }}>
          Copyright &copy; 2023 All Rights Reserved
        </Text>
      </Container>
    </Flex>
  )
}

export default Footer
