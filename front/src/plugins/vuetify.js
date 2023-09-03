/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'


// Composables
import { createVuetify } from 'vuetify'

const customTheme = {
  colors:{
    primary: "#673ab7",
    secondary: "#e91e63",
    accent: "#4caf50",
    error: "#f44336",
    warning: "#ffc107",
    info: "#03a9f4",
    success: "#8bc34a",
    background:"#ffffff"
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
/*
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})*/

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    blueprint:md3,
  }
)
