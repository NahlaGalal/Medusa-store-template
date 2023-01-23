import React, { useContext, useEffect, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { client } from "../../utils/client"
import { Button, Flex, Link, NavLink } from "theme-ui"
import { CollectionContext } from "../../context/collectionContext"

const Navbar = () => {
  const { setIsDropdownOpen, isDropdownOpen } = useContext(CollectionContext)
  const [isRegistered, setIsRegistered] = useState(false)
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
    }
  }

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
        <li style={{ position: "relative" }}>
          <Button
            sx={{ p: 0, background: "transparent", cursor: "pointer" }}
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
              }}
              onClick={e => e.stopPropagation()}
            >
              {collection.map(item => (
                <li key={item.id}>
                  <NextLink href={`/collections/${item.handle}`} passHref>
                    <NavLink sx={{ fontWeight: 400 }}>{item.title}</NavLink>
                  </NextLink>
                </li>
              ))}
            </Flex>
          )}
        </li>
        <li>
          <NextLink href={"/about"} passHref>
            <NavLink sx={{ fontWeight: 400 }}>About</NavLink>
          </NextLink>
        </li>
        <li>
          {isRegistered ? (
            <Button
              sx={{ p: 0, background: "transparent", cursor: "pointer" }}
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
  )
}

export default Navbar
