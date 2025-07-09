import api from '@/plugins/axiosInterceptor'

const memberLogin = async (req) => {
  let data = {}
  let url = '/api/users/login'

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

const findEmail = async (req) => {
  let data = {}
  // let url = '/api/auth/email/code'
  let url = '/api/auth_email_code.js'

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

const sendCode = async (req) => {
  let data = {}
  // let url = '/api/auth/password-reset/code'
  let url = '/api/auth_password-reset_code'

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

const confirmPasswordReset = async (req) => {
  let data = {}
  // let url = '/api/auth/password-reset/confirm'
  let url = '/api/auth_password-reset'
  // let url = '/auth/password-reset'

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

const verificationCode = async (req) => {
  let data = {}
  // let url = '/api/auth/password-reset/verify'
  let url = '/api/auth_password-reset_verify'

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

export default { memberLogin, findEmail, sendCode, confirmPasswordReset, verificationCode }
