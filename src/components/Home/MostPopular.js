// @ts-check
import React from "react"
import { Container, Heading, Grid, Flex } from "theme-ui"
import Product from "../ProductCard"

const MostPopular = ({ products }) => {
  return (
    <Container variant="layout.container" my={5} as="section">
      <Heading as="h2" sx={{ textAlign: "center", color: "secondary" }} mb={3}>
        Most popular products
      </Heading>

      <Grid columns={[1, 2, 4]} gap={24} my={4}>
        {products.map(product => (
          <Flex
            variant="layout.stepContainer"
            key={product.id}
            sx={{ justifyContent: "center" }}
          >
            <Product hit={product} />
          </Flex>
        ))}
      </Grid>
    </Container>
  )
}

export default MostPopular
