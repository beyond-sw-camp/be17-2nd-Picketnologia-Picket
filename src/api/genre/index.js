import api from '@/plugins/axiosInterceptor'

const getGenres = async () => {
  let data = {}
  const url = '/api/genres'

  await api
    .get(url)
    .then((res) => {
      data = res.data.genres
    })
    .catch((error) => {
      data = error.response.data
    })

  return data
}

export default {
  getGenres,
}
