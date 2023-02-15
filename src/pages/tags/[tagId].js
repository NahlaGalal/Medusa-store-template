// @ts-check

import React, { useContext, useEffect, useState } from "react"
import Head from "next/head"
import Pagination, { LIMIT } from "../../components/Pagination"
import { client } from "../../utils/client"
import Product from "../../components/ProductCard"
import { PublicContext } from "../../context/publicContext"

const Tags = ({ products, region, count, limit, offset, tagId }) => {
  const [pageProducts, setPageProducts] = useState(products)
  const { setRegion } = useContext(PublicContext)

  const getTagName = () => {
    const productTags = pageProducts[0]?.tags
    const currentTag = productTags?.find(productTag => productTag.id === tagId)

    if (currentTag) return currentTag.value.toLocaleUpperCase()
    return ""
  }

  useEffect(() => setRegion(region), [])

  return (
    <>
      <Head>
        <title>{getTagName()} Tag</title>
      </Head>

      <div className="layoutContainer">
        {pageProducts.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-8">
              {pageProducts.map(product => (
                <div
                  className="stepContainer flex justify-center"
                  key={product.id}
                >
                  <Product hit={product} />
                </div>
              ))}
            </div>

            <Pagination
              count={count}
              limit={limit}
              offset={offset}
              setPageProducts={setPageProducts}
              options={{ tags: [tagId] }}
            />
          </>
        ) : (
          <p className="text-secondary font-medium text-xl text-center my-8">
            Sorry, no products found
          </p>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { tagId } = ctx.query

  const { products, count, limit, offset } = await client.products.list({
    limit: LIMIT,
    tags: [tagId],
  })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { products, region, count, limit, offset, tagId } }
}

export default Tags
