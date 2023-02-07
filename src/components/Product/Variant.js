// @ts-check

import React from "react"
import { Button } from "theme-ui"

const Variant = ({
  options,
  activeOption,
  activeOptionVal,
  setActiveOptionVal,
}) => {
  const activeOptionObj = options.find(opt => opt.id === activeOption)
  const optionValues = activeOptionObj.values.filter(
    (val, index, self) => index === self.findIndex(t => t.value === val.value)
  )

  // console.log(optionValues)

  return optionValues.map(optionVal => (
    <Button
      variant="buttons.cta"
      key={optionVal.id}
      className={`${
        optionVal.id === activeOptionVal[activeOption] ? "active" : ""
      }`}
      onClick={() =>
        setActiveOptionVal({
          ...activeOptionVal,
          [activeOption]: optionVal.id,
        })
      }
      sx={{
        borderRadius: "4px",
        minWidth: `calc(100% / ${optionValues.length})`,
      }}
    >
      {optionVal.value}
    </Button>
  ))
}

export default Variant
