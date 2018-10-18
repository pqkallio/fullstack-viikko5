import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = userToken => {
  token = `Bearer ${userToken}`
}

const config = () => {
  return { headers: { 'Authorization': token } }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config())

  return response.data
}

export default { getAll, setToken, create }