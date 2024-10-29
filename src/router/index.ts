import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Type for the generated routes
interface ViewComponent {
  (): Promise<any>
  [key: string]: any
}

// Auto-import all views
const views: Record<string, ViewComponent> = import.meta.glob('../views/*.vue')

// Create routes automatically from view files
const generatedRoutes: RouteRecordRaw[] = Object.entries(views).map(([path, component]) => {
  // Get the file name without extension
  const name = path.split('/').pop()?.replace('.vue', '') ?? ''
  
  return {
    path: name.toLowerCase() === 'home' ? '/' : `/${name.toLowerCase()}`,
    name,
    component
  }
})

// Add catch-all 404 route that redirects to home
const routes: RouteRecordRaw[] = [
  ...generatedRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      // Clean up URL by replacing the invalid path with '/'
      window.history.replaceState({}, '', '/')
      return { path: '/' }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router