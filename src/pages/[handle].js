// @ts-check

import Head from "next/head"
import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
import { formatVariantPrice } from "medusa-react"
import NextLink from "next/link"
import { client } from "../utils/client"
import { PublicContext } from "../context/publicContext"
import Variant from "../components/Product/Variant"
import TabsContainer from "../components/Product/TabsContainer"
import SelectQuantity from "../components/Product/SelectQuantity"
import { getTokenCookie, setTokenCookie } from "../utils/cookie"

const ProductPage = ({ product, region, cartId }) => {
  const [activeOption, setActiveOption] = useState(product.options[0].id)
  const [activeOptionVal, setActiveOptionVal] = useState({})
  const [currentImg, setCurrentImg] = useState({
    id: "thumbnail",
    url: product.thumbnail,
  })
  const [quantity, setQuantity] = useState({ val: 1, max: 1 })
  const [isVariant, setIsVariant] = useState(false)
  const [price, setPrice] = useState("0")
  const router = useRouter()
  const { setLoading } = useContext(PublicContext)

  const getVariantId = () => {
    const variant = product.variants.find(variant =>
      variant.options.every(
        option => activeOptionVal[option.option_id] === option.value
      )
    )

    if (variant) return variant.id
    return undefined
  }

  const addToCartHandler = async () => {
    if (isVariant && quantity.max) {
      setLoading(true)
      const variant_id = getVariantId()

      if (variant_id) {
        await client.carts.lineItems.create(cartId, {
          variant_id,
          quantity: quantity.val,
        })
        router.push("/cart")
      }

      setLoading(false)
    }
  }

  const onChooseVariantHandler = id => {
    const newActiveOptionVal = {
      ...activeOptionVal,
      [activeOption]: id,
    }

    setActiveOptionVal(newActiveOptionVal)

    const variant = product.variants.find(variant => {
      return variant.options.every(
        option => newActiveOptionVal[option.option_id] === option.value
      )
    })

    if (variant) {
      setPrice(
        formatVariantPrice({
          variant,
          region,
        })
      )
      setQuantity({
        val: 1,
        max: variant.inventory_quantity,
      })
      setIsVariant(true)
    } else {
      setPrice("0")
      setIsVariant(false)
    }
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product?.description || ""} />
      </Head>
      <div>
        <section className="grid py-8 layoutContainer grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {/* Product thumbnail */}
            <img
              src={currentImg.url}
              alt="Product media"
              className="max-h-80 object-contain"
            />

            {/* Product images */}
            <div className="flex my-2 gap-4">
              {[
                { url: product.thumbnail, id: "thumbnail" },
                ...product.images,
              ].map(({ id, url }) => (
                <img
                  key={id}
                  src={url}
                  alt="Product media"
                  className={`[ border rounded ] 
                  cursor-pointer object-contain
                  [ transition-all duration-300 ] 
                  [ max-h-20 max-w-20 ] ${
                    currentImg.id === id ? "border-secondary" : "border-brand"
                  }`}
                  onClick={() => setCurrentImg({ id, url })}
                />
              ))}
            </div>
          </div>

          <div>
            {/* Product title and collection */}
            <h2 className="text-brand mb-2">{product.title}</h2>

            {/* Tags */}
            <div className="flex gap-1 mb-2">
              {product.tags.map(tag => (
                <NextLink key={tag.id} href={`tags/${tag.id}`} passHref>
                  <a className="bg-lightGrey text-brand px-2 py-1 rounded-md text-sm no-underline">
                    {tag.value}
                  </a>
                </NextLink>
              ))}
            </div>

            {/* Collection name */}
            <p>{product?.collection?.title}</p>

            {/* Choose a variant */}
            <div className="flex flex-wrap my-2">
              {product.options.map((option, i) => (
                <button
                  key={option.id}
                  className={`buttonCta flex-1 min-w-max ${
                    option.id === activeOption ? "buttonActive" : ""
                  } ${
                    !i
                      ? "rounded-l rounded-r-none"
                      : i + 1 === product.options.length
                      ? "rounded-r rounded-l-none"
                      : "rounded-none"
                  }`}
                  onClick={() => setActiveOption(option.id)}
                >
                  {option.title}
                </button>
              ))}
            </div>

            {/* Variant options */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Variant
                options={product.options}
                activeOption={activeOption}
                activeOptionVal={activeOptionVal}
                onChooseVariantHandler={onChooseVariantHandler}
              />
            </div>

            {/* Quantity */}
            {isVariant ? (
              <>
                {quantity.max ? (
                  <SelectQuantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                ) : undefined}
                <p className="text-secondary mb-4">
                  {!quantity.max
                    ? `Sorry no products left for this variant`
                    : quantity.max < 6
                    ? `Hurry up, only ${quantity.max} pieces left for this product.`
                    : undefined}
                </p>
              </>
            ) : (
              <p className="text-secondary mb-4">
                Please, choose a valid variant before adding to cart
              </p>
            )}

            {/* Add to cart button and price */}
            <div className="flex items-center flex-wrap gap-4 mt-auto">
              <button
                className={`rounded-2xl gap-4 buttonCta flex-1 ${
                  isVariant && quantity.max
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>

              <p className="text-secondary text-xl font-bold">
                {price !== "0" && price}
              </p>
            </div>
          </div>
        </section>

        {/* Description */}
        <TabsContainer description={product.description} />
      </div>
    </>
  )
}

export async function getServerSideProps({ req, params, res }) {
  const { products } = await client.products.list({ handle: params.handle })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")
  let cartId = getTokenCookie(req, "cart_id")

  if (!cartId) {
    const {
      cart: { id },
    } = await client.carts.create(undefined, {
      cookie: req.headers?.cookie || "",
    })
    setTokenCookie(res, "cart_id", id)
    cartId = id
  }

  const [product] = products

  return { props: { cartId, product, region } }
}

export default ProductPage
