// @ts-check

import { Box, Heading } from "@theme-ui/components"
import React from "react"
import Field from "./field"
import FieldSplitter from "./field-splitter"

const Register = ({ formik }) => {
  return (
    <Box as="form">
      <Heading
        sx={{
          mb: "8px",
          color: "secondary",
        }}
      >
        Register
      </Heading>
      <FieldSplitter
        left={
          <Field
            formik={formik}
            placeholder={"First name"}
            value={formik.values.register.first_name}
            name={"first_name"}
            set={"register"}
            type="string"
            disabled={false}
          />
        }
        right={
          <Field
            formik={formik}
            placeholder={"Last name"}
            value={formik.values.register.last_name}
            name={"last_name"}
            set={"register"}
            type="string"
            disabled={false}
          />
        }
      />
      <Field
        formik={formik}
        placeholder={"Email"}
        value={formik.values.register.email}
        name={"email"}
        set={"register"}
        type="email"
        disabled={false}
      />
      <Field
        formik={formik}
        placeholder={"Password"}
        value={formik.values.register.password}
        name={"password"}
        set={"register"}
        type="password"
        disabled={false}
      />
    </Box>
  )
}

export default Register
