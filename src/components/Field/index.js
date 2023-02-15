// @ts-check
import React from "react"

const Field = ({
  formik,
  value,
  name,
  placeholder,
  error,
  disabled = false,
  type = "text",
}) => {
  return (
    <div className="flex flex-col mb-3 w-full">
      <input
        type={type}
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
