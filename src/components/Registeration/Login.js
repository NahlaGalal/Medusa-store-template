// @ts-check
import React from "react"
import NextLink from "next/link"
import Field from "../Field"

const Login = ({ register, handleSubmit, errors }) => {
  return (
    <form>
      <h2 className="mb-4 text-brand text-2xl">Login</h2>
      <Field
        placeholder={"Email"}
        name={"email"}
        type="email"
        error={errors.email}
        register={register("email", {
          required: "This field is required",
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Please provide a valid email address",
          },
        })}
      />
      <Field
        placeholder={"Password"}
        name={"password"}
        type="password"
        error={errors.password}
        register={register("password", {
          required: "This field is required",
        })}
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
