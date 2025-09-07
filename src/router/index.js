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
          path: '/search',
          name: 'search',
          component: () => import('@/views/SearchView.vue'),
        },
        {
          path: '/products/:id',
          name: 'ProductDetail',
          component: () => import('@/views/ProductDetailView.vue'),
        },
        {
          path: '/contents/genre/:code',
          name: 'ContentsGenre',
          component: () => import('@/views/contents/ContentsGenreView.vue'),
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
      path: '/find-email',
      name: 'find-email',
      component: () => import('@/views/auth/EmailFindView.vue'),
      meta: {
        authRequired: false,
      },
    },
    {
      path: '/find-password',
      name: 'find-password',
      component: () => import('@/views/auth/PasswordFindView.vue'),
      meta: {
        authRequired: false,
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/auth/PasswordResetView.vue'),
      meta: {
        requireToken: true,
      },
    },
    {
      path: '/mypage',
      name: 'mypageHome',
      component: () => import('@/views/mypage/MypageMain.vue'),
      redirect: '/mypage/reserve',
      meta: {
        authRequired: true,
      },
      children: [
        {
          path: 'reserve',
          name: 'mypage-reserve',
          component: () => import('@/views/mypage/ReservationView.vue'),
        },
        {
          path: 'refund',
          name: 'mypage-refund',
          component: () => import('@/views/mypage/RefundView.vue'),
        },
        {
          path: 'review',
          name: 'mypage-review',
          component: () => import('@/views/mypage/ReviewView.vue'),
        },
        {
          path: 'profile',
          name: 'mypage-profile',
          component: () => import('@/views/mypage/ProfileView.vue'),
        },
      ],
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/views/auth/SignupView.vue'),
      meta: {
        authRequired: false,
      },
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('@/views/seller/Main.vue'),
      meta: {
        authRequired: true,
        isSeller: true,
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const authRequired = to.matched.some((record) => record.meta.authRequired)
  const requiresToken = to.matched.some((record) => record.meta.requiresToken)
  const userTypeSeller = to.matched.some((record) => record.meta.isSeller)

  const isLogin = userStore.isLogin

  // 권한이 필요한데 로그인이 되어 있지 않으면 로그인 페이지로 이동
  if (authRequired && !isLogin) {
    next('/login')
  }

  // 비밀번호 재설정 페이지에서는 토큰이 필요
  if (requiresToken) {
    const token = to.query.token
    if (!token) {
      next('/login')
    }
  }

  // 판매자 전용 페이지에서는 판매자 권한이 필요
  if (userTypeSeller) {
    if (!userStore.isSeller) {
      alert('권한이 없습니다.')
      next('/')
    }
  }

  // 그렇지 않으면 다음 페이지로 이동
  next()
})

export default router
