// @ts-check

import Head from "next/head"
import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
import { formatVariantPrice } from "medusa-react"
import { client } from "../utils/client"
import {
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  Link,
} from "theme-ui"
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
      <Flex sx={{ flexDirection: "column" }}>
        <Grid py={4}>
          <Container className="layout.container">
            <Grid as="section" columns={[1, 2, 2]}>
              <Flex sx={{ flexDirection: "column" }}>
                {/* Product thumbnail */}
                <Image
                  src={currentImg.url}
                  alt="Product media"
                  sx={{ maxHeight: "300px", objectFit: "contain" }}
                />

                {/* Product images */}
                <Flex my={2} sx={{ gap: 3 }}>
                  {[
                    { url: product.thumbnail, id: "thumbnail" },
                    ...product.images,
                  ].map(({ id, url }) => (
                    <Image
                      key={id}
                      src={url}
                      alt="Product media"
                      sx={{
                        border: "1px solid",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.4s ease-in-out",
                        maxHeight: "80px",
                        width: "80px",
                        objectFit: "contain",
                        borderColor:
                          currentImg.id === id ? "secondary" : "brand",
                      }}
                      onClick={() => setCurrentImg({ id, url })}
                    />
                  ))}
                </Flex>
              </Flex>

              <Flex sx={{ flexDirection: "column" }}>
                {/* Product title and collection */}
                <Heading color="brand" mb={2}>
                  {product.title}
                </Heading>

                {/* Tags */}
                <Flex sx={{ gap: "4px", mb: 2 }}>
                  {product.tags.map(tag => (
                    <Link
                      key={tag.id}
                      variant="buttons.tags"
                      href={`tags/${tag.id}`}
                    >
                      {tag.value}
                    </Link>
                  ))}
                </Flex>

                {/* Collection name */}
                <Text as="p">{product?.collection?.title}</Text>

                {/* Choose a variant */}
                <Flex my={2} sx={{ flexWrap: "wrap" }}>
                  {product.options.map((option, i) => (
                    <Button
                      variant="buttons.cta"
                      key={option.id}
                      className={`${
                        option.id === activeOption ? "active" : ""
                      }`}
                      onClick={() => setActiveOption(option.id)}
                      sx={{
                        borderRadius: !i
                          ? "4px 0 0 4px"
                          : i + 1 === product.options.length
                          ? "0 4px 4px 0"
                          : 0,
                        width: `calc(100% / ${product.options.length})`,
                      }}
                    >
                      {option.title}
                    </Button>
                  ))}
                </Flex>

                {/* Variant options */}
                <Flex sx={{ flexWrap: "wrap", gap: 2, mb: 3 }}>
                  <Variant
                    options={product.options}
                    activeOption={activeOption}
                    activeOptionVal={activeOptionVal}
                    onChooseVariantHandler={onChooseVariantHandler}
                  />
                </Flex>

                {/* Quantity */}
                {isVariant ? (
                  <>
                    {quantity.max ? (
                      <SelectQuantity
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    ) : undefined}
                    {!quantity.max ? (
                      <Text mb={3} color="secondary">
                        Sorry no products left for this variant
                      </Text>
                    ) : quantity.max < 6 ? (
                      <Text mb={3} color="secondary">
                        Hurry up, only {quantity.max} pieces left for this
                        product.
                      </Text>
                    ) : undefined}
                  </>
                ) : (
                  <Text mb={3} color="secondary">
                    Please, choose a valid variant before adding to cart
                  </Text>
                )}

                {/* Add to cart button and price */}
                <Flex
                  sx={{
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 3,
                    mt: "auto",
                  }}
                >
                  <Button
                    variant="buttons.incrementor"
                    sx={{
                      borderRadius: "20px",
                      gap: 3,
                      cursor:
                        isVariant && quantity.max ? "pointer" : "not-allowed",
                    }}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>

                  <Text
                    as="p"
                    color="secondary"
                    sx={{ fontSize: 20, fontWeight: 700 }}
                  >
                    {price !== "0" && price}
                  </Text>
                </Flex>
              </Flex>
            </Grid>
          </Container>
        </Grid>

        {/* Description */}
        <TabsContainer description={product.description} />
      </Flex>
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
      cookie: req.headers.cookie,
    })
    setTokenCookie(res, "cart_id", id)
    cartId = id
  }

  const [product] = products

  return { props: { cartId, product, region } }
}

export default ProductPage
