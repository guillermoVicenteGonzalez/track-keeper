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

const theme2 = {
  dark:false,
  colors:{
    primary: "#e91e63",
    secondary: "#009688",
    accent: "#ffc107",
    error: "#ef0408",
    warning: "#ffeb3b",
    info: "#607d8b",
    success: "#4caf50"
  }
}

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
/*
const lightTheme = {
  dark:false,
  colors:{
    background:'#FFFFFF',
    surface:'#FFFFFF',
    primary:'#B8884B',
    'primary-darken-1':'#B8724B',
    secondary:'#A6BEDC',
    'secondary-darken':'#4B7BB8',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'dark':'#4a5759'
  }
}*/

const mainTheme = {
  dark:false,
  colors:{
    background:'#eaefd3',
    surface:'#FFFFFF',
    primary:'#b3c0a4',
    secondary:'#505168',
    'secondary-darken':'#27233a',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const lightTheme2 = {
  dark:false,
  colors:{
    //
    background:'#FFFFFF',
    'background-darken-1':'#f4f4f7',
    primary:'#A6BEDC',
    'primary-darken-1':'#9cbde5',
    'primary-darken-2':'#8aadd8',
    'primary-darken-3':'#5c95db',
    'primary-darken-4':'55769e',
    //secondary:'#F4DFE0',
    secondary:'#FCADB2',
    'secondary-darken':'#ff8e94',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
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

/*

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    blueprint:md3,
    theme:{
      defaultTheme:"theme2",
      themes:{
        theme2
      }
    }
  }
)
*/

export default createVuetify({
  blueprint:md3,
  theme:{
    defaultTheme:'lightTheme2',
    themes:{
      lightTheme2
    }
  }
})