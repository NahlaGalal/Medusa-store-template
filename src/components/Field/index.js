// @ts-check
import React from "react"

const Field = ({
  value = "",
  name,
  placeholder,
  error,
  disabled = false,
  type = "text",
  register,
}) => {
  return (
    <div className="flex flex-col mb-3 w-full">
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        className={`formField text-sm font-light ${
          error ? "border-secondary" : "border-darkGrey"
        }`}
        {...register}
      />

      {error && <p className="text-xs text-secondary">{error.message}</p>}
    </div>
  )
}

export default Field
