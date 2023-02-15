// @ts-check
import React from "react"
import Product from "../ProductCard"

const MostPopular = ({ products }) => {
  return (
    <section className="layoutContainer my-16">
      <h2 className="text-center text-secondary mb-4">Most popular products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-8">
        {products.map(product => (
          <div key={product.id} className="flex justify-center stepContainer">
            <Product hit={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MostPopular
