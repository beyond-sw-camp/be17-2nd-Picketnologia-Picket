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

export default { memberLogin }
