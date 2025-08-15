import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      meta: {
        authRequired: false,
      },
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
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        authRequired: false,
      },
    },
    {
      path: '/email-find',
      name: 'email-find',
      component: () => import('@/views/auth/EmailFindView.vue'),
      meta: {
        authRequired: false,
      },
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: () => import('@/views/auth/PasswordFindView.vue'),
      meta: {
        authRequired: false,
      },
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
      meta: {
        authRequired: true,
      },
    },

    {
      path: '/mypage2',
      name: 'my-page2',
      component: () => import('@/views/seller/mypage2.vue'),
      meta: {
        authRequired: true,
      },
    },

    {
      path: '/mypage3',
      name: 'my-page3',
      component: () => import('@/views/seller/mypage3.vue'),
      meta: {
        authRequired: true,
      },
    },

    {
      path: '/myaccount',
      name: 'myaccount',
      component: () => import('@/views/seller/myaccount.vue'),
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/views/auth/SignupView.vue'),
      meta: {
        authRequired: false,
      },
    },

    // {
    //   path: '/bookingpage',
    //   name: 'bookingpage',
    //   component: () => import('@/views/BookingPage.vue'),
    // },

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

    {
      path: '/seller',
      name: 'seller',
      component: () => import('@/views/seller/Main.vue'),
      meta: {
        authRequired: true,
        requiredRole: 'seller',
      },
      children: [
        {
          path: '',
          component: () => import('@/views/seller/DashBoardView.vue'),
        },
        {
          path: 'products/on-sale',
          component: () => import('@/views/seller/ProductOnSaleView.vue'),
        },
        {
          path: 'products/sold-out',
          component: () => import('@/views/seller/ProductSoldOutView.vue'),
        },
        {
          path: 'reservation',
          component: () => import('@/views/seller/ReservationView.vue'),
        },
        {
          path: 'refund',
          component: () => import('@/views/seller/RefundManagementView.vue'),
        },
        {
          path: 'review',
          component: () => import('@/views/seller/Review.vue'),
        },
        {
          path: 'qna',
          component: () => import('@/views/seller/QnaView.vue'),
        },
        {
          path: 'sale-statistics',
          component: () => import('@/views/seller/SaleStatisticsView.vue'),
        },
        {
          path: 'products/creation',
          component: () => import('@/views/seller/ProductCreateView.vue'),
        },
      ],
    },
    {
      path: '/payment/result',
      component: () => import('@/views/PaymentResultView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const authRequired = to.matched.some((record) => record.meta.authRequired)
  const isLogin = userStore.isLogin

  // 권한이 필요한데 로그인이 되어 있지 않으면 로그인 페이지로 이동
  if (authRequired && !isLogin) {
    next('/login')
  } else {
    // 그렇지 않으면 다음 페이지로 이동
    next()
  }
})

export default router
