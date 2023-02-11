// @ts-check
import { Box, Button, Heading } from "@theme-ui/components"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import * as Yup from "yup"
import Contact from "./contact"
import Delivery from "./delivery"

const Forms = ({ country, region, customer, cart, createOrder }) => {
  const handleSubmit = e => {
    e.preventDefault()
    formik.submitForm()
  }

  const formik = useFormik({
    initialValues: {
      contact: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      delivery: {
        address_1: "",
        postal_code: "",
        city: "",
        country_code: "",
      },
    },
    validationSchema: Yup.object({
      contact: Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string()
          .email("Please provide a valid email address")
          .required("Required"),
        phone: Yup.string().optional(),
      }),
      delivery: Yup.object({
        address_1: Yup.string().required("Required"),
        postal_code: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        country_code: Yup.string().required("Required"),
      }),
    }),
    onSubmit: ({ contact, delivery }) => createOrder({ contact, delivery }),
  })

  useEffect(() => {
    formik.setValues({
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
        country_code: cart?.shipping_address?.country_code || "",
      },
    })
  }, [])

  return (
    <Box sx={{ my: 4 }}>
      <Heading sx={{ textAlign: "center", color: "brand" }}>
        Shipping and info
      </Heading>
      <Box mb={4} sx={{ mb: 4, mt: "16px" }}>
        <Contact formik={formik} />
      </Box>

      <Box pt={1}>
        <Delivery region={region} country={country} formik={formik} />
      </Box>

      <Box>
        <Button
          onClick={handleSubmit}
          variant="cta"
          sx={{
            color: "white",
            backgroundColor: "brand",
            margin: "auto",
            display: "block",
          }}
        >
          Confirm order
        </Button>
      </Box>
    </Box>
  )
}

export default Forms
