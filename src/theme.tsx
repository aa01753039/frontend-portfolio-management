import {  extendTheme } from "@chakra-ui/react"
import '@fontsource/poppins';

const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.main",
  },
}

const theme = extendTheme({
  fonts: {heading: "Poppins", body: "Poppins"},
  colors: {
    ui: {
      main: "#008000", 
      secondary: "#EDF2F7",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "#FAFAFA",
      dark: "#1A202C",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
      opacityMain: "rgba(160, 74, 120, 0.5)", // Change the opacity value here
      orange: "#FF6F20",
      lavander: "#C78FB8",
      blue: "#5A88C2",
      gray: "#A1A1A1",
      beige: "#FFE4B5",
      teal: "#20C5B1",
    },
    deepGray: {
      "50": "#F2F2F2",
      "100": "#DBDBDB",
      "200": "#C4C4C4",
      "300": "#ADADAD",
      "400": "#969696",
      "500": "#808080",
      "600": "#666666",
      "700": "#4D4D4D",
      "800": "#333333",
      "900": "#1A1A1A"

    },
    midnightBlue: {
      "50": "#EDEDF8",
      "100": "#CBCDEB",
      "200": "#AAADDF",
      "300": "#898DD2",
      "400": "#676DC6",
      "500": "#464DB9",
      "600": "#383E94",
      "700": "#2A2E6F",
      "800": "#1C1F4A",
      "900": "#0E0F25"
    }
    ,
    orange: {
      "50": "#FFEFE5",
      "100": "#FFD1B8",
      "200": "#FFB38A",
      "300": "#FF965C",
      "400": "#FF782E",
      "500": "#FF5A00",
      "600": "#CC4800",
      "700": "#993600",
      "800": "#662400",
      "900": "#331200"
    },
    mint: {
      "50": "#E5FFF4",
      "100": "#B8FFDF",
      "200": "#8AFFCB",
      "300": "#5CFFB6",
      "400": "#2EFFA2",
      "500": "#00FF8D",
      "600": "#00CC71",
      "700": "#009955",
      "800": "#006639",
      "900": "#00331C"
    },
   
    
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main", // Use the modified color here
          color: "ui.light",
          _hover: {
            backgroundColor: "ui.opacityMain",
          },
          _disabled: {
            ...disabledStyles,
            _hover: {
              ...disabledStyles,
            },
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#E32727",
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: "ui.main",
            },
          },
        },
      },
    },
  },
})

export default theme
