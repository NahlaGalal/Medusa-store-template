// @ts-check
import React from "react"

const ReviewAddress = ({ delivery, displayCountry }) => {
  return (
    <div className="pb-4 pt-2">
      <h3 className="mb-2 text-secondary">Delivery</h3>
      <p className="text-darkGrey py-1 text-xs font-light">
        {delivery.address_1}
      </p>
      <p className="text-darkGrey text-xs font-light">
        {`${delivery.postal_code}, ${delivery.city}`}
      </p>
      <p className="text-darkGrey py-1 text-xs font-light">{displayCountry}</p>
    </div>
  )
}

export default ReviewAddress
