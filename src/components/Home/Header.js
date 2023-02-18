// @ts-check
import React from "react"
import NextLink from "next/link"
import { ShoppingBagIcon } from "@heroicons/react/20/solid"

const Header = () => {
  return (
    <header className="layoutContainer mt-8 flex gap-8 flex-col-reverse md:flex-row relative">
      <div className="flex-1 xl:flex-[2] flex-col flex">
        <h1 className="text-brand text-5xl md:text-7xl flex flex-col">
          <span className="font-Literata">A Dream</span>
          <span className="font-Literata">You</span>
          <span className="font-Literata">Deserve</span>
        </h1>

        <p className="text-darkGrey text-2xl my-4">
          Bed linen for those who love impeccable style and comfort
        </p>

        <NextLink href={"/shop"} passHref>
          <a className="buttonCta w-max py-2 px-4 flex gap-1 items-center">
            <ShoppingBagIcon width={20} />
            Shop now
          </a>
        </NextLink>
      </div>

      <div className="flex flex-1">
        <img
          src={"/home_header.jpg"}
          className="object-cover -rotate-6 w-full h-80 md:h-auto"
        />
      </div>

      <img
        src="/home_header2.jpg"
        className="absolute top-32 rotate-6 h-4/5 -right-1/3 hidden md:block"
      />
    </header>
  )
}

export default Header
