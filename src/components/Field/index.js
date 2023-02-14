// @ts-check

import { Flex, Input, Text } from "@theme-ui/components"
import React, { useEffect, useState } from "react"

const Field = ({ formik, value, name, placeholder, disabled, type }) => {
  const [error, setError] = useState("")

  useEffect(() => {
    if (formik.errors[name] && formik.touched[name]) {
      setError(formik.errors[name])
    } else {
      setError("")
    }
  }, [formik.errors, formik.touched, name])

  return (
    <Flex
      sx={{
        flexDirection: "column",
        mb: ".75em",
        width: "100%",
      }}
    >
      <Input
        type={type || "text"}
        defaultValue={value}
        disabled={disabled}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder={placeholder}
        sx={{
          borderColor: error ? "secondary" : "darkGrey",
          fontSize: "14px",
          fontWeight: 300,
        }}
        variant="field"
      />
      {error && <Text sx={{ fontSize: 13, color: "secondary" }}>{error}</Text>}
    </Flex>
  )
}

export default Field
