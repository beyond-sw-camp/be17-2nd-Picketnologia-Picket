import router from '@/router'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    idx: 0,
    nickname: '',
    role: '',
    isLogin: false,
  }),
  actions: {
    login(user) {
      this.isLogin = true
      this.idx = user.idx
      this.nickname = user.nickname
      this.role = user.role
    },
    logout() {
      this.$reset() // 상태 초기화
      sessionStorage.removeItem('user')
      router.push('/')
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
