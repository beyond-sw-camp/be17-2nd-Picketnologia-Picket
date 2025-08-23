import api from '@/plugins/axiosInterceptor'
import { useLoadingStore } from '@/stores/useLoadingStore'
/**
 * 이메일 찾기 요청 api
 * @param {Object} req - 요청 객체
 * @returns
 */
const requestFindEmail = async (req) => {
  let data = {}
  // let url = '/api/auth/email/code'
  let url = '/api/auth/find-email'

  await api
    .post(url, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

/**
 * 이메일 인증 코드 전송 api
 * @param {Object} req - 요청 객체
 * @returns
 */
const sendAuthCodeToEmail = async (req) => {
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()

  let data = {}
  let url = '/api/auth/email/verify-code'

  await api
    .get(url, { params: req })
    .then((res) => {
      console.log(res)
      data = res.data
    })
    .catch((error) => {
      console.log(error)
      data = error.data
    })
    .finally(() => {
      loadingStore.stopLoading()
    })

  return data
}

/**
 * 이메일 인증 코드 검증 api
 * @param {Object} req - 요청 객체
 * @returns
 */
const verifyEmailCode = async (req) => {
  let data = {}
  let url = '/api/auth/email/verify-code'

  await api
    .post(url, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

/**
 * 비밀번호 재설정 요청 api
 * @param {Object} req - 요청 객체
 * @returns
 */
const resetPassword = async (req) => {
  let data = {}
  let url = '/api/auth/reset-password'

  await api
    .post(url, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

/**
 * 비밀번호 재설정 링크 요청 api
 * @param {Object} req - 요청 객체
 * @returns
 */
const sendPasswordResetLink = async (req) => {
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()
  let data = {}
  let url = '/api/auth/find-password/link'

  await api
    .post(url, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })
    .finally(() => {
      loadingStore.stopLoading()
    })

  return data
}

export default {
  requestFindEmail,
  sendAuthCodeToEmail,
  sendPasswordResetLink,
  verifyEmailCode,
  resetPassword,
}
