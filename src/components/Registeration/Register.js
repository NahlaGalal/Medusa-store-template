// @ts-check
import React from "react"
import NextLink from "next/link"
import Field from "../Field"
import FieldSplitter from "../Field/FieldSplitter"

const Register = ({ formik, handleSubmit }) => {
  return (
    <form>
      <h2 className="mb-4 text-brand text-2xl">Register</h2>
      <FieldSplitter
        left={
          <Field
            formik={formik}
            placeholder={"First name"}
            value={formik.values.first_name}
            name={"first_name"}
            error={formik.touched.first_name && formik.errors.first_name}
          />
        }
        right={
          <Field
            formik={formik}
            placeholder={"Last name"}
            value={formik.values.last_name}
            name={"last_name"}
            error={formik.touched.last_name && formik.errors.last_name}
          />
        }
      />
      <Field
        formik={formik}
        placeholder={"Email"}
        value={formik.values.email}
        name={"email"}
        type="email"
        error={formik.touched.email && formik.errors.email}
      />
      <Field
        formik={formik}
        placeholder={"Password"}
        value={formik.values.password}
        name={"password"}
        type="password"
        error={formik.touched.password && formik.errors.password}
      />

      <hr className="border-t-lightGrey my-4" />

      <div className="flex items-center justify-between flex-wrap">
        <button onClick={handleSubmit}>Register</button>

        <NextLink href={"/login"} passHref>
          <a className="text-secondary">Login instead?</a>
        </NextLink>
      </div>
    </form>
  )
}

export default Register
