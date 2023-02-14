// @ts-check

import { Box, Heading, Divider, Flex, Button, Link } from "@theme-ui/components"
import React from "react"
import NextLink from "next/link"
import Field from "../Field"
import FieldSplitter from "../Field/FieldSplitter"

const Register = ({ formik, handleSubmit }) => {
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
            value={formik.values.first_name}
            name={"first_name"}
            type="string"
            disabled={false}
          />
        }
        right={
          <Field
            formik={formik}
            placeholder={"Last name"}
            value={formik.values.last_name}
            name={"last_name"}
            type="string"
            disabled={false}
          />
        }
      />
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
            Register
          </Button>

          <NextLink href={"/login"} passHref>
            <Link sx={{ color: "secondary" }}>Login instead?</Link>
          </NextLink>
        </Flex>
      </Box>
    </Box>
  )
}

export default Register
