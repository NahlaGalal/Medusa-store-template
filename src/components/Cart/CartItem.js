// @ts-check
import React from "react"
import NextLink from "next/link"
import { RectangleStackIcon } from "@heroicons/react/20/solid"
import translations from "../../translations/cart.json"

const CartItem = ({ product, getCollectionName, deleteItem, locale }) => {
  return (
    <div className="flex stepContainer gap-4 relative flex-col md:flex-row">
      <button
        title="Close"
        aria-label="Close"
        className="absolute -right-9 p-0 bg-secondary rounded-full -top-6 cursor-pointer text-white"
        onClick={() => deleteItem(product.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentcolor"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>

      <img
        className="rounded object-contain flex-1 md:max-w-[250px] max-w-full"
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="flex-1">
        <p className="text-xl font-semibold text-ellipsis flex-nowrap overflow-hidden">
          <NextLink href={`/${product.variant.product.handle}`} passHref>
            <a className="text-brand no-underline">{product.title}</a>
          </NextLink>
        </p>

        <span className="text-xs font-light text-darkGrey flex items-center gap-1">
          <RectangleStackIcon width={12} />
          {getCollectionName(product.variant.product.collection_id) || ""}
        </span>

        <p className="mt-2 w-max bg-lightGrey text-brand px-2 py-1 rounded-md text-sm no-underline">
          {product.description}
        </p>

        <p
          className="mb-2 text-sm font-light text-darkGrey leading-6 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.variant.product.description}
        </p>

        <p>
          {translations[locale].qty}: {product.quantity}
        </p>
        <p className="text-right text-brand">
          {new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "EGP",
          }).format(product.total / 100)}{" "}
        </p>
      </div>
    </div>
  )
}

export default CartItem
