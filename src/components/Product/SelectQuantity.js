// @ts-check
import React from "react"

const SelectQuantity = ({ quantity, setQuantity }) => {
  const isMostQuantity = () => quantity.val === quantity.max
  const isLeastQuantity = () => quantity.val <= 1

  const incrementQuantityHandler = () =>
    !isMostQuantity() && setQuantity({ ...quantity, val: quantity.val + 1 })
  const decrementQuantityHandler = () =>
    !isLeastQuantity() && setQuantity({ ...quantity, val: quantity.val - 1 })

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <p>Quantity</p>
      <button
        className={`buttonCta ${
          isMostQuantity()
            ? "border-darkGrey text-darkGrey cursor-not-allowed"
            : "border-brand text-brand cursor-pointer"
        }`}
        onClick={incrementQuantityHandler}
      >
        +
      </button>
      <input
        type={"number"}
        placeholder="0"
        className="w-12 h-8"
        value={quantity.val}
        readOnly
      />
      <button
        className={`buttonCta ${
          isLeastQuantity()
            ? "border-darkGrey text-darkGrey cursor-not-allowed"
            : "border-brand text-brand cursor-pointer"
        }`}
        onClick={decrementQuantityHandler}
      >
        -
      </button>
    </div>
  )
}

export default SelectQuantity
