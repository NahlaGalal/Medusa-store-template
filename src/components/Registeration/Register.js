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
import translations from "../../translations/registeration.json"

const Register = ({ handleSubmit, register, errors, locale }) => {
  return (
    <form>
      <h2 className="mb-4 text-brand text-2xl">
        {translations[locale].register}
      </h2>
      <FieldSplitter
        left={
          <Field
            placeholder={translations[locale].first_name}
            name={"first_name"}
            error={errors.first_name}
            register={register("first_name", {
              required: translations[locale].required_field,
            })}
            Icon={UserIcon}
          />
        }
        right={
          <Field
            placeholder={translations[locale].last_name}
            name={"last_name"}
            error={errors.last_name}
            register={register("last_name", {
              required: translations[locale].required_field,
            })}
            Icon={UserIcon}
          />
        }
      />
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
        <button onClick={handleSubmit}>{translations[locale].register}</button>

        <NextLink href={"/login"} passHref>
          <a className="text-secondary">{translations[locale].login_instead}</a>
        </NextLink>
      </div>
    </form>
  )
}

export default Register
