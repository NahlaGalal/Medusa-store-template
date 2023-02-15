// @ts-check
import React from "react"

const ReviewProducts = ({ cart }) => {
  return (
    <section>
      {cart.items.map(item => (
        <div key={item.id} className="flex">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-24 w-1/2 rounded object-contain object-center"
          />
          <div className="flex-1 font-medium text-sm pl-5">
            <p className="font-medium mb-3">{item.title}</p>

            <div className="flex w-full font-light justify-between">
              <p className="mb-4 text-darkBlack">
                <span className="text-darkGrey">Variant: </span>
                {item.variant.title}
              </p>
            </div>

            <p className="font-light text-darkBlack">
              <span className="text-darkGrey">Quantity: </span>
              {item.quantity}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default ReviewProducts
