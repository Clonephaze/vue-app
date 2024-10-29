import { createRouter, createWebHistory } from 'vue-router'

// Auto-import all views
const views = import.meta.glob('../views/*.vue')

// Create routes automatically from view files
const routes = Object.entries(views).map(([path, component]) => {
  // Get the file name without extension
  const name = path.split('/').pop()?.replace('.vue', '') ?? ''
  
  return {
    // If it's Home.vue, use '/', otherwise use '/filename'
    path: name.toLowerCase() === 'home' ? '/' : `/${name.toLowerCase()}`,
    name,
    component
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router