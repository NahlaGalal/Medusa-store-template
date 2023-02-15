import React, { useContext, useEffect, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { client } from "../../utils/client"
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
      const { collections } = await client.collections.list()
      setCollection(collections)
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
    <nav className="flex flex-wrap text-brand py-3 px-[5%] items-center justify-between shadow-md">
      {/* Logo */}
      <NextLink href="/" passHref>
        <a className="text-white">
          <img src={"/Logo.png"} alt="Logo" height={60} width={60} />
        </a>
      </NextLink>

      {/* Hamburger menu icon */}
      <button
        title="Close"
        aria-label="Close"
        className="block md:hidden cursor-pointer p-0 bg-transparent text-brand"
        onClick={onToggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentcolor"
          viewBox="0 0 24 24"
        >
          {isDrawerOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          )}
        </svg>
      </button>

      {/* Nav icons */}
      <ul
        className={`list-none z-50 
      [ transition-all duration-30 ] 
      [ fixed md:static left-0 top-20 ]
      [ flex gap-4 flex-col md:flex-row items-start md:items-center ]
      [ py-6 md:py-0 ${isDrawerOpen ? "px-6" : "px-0"} md:px-0 ]
      [ min-h-[calc(100vh_-_84px)] md:min-h-0 ]
      [ ${isDrawerOpen ? "w-52" : "w-0"} md:w-auto ]
      [ ${isDrawerOpen ? "opacity-100" : "opacity-0"} md:opacity-100 ]
      [ bg-white md:bg-transparent ]
      [ shadow-md md:shadow-none ]`}
      >
        <li>
          <NextLink href={"/"} passHref>
            <a>Home</a>
          </NextLink>
        </li>
        <li>
          <NextLink href={"/shop"} passHref>
            <a>Shop</a>
          </NextLink>
        </li>

        {/* Collectio */}
        <li className="relative">
          <button
            className="p-0 bg-transparent cursor-pointer text-brand"
            onClick={e => {
              e.stopPropagation()
              setIsDropdownOpen(!isDropdownOpen)
            }}
          >
            Collection
          </button>

          {isDropdownOpen && (
            <ul
              className="flex flex-col absolute bg-brand list-none px-4 py-2 gap-2 rounded top-6 w-max"
              onClick={e => e.stopPropagation()}
            >
              {collection.map(item => (
                <li key={item.id}>
                  <NextLink href={`/collections/${item.handle}`} passHref>
                    <a
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-white"
                    >
                      {item.title}
                    </a>
                  </NextLink>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <NextLink href={"/cart"} passHref>
            <a>Cart</a>
          </NextLink>
        </li>

        {/* Register / Logout */}
        <li>
          {isRegistered ? (
            <button
              className="inline-block md:hidden p-0 bg-transparent cursor-pointer text-brand"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <NextLink href={"/register"} passHref>
              <a className="inline-block md:hidden">Register</a>
            </NextLink>
          )}
        </li>
      </ul>

      {/* Register / Logout */}
      {isRegistered ? (
        <button
          className="hidden md:inline-block p-0 bg-transparent cursor-pointer text-brand"
          onClick={logoutHandler}
        >
          Logout
        </button>
      ) : (
        <NextLink href={"/register"} passHref>
          <a className="hidden md:inline-block">Register</a>
        </NextLink>
      )}
    </nav>
  )
}

export default Navbar
