// @ts-check
import React from "react"
import { SearchBox, Hits, Pagination } from "react-instantsearch-dom"
import { Flex } from "theme-ui"
import Product from "../ProductCard"

const Search = () => {
  return (
    <Flex sx={{ flex: 4, flexDirection: "column", gap: 3 }}>
      {/* Search */}
      <SearchBox />

      {/* Products */}
      <Hits hitComponent={Product} />

      {/* Pagination */}
      <Pagination />
    </Flex>
  )
}

export default Search
