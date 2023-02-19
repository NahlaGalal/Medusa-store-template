import React, { useContext, useEffect, useState } from "react"
import { formatVariantPrice } from "medusa-react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { RectangleStackIcon } from "@heroicons/react/20/solid"
import { PublicContext } from "../../context/publicContext"
import { PriceContext } from "../../pages/shop"

const Product = ({ hit: product }) => {
  const { region } = useContext(PublicContext)
  const { min, max } = useContext(PriceContext)
  const [currentVariant, setCurrentVariant] = useState(product.variants[0])
  const { locale } = useRouter()

  useEffect(() => {
    const smallestPriceVariant = product.variants.reduce((prev, variant) =>
      prev.prices[0].amount < variant.prices[0].amount ? prev : variant
    )

    setCurrentVariant(smallestPriceVariant)
  }, [])

  useEffect(() => {
    const smallestPriceVariant = product.variants.reduce((prev, variant) =>
      min <= variant.prices[0].amount && variant.prices[0].amount <= max
        ? variant
        : prev
    )

    setCurrentVariant(smallestPriceVariant)
  }, [min, max])

  return (
    <section className="bg-white w-96 px-6 py-4 h-auto rounded-lg justify-center shadow-[0_0_4px_1px_rgba(0,0,0,0.2)] max-w-full">
      <div className="flex flex-col mt-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full rounded object-contain"
        />

        <div className="flex flex-col gap-2">
          {/* Collection */}
          <span className="text-xs font-light text-darkGrey flex gap-0.5 items-center">
            <RectangleStackIcon width={12} />
            {product.collection_title || product.collection.title}
          </span>

          {/* Product name */}
          <p className="text-xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
            <NextLink href={`/${product.handle}`} passHref>
              <a className="text-brand no-underline">{product.title}</a>
            </NextLink>
          </p>

          {/* Product price */}
          <p className="text-sm font-light mb-4">
            {`${formatVariantPrice({
              variant: currentVariant,
              region,
              locale,
            })}`}
          </p>
        </div>
      </div>
      <p
        className="text-sm font-light text-darkGrey overflow-hidden text-ellipsis leading-6"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {product.description}
      </p>
    </section>
  )
}

export default Product
