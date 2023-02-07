// @ts-check
import React from "react"
import { Flex, Text, Button, Input } from "theme-ui"

const SelectQuantity = ({ variant, quantity, setQuantity }) => {
  const isMostQuantity = () => quantity === variant.inventory_quantity
  const isLeastQuantity = () => quantity <= 1

  const incrementQuantityHandler = () =>
    !isMostQuantity() && setQuantity(quantity + 1)
  const decrementQuantityHandler = () =>
    !isLeastQuantity() && setQuantity(quantity - 1)

  return (
    <>
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
          value={quantity}
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
      {variant.inventory_quantity < 6 && (
        <Text mb={3} color="secondary">
          Hurry up, only {variant.inventory_quantity} pieces left for this
          prduct.
        </Text>
      )}
    </>
  )
}

export default SelectQuantity
