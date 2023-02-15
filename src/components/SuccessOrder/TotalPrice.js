// @ts-check
import React from "react"
import { formatAmount } from "medusa-react"

const TotalPrice = ({ cart }) => {
  return (
    <section className="mt-4 mb-2 py-4 border-y border-y-lightGrey">
      <div className="flex justify-between text-xs">
        <p className="text-darkGrey">Subtotal</p>
        <p>{formatAmount({ amount: cart.subtotal, region: cart.region })}</p>
      </div>

      <div className="flex justify-between my-2 text-xs">
        <p className="text-darkGrey">Shipping</p>
        <p>
          {formatAmount({ amount: cart.shipping_total, region: cart.region })}
        </p>
      </div>

      <div className="flex justify-between text-xs">
        <p className="text-darkGrey">Total</p>
        <p>{formatAmount({ amount: cart.total, region: cart.region })}</p>
      </div>
    </section>
  )
}

export default TotalPrice
