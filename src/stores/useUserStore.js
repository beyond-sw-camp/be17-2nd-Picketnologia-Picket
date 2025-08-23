import router from '@/router'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    idx: 0,
    nickname: '',
    role: '',
    isSeller: false,
    isLogin: false,
  }),
  actions: {
    login(user) {
      this.isLogin = true
      this.idx = user.idx
      this.nickname = user.nickname
      this.role = user.role
      this.isSeller = isSeller(user.userType)
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

const isSeller = (userType) => {
  return userType === 'SELLER'
}
