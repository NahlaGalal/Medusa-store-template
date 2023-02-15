import React from "react"

const FieldSplitter = ({ left, right }) => {
  return (
    <div className="flex w-full flex-1">
      <div className="mr-1 w-full">{left}</div>
      <div className="ml-1 w-full">{right}</div>
    </div>
  )
}

export default FieldSplitter
