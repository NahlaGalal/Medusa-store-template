// @ts-check

import { useFormik } from "formik"
import React, { useContext } from "react"
import { Container } from "theme-ui"
import { useCreateCustomer } from "medusa-react"
import { useRouter } from "next/router"
import * as Yup from "yup"
import Register from "../components/Registeration/Register"
import { PublicContext } from "../context/publicContext"

const RegisterPage = () => {
  const createCustomer = useCreateCustomer()
  const router = useRouter()
  const { setLoading } = useContext(PublicContext)

  const handleSubmit = e => {
    e.preventDefault()
    formik.submitForm()
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string()
        .email("Please provide a valid email address")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async ({ first_name, last_name, email, password }) => {
      setLoading(true)

      try {
        const res = await createCustomer.mutateAsync({
          first_name,
          last_name,
          email,
          password,
        })
        if (res.response.status === 200) router.push("/login")
      } catch (err) { 
        if (err.response.status === 422) {
          formik.setErrors({
            email: err.response.data.message,
          })
          setLoading(false)
        }
      }
    },
  })

  return (
    <Container sx={{ maxWidth: "80%", mt: 40 }}>
      <Register formik={formik} handleSubmit={handleSubmit} />
    </Container>
  )
}

export default RegisterPage
