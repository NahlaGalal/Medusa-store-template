// @ts-check
import React from "react"
import translations from "../../translations/home.json"

const Features = ({ locale }) => {
  return (
    <section className="layoutContainer mt-16">
      <div className="flex flex-col md:flex-row gap-y-8">
        <div className="flex-1">
          <p className="text-darkGrey text-center italic mb-2">
            {translations[locale].satisfication}
          </p>
          <p className="text-center text-2xl">
            {translations[locale].guaranteed}
          </p>
        </div>

        <div className="flex-1 border-lightGrey border-0 md:border-x">
          <p className="text-darkGrey text-center italic mb-2">
            {translations[locale].on_all_offers}
          </p>
          <p className="text-center text-2xl">
            {translations[locale].free_Shipping}
          </p>
        </div>

        <div className="flex-1">
          <p className="text-darkGrey text-center italic mb-2">
            {translations[locale].only_in_30_days}
          </p>
          <p className="text-center text-2xl">
            {translations[locale].free_returns}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features
