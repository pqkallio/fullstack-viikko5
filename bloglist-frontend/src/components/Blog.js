import React from 'react'
import Togglable from './Togglable'
import blogs from '../services/blogs';

const Blog = ({blog, onLike}) => (
  <Togglable
    className='blog blogHeader'
    type='div'
    toggleLabel={blog.author + ': ' + blog.title}
  >
    <p className='blog blogInfo'><a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} {blog.likes === 1 ? 'like' : 'likes'} <button onClick={blogs.like(blog, onLike)}>like</button><br/>
      added by {blog.user.name}
    </p>
  </Togglable>  
)

export default Blog