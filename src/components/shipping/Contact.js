// @ts-check
import React from "react"
import Field from "../Field/index"
import FieldSplitter from "../Field/FieldSplitter"

const Contact = ({ register, errors }) => {
  return (
    <form>
      <h3 className="mb-2 text-secondary">Contact</h3>
      <FieldSplitter
        left={
          <Field
            placeholder={"First name"}
            name={"contact.first_name"}
            error={errors.contact?.first_name}
            register={register("contact.first_name", {
              required: "This field is required",
            })}
          />
        }
        right={
          <Field
            placeholder={"Last name"}
            name={"contact.last_name"}
            error={errors.contact?.last_name}
            register={register("contact.last_name", {
              required: "This field is required",
            })}
          />
        }
      />
      <Field
        placeholder={"Email"}
        name={"contact.email"}
        error={errors.contact?.email}
        register={register("contact.email", {
          required: "This field is required",
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Please provide a valid email address",
          },
        })}
      />
      <Field
        placeholder={"Phone number"}
        name={"contact.phone"}
        error={errors.contact?.phone}
        register={register("contact.phone")}
      />
    </form>
  )
}

export default Contact
