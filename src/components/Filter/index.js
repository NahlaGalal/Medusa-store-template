// @ts-check
import React from "react"
import { RefinementList } from "react-instantsearch-dom"
import CustomRangeInput from "./RangeInput"

const Filter = () => {
  return (
    <aside className="flex flex-col flex-1">
      <header className="mb-8">
        <h2 className="text-brand text-2xl">Filter</h2>
      </header>

      {/* Price range */}
      <div className="grid gap-2">
        <h3 className="text-secondary">Price (EGP)</h3>
        <CustomRangeInput attribute={"variants.prices.amount"} />
      </div>

      {/* Variants filter */}
      <div className="grid gap-2 my-4">
        <h3 className="text-secondary">Variants</h3>
        <RefinementList attribute="variant_title" />
      </div>

      {/* Tags filter */}
      <div className="grid gap-2">
        <h3 className="text-secondary">Tags</h3>
        <RefinementList attribute="tags.value" />
      </div>
    </aside>
  )
}

export default Filter
