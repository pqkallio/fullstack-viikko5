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

const like = (blog, onSuccess) => async () => {
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes + 1,
    url: blog.url,
    user: blog.user._id
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config())

  blog.likes += 1

  onSuccess(blog)

  return response.data
}

export default { getAll, setToken, create, like }