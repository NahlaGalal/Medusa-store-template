// @ts-check

import { Box, Heading } from "@theme-ui/components"
import React from "react"
import Field from "./field"

const Login = ({ formik }) => {
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
        value={formik.values.login.email}
        name={"email"}
        set={"login"}
        type="email"
        disabled={false}
      />
      <Field
        formik={formik}
        placeholder={"Password"}
        value={formik.values.login.password}
        name={"password"}
        set={"login"}
        type="password"
        disabled={false}
      />
    </Box>
  )
}

export default Login
