// @ts-check
import React from "react"
import Field from "../Field/index"
import FieldSplitter from "../Field/FieldSplitter"
import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/react/20/solid"

const Delivery = ({ fullCountry, register, errors }) => {
  return (
    <form>
      <h3 className="mb-2 text-secondary">Delivery address</h3>
      <Field
        placeholder={"Address"}
        name={"delivery.address_1"}
        error={errors.delivery?.address_1}
        register={register("delivery.address_1", {
          required: "This field is required",
        })}
        Icon={MapPinIcon}
      />
      <FieldSplitter
        left={
          <Field
            placeholder={"Postal code"}
            name={"delivery.postal_code"}
            error={errors.delivery?.postal_code}
            register={register("delivery.postal_code", {
              required: "This field is required",
            })}
            Icon={MapPinIcon}
          />
        }
        right={
          <Field
            placeholder={"City"}
            name={"delivery.city"}
            error={errors.delivery?.city}
            register={register("delivery.city", {
              required: "This field is required",
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
