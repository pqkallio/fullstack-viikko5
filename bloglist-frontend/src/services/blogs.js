import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = token => {
  token = `Bearer ${token}`
}

const getAll = async () => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.get(baseUrl, config)
  
  return response.data
}

export default { getAll, setToken }