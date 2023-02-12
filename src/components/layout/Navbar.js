import React, { useContext, useEffect, useState } from "react"
import NextLink from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { client } from "../../utils/client"
import { Button, Close, Flex, Link, MenuButton, NavLink } from "theme-ui"
import { PublicContext } from "../../context/publicContext"

const Navbar = ({
  isDropdownOpen,
  setIsDropdownOpen,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const { isRegistered, setIsRegistered } = useContext(PublicContext)
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

  const onToggleMenu = e => {
    e.stopPropagation()
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <Flex
      as="nav"
      sx={{
        flexWrap: "wrap",
        color: "brand",
        py: 10,
        px: "5%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <NextLink href="/" passHref>
        <Link sx={{ color: "white" }}>
          <Image src={"/Logo.png"} alt="Logo" height={60} width={60} />
        </Link>
      </NextLink>

      {isDrawerOpen ? (
        <Close
          sx={{ display: ["block", "none"], cursor: "pointer" }}
          onClick={onToggleMenu}
        />
      ) : (
        <MenuButton
          sx={{ display: ["block", "none"], cursor: "pointer" }}
          onClick={onToggleMenu}
        />
      )}

      <Flex
        as="ul"
        sx={{
          listStyleType: "none",
          gap: 16,
          zIndex: 200,
          transition: "all 0.4s ease-in-out",
          // Responsive
          position: ["fixed", "static"],
          flexDirection: ["column", "row"],
          alignItems: ["flex-start", "center"],
          left: 0,
          top: 84,
          py: [24, 0],
          px: [isDrawerOpen ? 24 : 0, 0],
          minHeight: ["calc(100vh - 84px)", 0],
          width: [isDrawerOpen ? 200 : 0, "auto"],
          opacity: [isDrawerOpen ? 1 : 0, 1],
          background: ["white", "transparent"],
          boxShadow: ["0 4px 6px rgba(0, 0, 0, 0.4)", "none"],
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
              color: "brand",
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
                display: ["inline-block", "none"],
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
              <NavLink
                sx={{ display: ["inline-block", "none"], fontWeight: 400 }}
              >
                Register
              </NavLink>
            </NextLink>
          )}
        </li>
      </Flex>

      {isRegistered ? (
        <Button
          sx={{
            display: ["none", "inline-block"],
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
          <NavLink sx={{ display: ["none", "inline-block"], fontWeight: 400 }}>
            Register
          </NavLink>
        </NextLink>
      )}
    </Flex>
  )
}

export default Navbar
