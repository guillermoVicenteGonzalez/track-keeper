/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

//Vuex Store
import store from"./VuexStore/store"

const app = createApp(App)
app.use(store)

registerPlugins(app)

app.mount('#app')
