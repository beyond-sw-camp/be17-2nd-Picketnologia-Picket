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
    // {
    //   path: '/my-page',
    //   name: 'mypage',
    //   component: () => import('@/views/seller/mypage1.vue'),
    // },
    {
      path: '/mypage1',
      name: 'my-page1',
      component: () => import('@/views/seller/mypage1.vue'),
    },

    {
      path: '/mypage2',
      name: 'my-page2',
      component: () => import('@/views/seller/mypage2.vue'),
    },

    {
      path: '/mypage3',
      name: 'my-page3',
      component: () => import('@/views/seller/mypage3.vue'),
    },

    {
      path: '/myaccount',
      name: 'myaccount',
      component: () => import('@/views/seller/myaccount.vue'),
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('@/views/seller/Main.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/seller/DashBoardView.vue')
        },
        {
          path: 'products/on-sale',
          component: () => import('@/views/seller/ProductOnSaleView.vue')
        },
        {
          path: 'products/sold-out',
          component: () => import('@/views/seller/ProductSoldOutView.vue')
        },
        {
          path: 'reservation',
          component: () => import('@/views/seller/ReservationView.vue')
        },
        {
          path: 'refund',
          component: () => import('@/views/seller/RefundManagementView.vue')
        },
        {
          path: 'review',
          component: () => import('@/views/seller/Review.vue')
        },
        {
          path: 'qna',
          component: () => import('@/views/seller/QnaView.vue')
        },
        {
          path: 'sale-statistics',
          component: () => import('@/views/seller/SaleStatisticsView.vue')
        }

      ]
    }
  ],
})

export default router
