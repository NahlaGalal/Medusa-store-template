// @ts-check
import { useForm } from "react-hook-form"
import React from "react"
import Contact from "./Contact"
import Delivery from "./Delivery"
import translations from "../../translations/shipping.json"

const Forms = ({ country, region, customer, cart, createOrder, locale }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact: {
        first_name:
          cart?.shipping_address?.first_name || customer.first_name || "",
        last_name:
          cart?.shipping_address?.last_name || customer.last_name || "",
        email: cart?.email || customer.email || "",
        phone: cart.shipping_address?.phone || customer.phone || "",
      },
      delivery: {
        address_1: cart?.shipping_address?.address_1 || "",
        postal_code: cart?.shipping_address?.postal_code || "",
        city: cart?.shipping_address?.city || "",
        country_code: cart?.shipping_address?.country_code || country,
      },
    },
  })

  const onSubmit = async data => {
    const { contact, delivery } = data
    createOrder({ contact, delivery })
  }

  return (
    <section className="my-16">
      <h2 className="text-center text-2xl text-brand font-bold">
        {translations[locale].shipping_n_info}
      </h2>

      <div className="mb-8 mt-4">
        <Contact
          register={register}
          errors={errors}
          title={translations[locale].contact}
          locale={locale}
        />
      </div>

      <div className="pt-1">
        <Delivery
          register={register}
          errors={errors}
          fullCountry={
            region.countries.find(c => c.iso_2 === country).display_name
          }
          title={translations[locale].delivery_address}
          locale={locale}
        />
      </div>

      <div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="buttonCta text-white bg-brand m-auto block"
        >
          {translations[locale].confirm_order}
        </button>
      </div>
    </section>
  )
}

export default Forms
