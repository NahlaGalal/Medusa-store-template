import React from "react"

const Spinner = () => {
  return (
    <svg
      viewBox="0 0 32 32"
      width="48"
      height="48"
      strokeWidth="4"
      fill="none"
      stroke="currentcolor"
      role="img"
      className="w-28 h-28 m-auto text-brand"
    >
      <title>Loading...</title>
      <circle cx="16" cy="16" r="12" opacity="0.125"></circle>
      <circle
        cx="16"
        cy="16"
        r="12"
        strokeDasharray="75.39822368615503"
        strokeDashoffset="56.548667764616276"
        className="animate-spin origin-[50%_50%]"
      ></circle>
    </svg>
  )
}

export default Spinner
