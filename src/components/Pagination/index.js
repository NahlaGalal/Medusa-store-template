// @ts-check
import React, { useContext, useEffect, useState } from "react"
import { PublicContext } from "../../context/publicContext"
import { client } from "../../utils/client"

export const LIMIT = 6

const Pagination = ({ setPageProducts, offset, count, limit, options }) => {
  const [activePage, setActivePage] = useState(offset / LIMIT)
  const [numPages, setNumPages] = useState(Math.ceil(count / limit))
  const { setLoading } = useContext(PublicContext)

  useEffect(() => {
    setActivePage(offset / LIMIT)
    setNumPages(Math.ceil(count / limit))
  }, [count, limit, offset])

  const getProductsPage = async pageNum => {
    setLoading(true)
    const { products, offset, count, limit } = await client.products.list({
      limit: LIMIT,
      offset: pageNum * LIMIT,
      ...options,
    })

    setPageProducts([...products])
    setActivePage(offset / LIMIT)
    setNumPages(Math.ceil(count / limit))
    setLoading(false)
  }

  return (
    <div className="flex my-8 justify-center">
      {new Array(numPages).fill(0).map((_, i) => (
        <button
          key={i}
          className={`cursor-pointer ${
            activePage === i ? "bg-brand" : "bg-secondary"
          } ${
            !i
              ? "rounded-l rounded-r-none"
              : i + 1 === numPages
              ? "rounded-r rounded-l-none"
              : "rounded-none"
          }`}
          onClick={() => getProductsPage(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
