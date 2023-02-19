// @ts-check
import React from "react"
import { formatAmount } from "medusa-react"
import translations from "../../translations/success.json"

const TotalPrice = ({ cart, locale }) => {
  return (
    <section className="mt-4 mb-2 py-4 border-y border-y-lightGrey">
      <div className="flex justify-between text-xs">
        <p className="text-darkGrey">{translations[locale].sub_total}</p>
        <p>
          {formatAmount({ amount: cart.subtotal, region: cart.region, locale })}
        </p>
      </div>

      <div className="flex justify-between my-2 text-xs">
        <p className="text-darkGrey">{translations[locale].shipping}</p>
        <p>
          {formatAmount({
            amount: cart.shipping_total,
            region: cart.region,
            locale,
          })}
        </p>
      </div>

      <div className="flex justify-between text-xs">
        <p className="text-darkGrey">{translations[locale].total}</p>
        <p>
          {formatAmount({ amount: cart.total, region: cart.region, locale })}
        </p>
      </div>
    </section>
  )
}

export default TotalPrice
