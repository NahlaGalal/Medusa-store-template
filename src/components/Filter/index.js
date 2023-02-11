import React, { useState } from "react"
import { Button, Flex, Grid, Heading, Input } from "theme-ui"

const Filter = ({ variants }) => {
  const [activeVariants, setActiveVariants] = useState([])
  const [price, setPrice] = useState({ min: "", max: "" })

  const clearFiltersHandler = () => {
    setPrice({ min: "", max: "" })
    setActiveVariants([])
  }

  const toggleVariantHandler = variant => {
    const variantIndex = activeVariants.findIndex(v => v === variant)
    if (variantIndex !== -1) {
      const variantsCopy = [...activeVariants]
      variantsCopy.splice(variantIndex, 1)
      setActiveVariants(variantsCopy)
    } else {
      setActiveVariants([variant, ...activeVariants])
    }
  }

  return (
    <Flex sx={{ flexDirection: "column", flex: 1 }} as="aside">
      <Grid as="header" mb={4} gap={2}>
        <Heading color="brand">Filter</Heading>

        {(!!price.min || !!price.max || !!activeVariants.length) && (
          <Button
            variant="cta"
            sx={{
              borderColor: "secondary",
              color: "secondary",
              width: "max-content",
              ml: "auto",
            }}
            onClick={clearFiltersHandler}
          >
            Clear Filters x
          </Button>
        )}
      </Grid>

      {/* Price filter */}
      <Grid gap={2}>
        <Heading color="secondary" as="h3">
          Price (EGP)
        </Heading>
        <Flex sx={{ gap: "4px" }}>
          <Input
            type={"number"}
            name={`min_price`}
            placeholder={"Min"}
            sx={{ fontSize: "14px" }}
            variant="field"
            onChange={e => setPrice({ ...price, min: e.currentTarget.value })}
            value={price.min}
            min={0}
          />
          <Input
            type={"number"}
            name={`max_price`}
            placeholder={"Max"}
            sx={{ fontSize: "14px" }}
            variant="field"
            onChange={e => setPrice({ ...price, max: e.currentTarget.value })}
            value={price.max}
            min={0}
          />
        </Flex>
        <Button variant="cta">Go</Button>
      </Grid>

      {/* Variants filter */}
      <Grid sx={{ my: 3, gap: 2 }}>
        <Heading color="secondary" as="h3">
          Variants
        </Heading>
        <Flex sx={{ gap: "4px", mb: 2, flexWrap: "wrap" }}>
          {variants.map(variant => (
            <Button
              key={variant.split(" ").join("_")}
              variant="tags"
              sx={{
                cursor: "pointer",
                backgroundColor: activeVariants.find(v => v === variant)
                  ? "brand"
                  : "lightGrey",
                color: activeVariants.find(v => v === variant)
                  ? "lightGrey"
                  : "brand",
              }}
              onClick={() => toggleVariantHandler(variant)}
            >
              {variant}
            </Button>
          ))}
        </Flex>
      </Grid>
    </Flex>
  )
}

export default Filter
