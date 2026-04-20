import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/Register.vue')
      },
      {
        path: 'visitors',
        name: 'Visitors',
        component: () => import('../views/Visitors.vue')
      },
      {
        path: 'records',
        name: 'Records',
        component: () => import('../views/Records.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  // ✅ 就改这一行！自动适配 GitHub Pages
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router