import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/email-find',
      name: 'email-find',
      component: () => import('@/views/EmailFindView.vue'),
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import('@/views/PasswordFindView.vue'),
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
  ],
})

export default router
