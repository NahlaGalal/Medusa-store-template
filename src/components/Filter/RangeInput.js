// @ts-check
import React, { useState } from "react"
import { connectRange } from "react-instantsearch-dom"
import { Button, Flex, Input } from "theme-ui"

const RangeInput = ({ min, max, refine }) => {
  const [minInput, setMinInput] = useState(NaN)
  const [maxInput, setMaxInput] = useState(NaN)

  const onFilterHandler = () => {
    refine({
      min: Number.isNaN(minInput) ? min : Math.max(minInput * 100, min),
      max: Number.isNaN(maxInput) ? max : Math.min(maxInput * 100, max),
    })
  }

  return (
    <Flex as="form" sx={{ flexWrap: "wrap", gap: 1 }}>
      <Input
        type="number"
        name="min"
        placeholder={min ? Math.floor(+min / 100).toString() : '0'}
        sx={{
          fontSize: "14px",
          fontWeight: 300,
          width: "calc(100% / 3 - 8px)",
          borderColor: "brand",
          minWidth: 70,
        }}
        max={Math.floor(max / 100) || 0}
        min={Math.floor(min / 100) || 0}
        variant="field"
        onChange={event => setMinInput(parseInt(event.target.value))}
      />
      <Input
        type="number"
        name="max"
        placeholder={max ? Math.floor(+max / 100).toString() : '0'}
        sx={{
          fontSize: "14px",
          fontWeight: 300,
          width: "calc(100% / 3 - 8px)",
          borderColor: "brand",
          minWidth: 70,
        }}
        max={Math.floor(max / 100) || 0}
        min={Math.floor(min / 100) || 0}
        variant="field"
        onChange={event => setMaxInput(parseInt(event.target.value))}
      />
      <Button
        onClick={onFilterHandler}
        variant="cta"
        type="button"
        sx={{
          borderRadius: "4px",
          "&:hover": { backgroundColor: "brand", color: "white" },
        }}
      >
        Filter
      </Button>
    </Flex>
  )
}

const CustomRangeInput = connectRange(RangeInput)

export default CustomRangeInput
