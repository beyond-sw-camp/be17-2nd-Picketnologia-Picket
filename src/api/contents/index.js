import api from '@/plugins/axiosInterceptor'

const getContentsByGenre = async (req) => {
  let data = {}
  const url = `/api/contents/${req.genre}`

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
  getContentsByGenre,
}
