// @ts-check
import React from "react"
import {
  SearchBox,
  Hits,
  Pagination,
  connectStateResults,
} from "react-instantsearch-dom"
import { Flex, Text } from "theme-ui"
import Product from "../ProductCard"

const Search = () => {
  return (
    <Flex sx={{ flex: 4, flexDirection: "column", gap: 3 }}>
      {/* Search */}
      <SearchBox />

      <Results>
        <>
          {/* Products */}
          <Hits hitComponent={Product} />
          {/* Pagination */}
          <Pagination />
        </>
      </Results>
    </Flex>
  )
}

const Results = connectStateResults(
  // @ts-ignore
  ({ searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <Text
        sx={{
          color: "secondary",
          fontWeight: 500,
          fontSize: 20,
          textAlign: "center",
          my: 5,
        }}
        as="p"
      >
        No products found
      </Text>
    )
)

export default Search
