// @ts-check

import { useFormik } from "formik"
import React, { useState } from "react"
import { Box, Button, Container, Divider, Flex, Link } from "theme-ui"
import { useRouter } from "next/router"
import NextLink from "next/link"
import * as Yup from "yup"
import Layout from "../components/layout/layout"
import Spinner from "../components/spinner/spinner"
import Login from "../components/shipping/forms/login"
import { client } from "../utils/client"

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    formik.submitForm()
  }

  const formik = useFormik({
    initialValues: {
      login: {
        email: "",
        password: "",
      },
    },
    validationSchema: Yup.object({
      login: Yup.object({
        email: Yup.string()
          .email("Please provide a valid email address")
          .required("Required"),
        password: Yup.string().required("Required"),
      }),
    }),
    onSubmit: async values => {
      setLoading(true)

      const {
        login: { email, password },
      } = values
      try {
        const res = await client.auth.authenticate({ email, password })

        if (res.response.status === 200) {
          localStorage.setItem("id", res.customer.id)
          router.push("/")
        }
      } catch (err) {
        console.log(err)
      }
    },
  })

  return (
    <Layout>
      <Container sx={{ maxWidth: "80%", mt: 40 }}>
        {loading && <Spinner />}
        <Login formik={formik} />

        <Box>
          <Divider sx={{ color: "#E5E7EB", my: "16px" }} />
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={handleSubmit}
              color="darkBlack"
              backgroundColor={"brand"}
              sx={{ cursor: "pointer" }}
            >
              Login
            </Button>

            <NextLink href={"/register"} passHref>
              <Link sx={{ color: "secondary" }}>Register instead?</Link>
            </NextLink>
          </Flex>
        </Box>
      </Container>
    </Layout>
  )
}

export default LoginPage
