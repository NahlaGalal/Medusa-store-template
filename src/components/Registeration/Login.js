// @ts-check
import React from "react"
import NextLink from "next/link"
import Field from "../Field"

const Login = ({ formik, handleSubmit }) => {
  return (
    <form>
      <h2 className="mb-4 text-brand text-2xl">Login</h2>
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
        <button onClick={handleSubmit}>Login</button>

        <NextLink href={"/register"} passHref>
          <a className="text-secondary">Register instead?</a>
        </NextLink>
      </div>
    </form>
  )
}

export default Login
