// @ts-check
import React from "react"
import translations from "../../translations/home.json"

const AboutUs = ({ locale }) => {
  return (
    <section
      className="[ flex items-center ] min-h-screen
    [ bg-no-repeat bg-cover bg-home_section bg-fixed ]"
    >
      <div
        className="layoutContainer 
      [ py-16 px-4 my-16 ] 
      [ bg-white bg-opacity-50 ] 
      h-[calc(100%_-_80px)] 
      [ flex flex-col justify-center ]"
      >
        <h2 className="text-center text-secondary mb-8 text-2xl font-bold">
          {translations[locale].about_us}
        </h2>
        <h3 className="mb-4 text-brand text-center font-semibold">
          {translations[locale].about_sub_header}
        </h3>

        <p className="mb-4 w-full md:w-1/2 mx-auto text-center">
          {translations[locale].about_paragraph}
        </p>

        <p className="w-full md:w-1/2 mx-auto text-center">
          {translations[locale].about_paragraph}
        </p>
      </div>
    </section>
  )
}

export default AboutUs
