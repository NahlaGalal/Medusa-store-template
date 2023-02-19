// @ts-check
import React from "react"
import NextLink from "next/link"
import Field from "../Field"
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/20/solid"
import translations from "../../translations/registeration.json"

const Login = ({ register, handleSubmit, errors, locale }) => {
  return (
    <form>
      <h2 className="mb-4 text-brand text-2xl">{translations[locale].login}</h2>
      <Field
        placeholder={translations[locale].email}
        name={"email"}
        type="email"
        error={errors.email}
        register={register("email", {
          required: translations[locale].required_field,
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: translations[locale].email_validation,
          },
        })}
        Icon={EnvelopeIcon}
      />
      <Field
        placeholder={translations[locale].password}
        name={"password"}
        type="password"
        error={errors.password}
        register={register("password", {
          required: translations[locale].required_field,
        })}
        Icon={LockClosedIcon}
      />

      <hr className="border-t-lightGrey my-4" />

      <div className="flex items-center justify-between flex-wrap">
        <button onClick={handleSubmit}>{translations[locale].login}</button>

        <NextLink href={"/register"} passHref>
          <a className="text-secondary">
            {translations[locale].register_instead}
          </a>
        </NextLink>
      </div>
    </form>
  )
}

export default Login
