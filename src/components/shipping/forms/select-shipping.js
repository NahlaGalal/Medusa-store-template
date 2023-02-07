import React, { useEffect, useState } from "react"
import { Box, Flex, Text } from "@theme-ui/components"
import { formatAmount } from "medusa-react"
import { client } from "../../../utils/client"

const ShippingOption = ({ selected, option, region, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: selected ? 600 : 350,
        width: "100%",
        height: "40px",
        border: selected ? "2px solid #111827;" : "1px solid #E5E7EB",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "4px",
        mt: "8px",
      }}
      value={option?.id}
    >
      {option && region && (
        <>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Flex
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "12px",
                height: "12px",
                bg: selected ? "black" : "white",
                border: selected ? "none" : "1px solid #D1D5DB;",
                borderRadius: "50%",
              }}
            >
              {selected && (
                <Box
                  sx={{
                    width: "6px",
                    height: "6px",
                    bg: "white",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Flex>
            <Text sx={{ mx: "1rem" }}>{option.name}</Text>
          </Flex>
          <Text sx={{ color: selected ? "primary" : "#6B7280" }}>
            {formatAmount({
              amount: option.amount,
              region,
            })}
          </Text>
        </>
      )}
    </Flex>
  )
}

const SelectShipping = ({ formik, name, set, region, cartId }) => {
  const [shippingOptions, setShippingOptions] = useState([])

  useEffect(() => {
    const getShippingOptions = async cartId => {
      const { shipping_options } = await client.shippingOptions.listCartOptions(
        cartId
      )
      setShippingOptions(shipping_options)
    }

    if (window) {
      getShippingOptions(cartId)
    }
  }, [])

  const handleClick = async id => {
    formik.setFieldValue(`${set}.${name}`, id)
  }

  useEffect(() => {
    if (shippingOptions.length) {
      handleClick(shippingOptions[0].id)
    }
  }, [shippingOptions])

  return (
    <Flex sx={{ flexDirection: "column" }}>
      {shippingOptions.map(s => (
        <ShippingOption
          key={s.id}
          onClick={() => handleClick(s.id)}
          selected={s.id === formik.values[set][name]}
          option={s}
          region={region}
        />
      ))}
    </Flex>
  )
}

export default SelectShipping
