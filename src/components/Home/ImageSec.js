// @ts-check
import React from "react"
import { Box } from "theme-ui"

const ImageSec = () => {
  return (
    <Box
      as="section"
      sx={{
        backgroundImage: "url('/home_section.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        height: "500px",
        backgroundAttachment: "fixed",
      }}
    />
  )
}

export default ImageSec
