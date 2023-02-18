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
  Icon,
}) => {
  return (
    <div className="flex flex-col mb-3 w-full">
      <div className="relative">
        <Icon width={20} className="absolute text-brand top-1.5 left-1" />
        <input
          type={type}
          defaultValue={value}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          className={`formField w-full text-sm font-light pl-6 ${
            error ? "border-secondary" : "border-darkGrey"
          }`}
          {...register}
        />
      </div>

      {error && <p className="text-xs text-secondary">{error.message}</p>}
    </div>
  )
}

export default Field
