import api from '@/plugins/axiosInterceptor'

const getProducts = async (params) => {
  let data = {}

  let url = '/api/products.json'

  await api
    .get(url, { params })
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

export default { getProducts }
