import api from '@/plugins/axiosInterceptor'

export const getRegions = async () => {
  let data = {}
  const url = '/api/regions'

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
  getRegions,
}
