// @ts-check
import React, { useContext, useEffect } from "react"
import Head from "next/head"
import { InstantSearch } from "react-instantsearch-dom"
import { client } from "../utils/client"
import Search from "../components/Search"
import { PublicContext } from "../context/publicContext"
import { SEARCH_INDEX_NAME, searchClient } from "../utils/search-client"
import Filter from "../components/Filter"

const Shop = ({ region }) => {
  const { setRegion } = useContext(PublicContext)

  useEffect(() => setRegion(region), [region])

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <div className="layoutContainer">
        <div className="flex gap-16 flex-col md:flex-row my-8">
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <Filter />
            <Search />
          </InstantSearch>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { regions } = await client.regions.list()

  const region = regions.find(region => region.name === "Afrika")

  return { props: { region } }
}

export default Shop
