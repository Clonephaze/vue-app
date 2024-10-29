// src/main.ts

/**
 * The entry point of the application.
 *
 * This file sets up the Vue application, uses the Vuex store, sets up the
 * Vue Router, and mounts the application to the DOM.
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'

// Create the Vue application
const app = createApp(App)

// Use the Vuex store
app.use(store)

// Set the theme based on the saved theme in the Vuex store
const savedTheme = store.state.theme
document.documentElement.classList.toggle('dark-theme', savedTheme === 'dark')

// Use the Vue Router
app.use(router)

// Mount the application to the DOM
app.mount('#app')
