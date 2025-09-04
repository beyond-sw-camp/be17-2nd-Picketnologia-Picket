import api from '@/plugins/axiosInterceptor'

const getProducts = async (req) => {
  let data = {}

  let url = '/api/products'

  await api
    .get(url, {
      params: req,
    })
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.response.data
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

const getAvailableDates = async (req) => {
  let data = {}
  const url = `/api/round?idx=${req.id}`

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

const getSeatDates = async (req) => {
  let data = {}
  const url = `/api/seat-info?product=${req.productId}&roundTime=${req.roundTimeIdx}`

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

const getRoundDates = async (req) => {
  let data = {}
  const url = '/api/round/date?product=' + req.productId

  await api
    .get(url)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error
    })

  return data
}

const getRoundTimes = async (req) => {
  let data = {}
  const url = '/api/round/time?date=' + req.dateId

  await api
    .get(url)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error
    })

  return data
}

export default {
  getProducts,
  getProductDetail,
  addProduct,
  getAvailableDates,
  getSeatDates,
  getRoundDates,
  getRoundTimes,
}
