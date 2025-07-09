import api from '@/plugins/axiosInterceptor'

const getProducts = async () => {
  let data = {}

  let url = '/api/products.json'

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

const getProductDetail = async (productId) => {
  let data = {}
  const url = '/api/products_' + productId + '.json'

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

export default { getProducts, getProductDetail }
