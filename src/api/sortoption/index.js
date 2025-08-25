import api from '@/plugins/axiosInterceptor'

const getSortOptions = async () => {
  let data = {}
  const url = '/api/sort-options'

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
  getSortOptions,
}
