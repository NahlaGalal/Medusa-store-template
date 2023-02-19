// @ts-check
import React, { createContext, useContext, useEffect, useState } from "react"
import Head from "next/head"
import { InstantSearch } from "react-instantsearch-dom"
import { client } from "../utils/client"
import Search from "../components/Search"
import { PublicContext } from "../context/publicContext"
import { SEARCH_INDEX_NAME, searchClient } from "../utils/search-client"
import Filter from "../components/Filter"
import { useRouter } from "next/router"

export const PriceContext = createContext({
  min: NaN,
  setMin: _ => {},
  max: NaN,
  setMax: _ => {},
})

const Shop = ({ region }) => {
  const { setRegion } = useContext(PublicContext)
  const [min, setMin] = useState(NaN)
  const [max, setMax] = useState(NaN)
  const { locale } = useRouter()

  useEffect(() => setRegion(region), [region])

  return (
    <PriceContext.Provider value={{ max, min, setMax, setMin }}>
      <Head>
        <title>Shop</title>
      </Head>
      <div className="layoutContainer">
        <div className="flex gap-16 flex-col md:flex-row my-8">
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <Filter locale={locale} />
            <Search locale={locale} />
          </InstantSearch>
        </div>
      </div>
    </PriceContext.Provider>
  )
}

export async function getServerSideProps() {
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { region } }
}

export default Shop
