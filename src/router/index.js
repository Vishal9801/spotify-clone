import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import LibraryView from '../views/LibraryView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/search',
      component: SearchView,
      meta: { requiresAuth: true }
    },
    {
      path: '/library',
      component: LibraryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/forgot-password',
      component: ForgotPasswordView,
      meta: { guest: true }
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Initialize the auth listener if it hasn't been initialized yet
  if (!authStore.listenerInitialized) {
    authStore.initializeAuthListener();
    authStore.listenerInitialized = true;
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // User is not authenticated, redirect to login
    next({ path: '/login' });
  } 
  // Check if route is for guests only (like login/register) and user is authenticated
  else if (to.meta.guest && authStore.isAuthenticated) {
    // User is already authenticated, redirect to home page
    next({ path: '/' });
  } 
  else {
    // Allow navigation
    next();
  }
});

export default router
