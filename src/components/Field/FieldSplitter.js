import React from "react"

const FieldSplitter = ({ left, right }) => {
  return (
    <div className="flex w-full flex-1 flex-col md:flex-row">
      <div className="ltr:md:mr-1 rtl:md:ml-1 w-full">{left}</div>
      <div className="ltr:md:ml-1 rtl:md:mr-1 w-full">{right}</div>
    </div>
  )
}

export default FieldSplitter
