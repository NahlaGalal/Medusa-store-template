// @ts-check

import { useFormik } from "formik"
import React, { useContext } from "react"
import { Box, Button, Container, Divider, Flex, Link } from "theme-ui"
import { useCreateCustomer } from "medusa-react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import * as Yup from "yup"
import Register from "../components/shipping/forms/register"
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
      register: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    },
    validationSchema: Yup.object({
      register: Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string()
          .email("Please provide a valid email address")
          .required("Required"),
        password: Yup.string().required("Required"),
      }),
    }),
    onSubmit: async values => {
      setLoading(true)

      const { register } = values
      const res = await createCustomer.mutateAsync({ ...register })
      if (res.response.status === 200) router.push("/login")
    },
  })

  return (
    <Container sx={{ maxWidth: "80%", mt: 40 }}>
      <Register formik={formik} />

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
            color="white"
            backgroundColor={"brand"}
            sx={{ cursor: "pointer" }}
          >
            Register
          </Button>

          <NextLink href={"/login"} passHref>
            <Link sx={{ color: "secondary" }}>Login instead?</Link>
          </NextLink>
        </Flex>
      </Box>
    </Container>
  )
}

export default RegisterPage
