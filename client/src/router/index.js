import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/books', name: 'Books', component: () => import('@/views/BooksView.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/RegisterView.vue') },
  { path: '/verify-email/:token', name: 'VerifyEmail', component: () => import('@/views/VerifyEmailView.vue') },
  {
    path: '/admin',
    meta: { requiresAdmin: true },
    children: [
      { path: 'books', name: 'AdminBooks', component: () => import('@/views/admin/AdminBooksView.vue') },
      { path: 'authors', name: 'AdminAuthors', component: () => import('@/views/admin/AdminAuthorsView.vue') },
      { path: 'categories', name: 'AdminCategories', component: () => import('@/views/admin/AdminCategoriesView.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAdmin && auth.role !== 'admin') {
    return { name: 'Login' }
  }
})

export default router