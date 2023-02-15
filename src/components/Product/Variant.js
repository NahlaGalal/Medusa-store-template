// @ts-check
import React from "react"

const Variant = ({
  options,
  activeOption,
  activeOptionVal,
  onChooseVariantHandler,
}) => {
  const activeOptionObj = options.find(opt => opt.id === activeOption)
  const optionValues = activeOptionObj.values.filter(
    (val, index, self) => index === self.findIndex(t => t.value === val.value)
  )

  return optionValues.map(optionVal => (
    <button
      key={optionVal.id}
      className={`buttonCta rounded flex-1 min-w-max ${
        optionVal.value === activeOptionVal[activeOption] ? "buttonActive" : ""
      }`}
      onClick={() => onChooseVariantHandler(optionVal.value)}
    >
      {optionVal.value}
    </button>
  ))
}

export default Variant
