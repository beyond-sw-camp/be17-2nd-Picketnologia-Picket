import api from '@/plugins/axiosInterceptor'

const getProducts = async () => {
  let data = {}

  let url = '/api/product/list'

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

const getProductDetail = async (req) => {
  let data = {}
  const url = '/api/products/' + req.productId

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

const addProduct = async (req) => {
  let data = {}
  const url = '/api/products'

  await api
    .post(url, req, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.response.data
    })

  return data
}

export default { getProducts, getProductDetail, addProduct }
