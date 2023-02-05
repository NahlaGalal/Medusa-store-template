// @ts-check
import React, { useContext, useState } from "react"
import { Flex, Button } from "theme-ui"
import { PublicContext } from "../../context/publicContext"
import { client } from "../../utils/client"

export const LIMIT = 6

const Pagination = ({ setPageProducts, offset, count, limit }) => {
  const [activePage, setActivePage] = useState(offset / LIMIT)
  const [numPages, setNumPages] = useState(Math.ceil(count / limit))
  const { setLoading } = useContext(PublicContext)

  const getProductsPage = async pageNum => {
    setLoading(true)
    const { products, offset, count, limit } = await client.products.list({
      limit: LIMIT,
      offset: pageNum * LIMIT,
    })

    setPageProducts([...products])
    setActivePage(offset / LIMIT)
    setNumPages(Math.ceil(count / limit))
    setLoading(false)
  }

  return (
    <Flex my={4} sx={{ justifyContent: "center" }}>
      {new Array(numPages).fill(0).map((_, i) => (
        <Button
          key={i}
          sx={{
            backgroundColor: activePage === i ? "brand" : "secondary",
            borderRadius: !i
              ? "4px 0 0 4px"
              : i + 1 === numPages
              ? "0 4px 4px 0"
              : 0,
            cursor: "pointer",
          }}
          onClick={() => getProductsPage(i)}
        >
          {i + 1}
        </Button>
      ))}
    </Flex>
  )
}

export default Pagination
