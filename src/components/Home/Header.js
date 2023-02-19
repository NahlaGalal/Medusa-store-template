// @ts-check
import React from "react"
import NextLink from "next/link"
import { ShoppingBagIcon } from "@heroicons/react/20/solid"
import translations from "../../translations/home.json"

const Header = ({ locale }) => {
  return (
    <header className="layoutContainer mt-8 flex gap-8 flex-col-reverse md:flex-row relative">
      <div className="flex-1 xl:flex-[2] flex-col flex">
        <h1 className="text-brand text-5xl md:text-7xl flex flex-col">
          <span className="font-Literata">{translations[locale].a_dream}</span>
          <span className="font-Literata">{translations[locale].you}</span>
          <span className="font-Literata">{translations[locale].deserve}</span>
        </h1>

        <p className="text-darkGrey text-2xl my-4">
          {translations[locale].home_subheader}
        </p>

        <NextLink href={"/shop"} passHref>
          <a className="buttonCta w-max py-2 px-4 flex gap-1 items-center">
            <ShoppingBagIcon width={20} />
            {translations[locale].shop_now}
          </a>
        </NextLink>
      </div>

      <div className="flex flex-1">
        <img
          src={"/home_header.jpg"}
          className="object-cover -rotate-6 w-full h-80 md:h-auto"
          alt="Header image illustration"
        />
      </div>

      <img
        src="/home_header2.jpg"
        className="absolute top-32 rotate-6 h-4/5 hidden md:block ltr:-right-1/3 rtl:-left-1/3"
        alt="Header image illustration"
      />
    </header>
  )
}

export default Header
