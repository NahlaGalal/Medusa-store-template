// @ts-check
import React from "react"
import NextLink from "next/link"
import Field from "../Field"
import FieldSplitter from "../Field/FieldSplitter"
import {
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/20/solid"

const Register = ({ handleSubmit, register, errors }) => {
  return (
    <form>
      <h2 className="mb-4 text-brand text-2xl">Register</h2>
      <FieldSplitter
        left={
          <Field
            placeholder={"First name"}
            name={"first_name"}
            error={errors.first_name}
            register={register("first_name", {
              required: "This field is required",
            })}
            Icon={UserIcon}
          />
        }
        right={
          <Field
            placeholder={"Last name"}
            name={"last_name"}
            error={errors.last_name}
            register={register("last_name", {
              required: "This field is required",
            })}
            Icon={UserIcon}
          />
        }
      />
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
        Icon={EnvelopeIcon}
      />
      <Field
        placeholder={"Password"}
        name={"password"}
        type="password"
        error={errors.password}
        register={register("password", { required: "This field is required" })}
        Icon={LockClosedIcon}
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
