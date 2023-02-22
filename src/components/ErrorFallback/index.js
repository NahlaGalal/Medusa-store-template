import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import ErrorImage from "../../../public/error-image.svg"
import translations from "../../translations/error.json"

const ErrorFallback = ({ resetErrorBoundary = () => {} }) => {
  const { locale } = useRouter()

  return (
    <div className="my-10 w-4/5 mx-auto text-center">
      <Image
        src={ErrorImage}
        alt="Error image"
        height={"300px"}
        width="300px"
      />
      <h1 className="text-5xl sm:text-9xl text-secondary mb-10">OPPS</h1>
      <p className="text-2xl mb-10">{translations[locale].there_is_error}</p>
      <p className="text-base mb-10">{translations[locale].navigate_page}</p>
      <button onClick={resetErrorBoundary}>
        {translations[locale].try_again}
      </button>
    </div>
  )
}

export default ErrorFallback
