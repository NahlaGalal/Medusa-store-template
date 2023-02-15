// @ts-check
import React, { useContext, useEffect, useState } from "react"
import Head from "next/head"
import Product from "../../components/ProductCard"
import { client } from "../../utils/client"
import Pagination, { LIMIT } from "../../components/Pagination"
import { PublicContext } from "../../context/publicContext"

const Collections = ({
  products,
  region,
  collection,
  count,
  limit,
  offset,
}) => {
  const [pageProducts, setPageProducts] = useState(products)
  const { setRegion } = useContext(PublicContext)

  useEffect(() => setRegion(region), [])

  useEffect(() => {
    setPageProducts(products)
  }, [products])

  return (
    <>
      <Head>
        <title>{collection.title} Collection</title>
      </Head>

      <div className="layoutContainer">
        <h2 className="text-center mt-8 text-xl text-brand">
          {collection.title} Collection
        </h2>

        {pageProducts.length ? (
          <>
            <div className="grid grid-co1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-8">
              {pageProducts.map(product => (
                <div
                  key={product.id}
                  className="flex justify-center stepContainer"
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
              options={{ collection_id: [collection.id] }}
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

export async function getServerSideProps({ params: { handle } }) {
  const { collections } = await client.collections.list({ handle: [handle] })
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")
  
  if(collections.length) {
    const { products, count, limit, offset } = await client.products.list({
      collection_id: [collections[0]?.id],
      limit: LIMIT,
    })
  
    return {
      props: {
        products,
        region,
        collection: {
          title: collections[0].title,
          id: collections[0].id,
        },
        count,
        limit,
        offset,
      },
    }
  } else {
    return {
      props: {
        products: [],
        region,
        collection: {
          title: "Not Found",
          id: "",
        },
        count: 0,
        limit: LIMIT,
        offset: 0,
      },
    }
  }
}

export default Collections
