import api from '@/plugins/axiosInterceptor'

const memberLogin = async (req) => {
  let data = {}
  let url = 'http://localhost:8080/login'

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

const logout = async (req) => {
  let data = {}
  const url = '/api/logout'

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

/**
 * 이메일 인증 코드 검증 api
 * @param {} req
 * @returns
 */
const verifyEmailCode = async (req) => {
  let data = {}
  // let url = '/api/email/code/verify'
  let url = 'http://localhost:8080/auth/email/verify-code'

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
 * @param {String} req.email
 * @returns
 */
const requestSendVerifyCode = async (req) => {
  let data = {}
  let url = 'http://localhost:8080/auth/email/verify-code'

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

  return data
}

const requestSignup = async (req) => {
  let data = {}

  let url = 'http://localhost:8080/user/signup'
  // let url = '/api/users_seller'

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

const getSignupViewInfo = async () => {
  let data = {}
  let url = 'http://localhost:8080/user/signup'

  await api
    .get(url)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

export default {
  memberLogin,
  logout,
  sendCode,
  confirmPasswordReset,
  verificationCode,
  verifyEmailCode,
  requestSignup,
  requestSendVerifyCode,
  getSignupViewInfo,
}
