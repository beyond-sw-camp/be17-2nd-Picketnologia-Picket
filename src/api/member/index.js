import api from '@/plugins/axiosInterceptor'

const memberLogin = async (req) => {
  let data = {}
  let url = '/api/login'

  await api
    .post(url, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.response.data
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
      data = error.response.data
    })

  return data
}

const requestSignup = async (req) => {
  let data = {}

  let url = '/api/user/signup'

  await api
    .post(url, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.response.data
    })

  return data
}

const getSignupViewInfo = async () => {
  let data = {}
  let url = '/api/user/signup'

  await api
    .get(url)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.response.data
    })

  return data
}

export default {
  memberLogin,
  logout,
  requestSignup,
  getSignupViewInfo,
}
