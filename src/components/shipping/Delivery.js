// @ts-check
import React from "react"
import Field from "../Field/index"
import FieldSplitter from "../Field/FieldSplitter"
import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/react/20/solid"
import translations from "../../translations/registeration.json"

const Delivery = ({ fullCountry, register, errors, title, locale }) => {
  return (
    <form>
      <h3 className="mb-2 text-secondary font-semibold">{title}</h3>
      <Field
        placeholder={translations[locale].address}
        name={"delivery.address_1"}
        error={errors.delivery?.address_1}
        register={register("delivery.address_1", {
          required: translations[locale].required_field,
        })}
        Icon={MapPinIcon}
      />
      <FieldSplitter
        left={
          <Field
            placeholder={translations[locale].postal_code}
            name={"delivery.postal_code"}
            error={errors.delivery?.postal_code}
            register={register("delivery.postal_code", {
              required: translations[locale].required_field,
            })}
            Icon={MapPinIcon}
          />
        }
        right={
          <Field
            placeholder={translations[locale].city}
            name={"delivery.city"}
            error={errors.delivery?.city}
            register={register("delivery.city", {
              required: translations[locale].required_field,
            })}
            Icon={BuildingOffice2Icon}
          />
        }
      />
      <Field
        value={fullCountry}
        disabled={true}
        name="country"
        placeholder={""}
        error=""
        register={{}}
        Icon={BuildingOffice2Icon}
      />
    </form>
  )
}

export default Delivery
