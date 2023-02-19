// @ts-check
import React from "react"
import Product from "../ProductCard"
import translations from "../../translations/home.json"

const MostPopular = ({ products, locale }) => {
  return (
    <section className="layoutContainer my-16">
      <h2 className="text-center text-secondary mb-4 text-2xl font-bold">
        {translations[locale].most_popular_products}
      </h2>

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
