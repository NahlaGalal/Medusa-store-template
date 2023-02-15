// @ts-check
import React, { useContext } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { client } from "../../utils/client"
import { PublicContext } from "../../context/publicContext"

const Footer = () => {
  const { isRegistered, setIsRegistered } = useContext(PublicContext)
  const route = useRouter()

  const logoutHandler = async () => {
    const res = await client.auth.deleteSession()
    if (res.response.status === 200) {
      localStorage.removeItem("id")
      route.push("/login")
      setIsRegistered(false)
    }
  }

  return (
    <footer className="bg-lightGrey pt-16">
      <div className="layoutContainer">
        <div className="flex flex-wrap border-b border-b-darkGrey pb-4">
          <NextLink href="/" passHref>
            <a className="text-white">
              <img src={"/Logo.png"} alt="Logo" height={60} width={60} />
            </a>
          </NextLink>

          <ul className="flex list-none gap-4 p-0 mx-auto items-center">
            <li>
              <NextLink href={"/"} passHref>
                <a className="font-medium">Home</a>
              </NextLink>
            </li>
            <li>
              <NextLink href={"/shop"} passHref>
                <a className="font-medium">Shop</a>
              </NextLink>
            </li>
            <li>
              <NextLink href={"/cart"} passHref>
                <a className="font-medium">Cart</a>
              </NextLink>
            </li>
            <li>
              {isRegistered ? (
                <button
                  className="p-0 bg-transparent cursor-pointer text-darkBlack"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              ) : (
                <NextLink href={"/register"} passHref>
                  <a className="font-medium">Register</a>
                </NextLink>
              )}
            </li>
          </ul>
        </div>

        <p className="mt-16 mb-4 text-center text-xs">
          Copyright &copy; 2023 All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
