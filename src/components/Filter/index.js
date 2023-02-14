// @ts-check
import React from "react"
import { Flex, Grid, Heading } from "theme-ui"
import { RefinementList } from "react-instantsearch-dom"
import CustomRangeInput from "./RangeInput"

const Filter = () => {
  return (
    <Flex sx={{ flexDirection: "column", flex: 1 }} as="aside">
      <Grid as="header" mb={4} gap={2}>
        <Heading color="brand">Filter</Heading>
      </Grid>

      {/* Price range */}
      <Grid sx={{ gap: 2 }}>
        <Heading color="secondary" as="h3">
          Price (EGP)
        </Heading>

        <CustomRangeInput attribute={"variants.prices.amount"} />
      </Grid>

      {/* Variants filter */}
      <Grid sx={{ my: 3, gap: 2 }}>
        <Heading color="secondary" as="h3">
          Variants
        </Heading>
        <RefinementList attribute="variant_title" />
      </Grid>

      {/* Tags filter */}
      <Grid sx={{ gap: 2 }}>
        <Heading color="secondary" as="h3">
          Tags
        </Heading>
        <RefinementList attribute="tags.value" />
      </Grid>
    </Flex>
  )
}

export default Filter
