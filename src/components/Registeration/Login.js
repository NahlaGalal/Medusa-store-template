// @ts-check

import { Box, Button, Divider, Flex, Heading, Link } from "@theme-ui/components"
import React from "react"
import NextLink from "next/link"
import Field from "../Field"

const Login = ({ formik, handleSubmit }) => {
  return (
    <Box as="form">
      <Heading
        sx={{
          mb: "8px",
          color: "secondary",
        }}
      >
        Login
      </Heading>
      <Field
        formik={formik}
        placeholder={"Email"}
        value={formik.values.email}
        name={"email"}
        type="email"
        disabled={false}
      />
      <Field
        formik={formik}
        placeholder={"Password"}
        value={formik.values.password}
        name={"password"}
        type="password"
        disabled={false}
      />
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
            Login
          </Button>

          <NextLink href={"/register"} passHref>
            <Link sx={{ color: "secondary" }}>Register instead?</Link>
          </NextLink>
        </Flex>
      </Box>
    </Box>
  )
}

export default Login
