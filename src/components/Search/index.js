// @ts-check
import React from "react"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  RefinementList
} from "react-instantsearch-dom"
import { SEARCH_INDEX_NAME, searchClient } from "../../lib/search-client"
import Product from "../ProductCard"

const Search = () => {
  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <RefinementList attribute="tags" />
      <SearchBox className="search" />
      <Hits hitComponent={Product} />
      <Pagination className="dew" />
    </InstantSearch>
  )
}

export default Search
