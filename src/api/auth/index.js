import api from '@/plugins/axiosInterceptor'

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

export default {
  requestFindEmail,
}
