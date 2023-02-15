// @ts-check
import React, { useState } from "react"
import { connectRange } from "react-instantsearch-dom"

const RangeInput = ({ min, max, refine }) => {
  const [minInput, setMinInput] = useState(NaN)
  const [maxInput, setMaxInput] = useState(NaN)

  const onFilterHandler = e => {
    e.preventDefault()
    refine({
      min: Number.isNaN(minInput) ? min : Math.max(minInput * 100, min),
      max: Number.isNaN(maxInput) ? max : Math.min(maxInput * 100, max),
    })
  }

  return (
    <form className="flex flex-wrap gap-1" onSubmit={onFilterHandler}>
      <input
        type="number"
        name="min"
        placeholder={min ? Math.floor(+min / 100).toString() : "0"}
        max={Math.floor(max / 100) || 0}
        min={Math.floor(min / 100) || 0}
        onChange={event => setMinInput(parseInt(event.target.value))}
        className="formField text-sm font-light w-[calc(100%/3_-_8px)] border-brand min-w-[70px]"
      />
      <input
        type="number"
        name="max"
        placeholder={max ? Math.floor(+max / 100).toString() : "0"}
        max={Math.floor(max / 100) || 0}
        min={Math.floor(min / 100) || 0}
        onChange={event => setMaxInput(parseInt(event.target.value))}
        className="formField text-sm font-light w-[calc(100%/3_-_8px)] border-brand min-w-[70px]"
      />
      <button
        onClick={onFilterHandler}
        className="buttonCta rounded hover:bg-brand hover:text-white"
      >
        Filter
      </button>
    </form>
  )
}

const CustomRangeInput = connectRange(RangeInput)

export default CustomRangeInput
