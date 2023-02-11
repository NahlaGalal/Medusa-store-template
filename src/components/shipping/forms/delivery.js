import { Box, Heading } from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import Field from "./field"
import FieldSplitter from "./field-splitter"

const Delivery = ({
  formik,
  region,
  country,
}) => {
  const [fullCountry, setFullCountry] = useState("")

  useEffect(() => {
    formik.setFieldValue("delivery.country_code", country)
    setFullCountry(region.countries.find(c => c.iso_2 === country).display_name)
  }, [country])

  return (
    <Box as="form">
      <Heading as="h3" sx={{ mb: "8px", color: "secondary" }}>
        Delivery address
      </Heading>
      <>
        <Field
          formik={formik}
          placeholder={"Address"}
          value={formik.values.delivery.address_1}
          name={"address_1"}
          set={"delivery"}
        />
        <FieldSplitter
          left={
            <Field
              formik={formik}
              placeholder={"Postal code"}
              value={formik.values.delivery.postal_code}
              name={"postal_code"}
              set={"delivery"}
            />
          }
          right={
            <Field
              formik={formik}
              placeholder={"City"}
              value={formik.values.delivery.city}
              name={"city"}
              set={"delivery"}
            />
          }
        />
        <Field formik={formik} value={fullCountry} disabled={true} />
      </>
    </Box>
  )
}

export default Delivery
