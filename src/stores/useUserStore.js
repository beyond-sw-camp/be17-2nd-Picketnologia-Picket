import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const idx = ref(0)
  const nickname = ref('')

  const isLogin = ref(false)

  const login = (loginUser) => {
    isLogin.value = true
    idx.value = loginUser.idx
    nickname.value = loginUser.nickname
  }

  const logout = () => {
    isLogin.value = false
    idx.value = 0
    nickname.value = ''
  }

  return { idx, isLogin, login, logout, nickname }
})
