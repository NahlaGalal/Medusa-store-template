// @ts-check
import React from "react"
import Field from "../Field/index"
import FieldSplitter from "../Field/FieldSplitter"
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid"
import translations from "../../translations/registeration.json"

const Contact = ({ register, errors, title, locale }) => {
  return (
    <form>
      <h3 className="mb-2 text-secondary font-semibold">{title}</h3>
      <FieldSplitter
        left={
          <Field
            placeholder={translations[locale].first_name}
            name={"contact.first_name"}
            error={errors.contact?.first_name}
            register={register("contact.first_name", {
              required: translations[locale].required_field,
            })}
            Icon={UserIcon}
          />
        }
        right={
          <Field
            placeholder={translations[locale].last_name}
            name={"contact.last_name"}
            error={errors.contact?.last_name}
            register={register("contact.last_name", {
              required: translations[locale].required_field,
            })}
            Icon={UserIcon}
          />
        }
      />
      <Field
        placeholder={translations[locale].email}
        name={"contact.email"}
        error={errors.contact?.email}
        register={register("contact.email", {
          required: translations[locale].required_field,
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: translations[locale].email_validation,
          },
        })}
        Icon={EnvelopeIcon}
      />
      <Field
        placeholder={translations[locale].phone}
        name={"contact.phone"}
        error={errors.contact?.phone}
        register={register("contact.phone")}
        Icon={PhoneIcon}
      />
    </form>
  )
}

export default Contact
