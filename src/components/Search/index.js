// @ts-check
import React from "react"
import {
  SearchBox,
  Hits,
  Pagination,
  connectStateResults,
} from "react-instantsearch-dom"
import Product from "../ProductCard"
import translations from "../../translations/shop.json"

const Search = ({ locale }) => {
  return (
    <div className="flex flex-[4] flex-col gap-4">
      {/* Search */}
      <SearchBox
        translations={{ placeholder: translations[locale].search_here }}
      />

      <Results>
        <>
          {/* Products */}
          <Hits hitComponent={Product} />
          {/* Pagination */}
          <Pagination />
        </>
      </Results>
    </div>
  )
}

const Results = connectStateResults(
  // @ts-ignore
  ({ searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <p className="text-secondary font-medium text-xl text-center my-16">
        No products found
      </p>
    )
)

export default Search
