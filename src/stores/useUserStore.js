import router from '@/router'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

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
      const route = useRoute()
      this.$reset()
      sessionStorage.removeItem('user')
      router.push(route.fullPath)
    },
  },
  persist: {
    storage: sessionStorage,
  },
})

const isSeller = (userType) => {
  return userType === 'SELLER'
}
