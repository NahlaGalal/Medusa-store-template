const theme = {
  fonts: {
    body: "Roboto",
    heading: "Literata",
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  breakpoints: ["768px", "1200px"],
  colors: {
    brand: "#468d93",
    secondary: "#a73822",
    darkBlack: "#000000",
    darkGrey: "#888888",
    lightGrey: "#eef2f3",
    white: "#FFFFFF",
  },
  layout: {
    stepContainer: {
      width: "100%",
      height: "100%",
      mb: "8px",
    },
    container: {
      width: "80%",
      mx: "auto",
    },
  },
  cards: {
    container: {
      bg: "white",
      width: "375px",
      px: "24px",
      py: "16px",
      height: "auto",
      borderRadius: "8px",
      justifyContent: "center",
      transition: "all .2s linear",
      boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2)",
    },
  },
  buttons: {
    cta: {
      bg: "transparent",
      color: "brand",
      fontWeight: "500",
      height: "33px",
      cursor: "pointer",
      borderRadius: 0,
      border: "1px solid",
      borderColor: "brand",
      transition: "all 0.4s ease-in-out",
      textDecoration: "none",
      "&:disabled": {
        opacity: 0.5,
        cursor: "default",
      },
      "&.active": {
        bg: "brand",
        color: "white",
      },
    },
    incrementor: {
      bg: "transparent",
      color: "brand",
      flexGrow: "1",
      height: "33px",
      border: "1px solid",
      borderColor: "brand",
      borderRadius: "0 4px 4px 0",
      cursor: "pointer",
      transition: "all 0.4s ease-in-out",
      "&:hover": {
        backgroundColor: "brand",
        color: "white",
      },
    },
    decrementor: {
      bg: "transparent",
      color: "brand",
      height: "33px",
      border: "none",
      borderRadius: "0",
      cursor: "pointer",
      transition: "all 0.4s ease-in-out",
    },
    tags: {
      bg: "lightGrey",
      color: "brand",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "14px",
      textDecoration: "none",
    },
  },
  text: {
    summary: {
      py: ".1em",
      fontSize: "12px",
      color: "darkGrey",
      fontWeight: 300,
    },
  },

  forms: {
    field: {
      border: "1px solid grey",
      "::placeholder": {
        color: "darkGrey",
      },
      ":-ms-input-placeholder": {
        color: "darkGrey",
      },
      "::-ms-input-placeholder": {
        color: "darkGrey",
      },
      outline: "none",
      transition: "all .2s linear",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
    },
  },
}

export default theme
