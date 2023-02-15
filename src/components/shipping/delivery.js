// @ts-check
import React, { useEffect, useState } from "react"
import Field from "../Field/index"
import FieldSplitter from "../Field/FieldSplitter"

const Delivery = ({ formik, region, country }) => {
  const [fullCountry, setFullCountry] = useState("")

  useEffect(() => {
    formik.setFieldValue("delivery.country_code", country)
    setFullCountry(region.countries.find(c => c.iso_2 === country).display_name)
  }, [country])

  return (
    <form>
      <h3 className="mb-2 text-secondary">Delivery address</h3>
      <Field
        formik={formik}
        placeholder={"Address"}
        value={formik.values.delivery.address_1}
        name={"delivery.address_1"}
        error={
          formik.touched.delivery?.address_1 &&
          formik.errors.delivery?.address_1
        }
      />
      <FieldSplitter
        left={
          <Field
            formik={formik}
            placeholder={"Postal code"}
            value={formik.values.delivery.postal_code}
            name={"delivery.postal_code"}
            error={
              formik.touched.delivery?.postal_code &&
              formik.errors.delivery?.postal_code
            }
          />
        }
        right={
          <Field
            formik={formik}
            placeholder={"City"}
            value={formik.values.delivery.city}
            name={"delivery.city"}
            error={
              formik.touched.delivery?.city && formik.errors.delivery?.city
            }
          />
        }
      />
      <Field
        formik={formik}
        value={fullCountry}
        disabled={true}
        name="country"
        placeholder={""}
        error=""
      />
    </form>
  )
}

export default Delivery
