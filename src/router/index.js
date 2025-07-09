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
        {
          path: '/products/:id',
          name: 'ProductDetail',
          component: () => import('@/views/ProductDetailView.vue'),
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

    {
      path: '/bookingpage',
      name: 'bookingpage',
      component: () => import('@/views/BookingPage.vue'),
    },

    {
      path: '/mypage1',
      name: 'mypage',
      component: () => import('@/views/mypage1.vue'),
    },

    {
      path: '/mypage2',
      name: 'mypage2',
      component: () => import('@/views/mypage2.vue'),
    },

    {
      path: '/mypage3',
      name: 'mypage3',
      component: () => import('@/views/mypage3.vue'),
    },

    {
      path: '/myaccount',
      name: 'myaccount',
      component: () => import('@/views/myaccount.vue'),
    },

  ],
})

export default router
