import { createTheme } from "@mui/material"

const d = new Date()
const month = d.getMonth()
const isBer = month >= 8

export const v1Theme = createTheme({
  palette: {
    primary: {
      main: isBer ? '#FF6457' : '#ffb100'
    },
    secondary: {
      main: '#D2B48C'
    }
  },
})