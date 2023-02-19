// @ts-check
import React, { useContext } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { client } from "../../utils/client"
import { PublicContext } from "../../context/publicContext"
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid"
import translations from "../../translations/layout.json"

const Footer = () => {
  const { isRegistered, setIsRegistered } = useContext(PublicContext)
  let { push, locale } = useRouter()

  if (!locale) locale = "en-US"

  const logoutHandler = async () => {
    const res = await client.auth.deleteSession()
    if (res.response.status === 200) {
      localStorage.removeItem("id")
      push("/login")
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
                <a className="flex gap-1 items-center">
                  <HomeIcon className="text-brand" width={20} />
                  {translations[locale].home}
                </a>
              </NextLink>
            </li>
            <li>
              <NextLink href={"/shop"} passHref>
                <a className="flex gap-1 items-center">
                  <ShoppingBagIcon className="text-brand" width={20} />
                  {translations[locale].shop}
                </a>
              </NextLink>
            </li>
            <li>
              <NextLink href={"/cart"} passHref>
                <a className="flex gap-1 items-center">
                  <ShoppingCartIcon className="text-brand" width={20} />
                  {translations[locale].cart}
                </a>
              </NextLink>
            </li>
            <li>
              {isRegistered ? (
                <button
                  className="p-0 bg-transparent cursor-pointer text-darkBlack flex gap-1 items-center"
                  onClick={logoutHandler}
                >
                  <ArrowLeftOnRectangleIcon className="text-brand" width={20} />
                  {translations[locale].logout}
                </button>
              ) : (
                <NextLink href={"/register"} passHref>
                  <a className="flex gap-1 items-center">
                    <ArrowRightOnRectangleIcon
                      className="text-brand"
                      width={20}
                    />
                    {translations[locale].register}
                  </a>
                </NextLink>
              )}
            </li>
          </ul>
        </div>

        <p className="mt-16 mb-4 text-center text-xs">
          {translations[locale].copyright}
        </p>
      </div>
    </footer>
  )
}

export default Footer
