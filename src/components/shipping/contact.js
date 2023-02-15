// @ts-check
import React from "react"
import Field from "../Field/index"
import FieldSplitter from "../Field/FieldSplitter"

const Contact = ({ formik }) => {
  return (
    <form>
      <h3 className="mb-2 text-secondary">Contact</h3>
      <FieldSplitter
        left={
          <Field
            formik={formik}
            placeholder={"First name"}
            value={formik.values.contact.first_name}
            name={"contact.first_name"}
            error={
              formik.touched.contact?.first_name &&
              formik.errors.contact?.first_name
            }
          />
        }
        right={
          <Field
            formik={formik}
            placeholder={"Last name"}
            value={formik.values.contact.last_name}
            name={"contact.last_name"}
            error={
              formik.touched.contact?.last_name &&
              formik.errors.contact?.last_name
            }
          />
        }
      />
      <Field
        formik={formik}
        placeholder={"Email"}
        value={formik.values.contact.email}
        name={"contact.email"}
        error={formik.touched.contact?.email && formik.errors.contact?.email}
      />
      <Field
        formik={formik}
        placeholder={"Phone number"}
        value={formik.values.contact.phone}
        name={"contact.phone"}
        error={formik.touched.contact?.phone && formik.errors.contact?.phone}
      />
    </form>
  )
}

export default Contact
