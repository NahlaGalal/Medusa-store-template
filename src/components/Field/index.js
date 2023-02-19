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
        <Icon width={20} className="absolute text-brand top-1.5 ltr:left-1 rtl:right-1" />
        <input
          type={type}
          defaultValue={value}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          className={`formField w-full text-sm font-light ltr:pl-6 rtl:pr-6 ${
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
