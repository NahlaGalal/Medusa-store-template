// @ts-check
import React from "react"
import { Flex, Text, Button, Input } from "theme-ui"

const SelectQuantity = ({ quantity, setQuantity }) => {
  const isMostQuantity = () => quantity.val === quantity.max
  const isLeastQuantity = () => quantity.val <= 1

  const incrementQuantityHandler = () =>
    !isMostQuantity() && setQuantity({ ...quantity, val: quantity.val + 1 })
  const decrementQuantityHandler = () =>
    !isLeastQuantity() && setQuantity({ ...quantity, val: quantity.val - 1 })

  return (
    <Flex
      sx={{
        gap: 2,
        alignItems: "center",
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <Text as="p">Quantity</Text>
      <Button
        variant="cta"
        onClick={incrementQuantityHandler}
        sx={{
          borderColor: isMostQuantity() ? "darkGrey" : "brand",
          color: isMostQuantity() ? "darkGrey" : "brand",
          cursor: isMostQuantity() ? "not-allowed" : "pointer",
        }}
      >
        +
      </Button>
      <Input
        type={"number"}
        placeholder="0"
        sx={{ width: "50px" }}
        value={quantity.val}
        readOnly
      />
      <Button
        variant="cta"
        sx={{
          borderColor: isLeastQuantity() ? "darkGrey" : "brand",
          color: isLeastQuantity() ? "darkGrey" : "brand",
          cursor: isLeastQuantity() ? "not-allowed" : "pointer",
        }}
        onClick={decrementQuantityHandler}
      >
        -
      </Button>
    </Flex>
  )
}

export default SelectQuantity
