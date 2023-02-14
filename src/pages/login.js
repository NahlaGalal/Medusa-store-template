// @ts-check

import { useFormik } from "formik"
import React, { useContext } from "react"
import { Container } from "theme-ui"
import { useRouter } from "next/router"
import * as Yup from "yup"
import Login from "../components/Registeration/Login"
import { client } from "../utils/client"
import { PublicContext } from "../context/publicContext"
import { getTokenCookie } from "../utils/cookie"

const LoginPage = ({ cartId }) => {
  const router = useRouter()
  const { setLoading, setIsRegistered } = useContext(PublicContext)

  const handleSubmit = e => {
    e.preventDefault()
    formik.submitForm()
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please provide a valid email address")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async ({ email, password }) => {
      setLoading(true)

      try {
        const res = await client.auth.authenticate({ email, password })

        if (res.response.status === 200) {
          localStorage.setItem("id", res.customer.id)

          if (cartId)
            await client.carts.update(cartId, { customer_id: res.customer.id })
          setIsRegistered(true)
          router.push("/")
        }
      } catch (err) {
        if (err.response.status === 401) {
          formik.setErrors({
            email: "Email or password is incorrect",
          })
          setLoading(false)
        }
      }
    },
  })

  return (
    <Container sx={{ maxWidth: "80%", mt: 40 }}>
      <Login formik={formik} handleSubmit={handleSubmit} />
    </Container>
  )
}

export async function getServerSideProps({ req }) {
  let cartId = getTokenCookie(req, "cart_id") || null

  return { props: { cartId } }
}

export default LoginPage
