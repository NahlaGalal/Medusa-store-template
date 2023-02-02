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
    brand: "#C59F55",
    secondary: "#0B2346",
    darkBlack: "#000000",
    darkGrey: "#888888",
    lightGrey: "#DDDDDD",
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
    accordionTrigger: {
      bg: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "375px",
      borderRadius: "8px",
      transition: "all .2s linear",
      fontWeight: "600",
      px: "24px",
      py: "16px",
    },
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
      bg: "brand",
      color: "secondary",
      fontWeight: "500",
      height: "33px",
      cursor: "pointer",
      borderRadius: 0,
      border: "1px solid",
      borderColor: "secondary",
      transition: "all 0.4s ease-in-out",
      "&:disabled": {
        opacity: 0.5,
        cursor: "default",
      },
      "&.active": {
        color: "brand",
        bg: "secondary",
      },
    },
    incrementor: {
      bg: "secondary",
      color: "brand",
      flexGrow: "1",
      height: "33px",
      border: "none",
      borderRadius: "0 4px 4px 0",
      cursor: "pointer",
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
    edit: {
      bg: "transparent",
      color: "brand",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "underline",
      padding: "0",
    },
  },
  box: {
    paymentField: {
      bg: "background",
      padding: "12px",
      fontSize: "1.1em",
      borderRadius: "5px",
      marginBottom: "20px",
    },
  },
  text: {
    fz_s: {
      fontSize: "10px",
    },
    header3: {
      fontSize: "16px",
      fontWeight: "600",
    },
    summary: {
      py: ".1em",
      fontSize: "12px",
      color: "darkGrey",
      fontWeight: 300,
    },
    landingpageText: {
      py: ".1em",
      fontSize: "14px",
      lineHeight: "24px",
      color: "#111827",
      mb: "8px",
      fontWeight: 300,
      "& a": {
        fontWeight: 500,
        textDecoration: "none",
        color: "#3B82F6",
        "&:hover": {
          color: "brand",
        },
      },
    },
    landingpageLink: {
      fontSize: "14px",
      lineHeight: "24px",
      color: "#3B82F6",
      mb: "4px",
      fontWeight: 500,
      textDecoration: "none",
      "&:hover": {
        color: "brand",
      },
    },
    termsLink: {
      textDecoration: "none",
      color: "medusa100",
    },
    confirmationHeading: {
      lineHeight: "1.8em",
    },
    confirmationText: {
      fontSize: "0.8em",
      lineHeight: "1.5em",
      fontWeight: "300",
    },
    subheading: {
      fontSize: "12px",
      fontWeight: 600,
      color: "black",
    },
  },

  forms: {
    select: {
      bg: "cool",
      border: "none",
    },
    input: {
      bg: "cool",
      border: "none",
    },
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
      background: "ui",
    },
  },
}

export default theme
