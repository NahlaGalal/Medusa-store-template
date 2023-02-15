// @ts-check
import React from "react"

const Features = () => {
  return (
    <section className="layoutContainer mt-16">
      <div className="flex flex-col md:flex-row gap-y-8">
        <div className="flex-1">
          <p className="text-darkGrey text-center italic mb-2">
            Satisfaction is
          </p>
          <p className="text-center text-2xl">100% Guaranteed</p>
        </div>

        <div className="flex-1 border-lightGrey border-0 md:border-x">
          <p className="text-darkGrey text-center italic mb-2">
            On all standard offers
          </p>
          <p className="text-center text-2xl">Free Shipping</p>
        </div>

        <div className="flex-1">
          <p className="text-darkGrey text-center italic mb-2">
            Only in 30 days
          </p>
          <p className="text-center text-2xl">Free Returns</p>
        </div>
      </div>
    </section>
  )
}

export default Features
