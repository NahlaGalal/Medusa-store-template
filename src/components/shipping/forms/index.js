// @ts-check
import { Box, Button, Divider, Heading, Spinner } from "@theme-ui/components"
import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useRouter } from "next/router"
import Contact from "./contact"
import Delivery from "./delivery"
import { client } from "../../../utils/client"

const Forms = ({ country, region, customer, cart, cartId }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
        shipping_option: "",
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
        shipping_option: Yup.string().required("Required"),
      }),
    }),
    onSubmit: async values => {
      setLoading(true)

      const { delivery, contact } = values

      return client.carts
        .update(cartId, {
          email: contact.email,
          shipping_address: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            address_1: delivery.address_1,
            country_code: delivery.country_code,
            postal_code: delivery.postal_code,
            city: delivery.city,
            phone: contact.phone,
          },
        })
        .then(() => {
          return client.carts.addShippingMethod(cartId, {
            option_id: delivery.shipping_option,
          })
        })
        .finally(() => {
          setLoading(false)
          router.push("/payment")
        })
    },
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
        shipping_option: cart?.shipping_methods?.[0]?.shipping_option_id || "",
      },
    })
  }, [])

  return loading ? (
    <Spinner
      sx={{
        margin: "auto",
        width: 100,
        height: 100,
        color: "brand",
        display: "block",
      }}
    />
  ) : (
    <Box sx={{ my: 4 }}>
      <Heading sx={{ textAlign: "center", color: "brand" }}>
        Shipping and info
      </Heading>
      <Box mb={4} sx={{ mb: 4, mt: "16px" }}>
        <Contact formik={formik} />
      </Box>

      <Box pt={1}>
        <Delivery
          region={region}
          country={country}
          formik={formik}
          setLoading={setLoading}
          cartId={cartId}
        />
      </Box>

      <Box>
        <Divider sx={{ color: "#E5E7EB", my: "16px" }} />
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
          Get shipping methods
        </Button>
      </Box>
    </Box>
  )
}

export default Forms
