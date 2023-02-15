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
