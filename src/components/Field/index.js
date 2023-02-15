// @ts-check
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
    <div className="flex flex-col mb-3 w-full">
      <input
        type={type || "text"}
        defaultValue={value}
        disabled={disabled}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder={placeholder}
        className={`formField text-sm font-light ${
          error ? "border-secondary" : "border-darkGrey"
        }`}
      />

      {error && <p className="text-xs text-secondary">{error}</p>}
    </div>
  )
}

export default Field
