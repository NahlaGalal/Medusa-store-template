import React from "react"
import Image from "next/image"
import ErrorImage from "../../../public/error-image.svg"

const ErrorFallback = ({ resetErrorBoundary = () => {} }) => {
  return (
    <div className="my-10 w-4/5 mx-auto text-center">
      <Image
        src={ErrorImage}
        alt="Error image"
        height={"300px"}
        width="300px"
      />
      <h1 className="text-5xl sm:text-9xl text-secondary mb-10">OPPS</h1>
      <p className="text-2xl mb-10">There is an error in this page</p>
      <p className="text-base mb-10">
        Navigate to another page then click Try again
      </p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}

export default ErrorFallback
