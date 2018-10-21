import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from'./components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const LOCALSTORAGE_USER_KEY = 'loggedBlogappUser'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      error: null,
      confirmation: null
    }
  }

  async componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem(LOCALSTORAGE_USER_KEY)
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      
      blogService.setToken(user.token)
      
      const blogs = await blogService.getAll()
      this.setState({ blogs })
    } else {
      this.setState({ blogs: [] })
    }
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  notify = (type, message) => {
    this.setState({
      [type]: message
    })

    setTimeout(() => {
      this.setState({ [type]: null })
    }, 2500)
  }

  handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(user))
      
      this.setState({
        username: '',
        password: '',
        user
      })

      blogService.setToken(user.token)
      
      const blogs = await blogService.getAll()
      this.setState({ blogs })
      
      this.notify('confirmation', `logged in as ${user.username}`)
    } catch (exception) {
      this.notify('error', 'username or password invalid')
    }
  }

  handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem(LOCALSTORAGE_USER_KEY)
    this.setState({ user: null, blogs: [] })

    this.notify('confirmation', 'successfully logged out')
  }

  handleBlogCreation = (newBlog) => {
    this.setState({
      blogs: this.state.blogs.concat(newBlog)
    })

    this.notify('confirmation', `a new blog '${newBlog.title}' by ${newBlog.author} added`)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification
            error={this.state.error}
            notification={this.state.notification}
          />
          <Login 
            username={this.state.username} 
            password={this.state.password} 
            handleLoginFieldChange={this.handleLoginFieldChange}
            handleSubmit={this.handleLogin}
          />
        </div>
      )
    }

    return (
      <div>
        <Notification
          error={this.state.error}
          confirmation={this.state.confirmation}
        />
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.handleLogout}>logout</button></p>
        <NewBlogForm blogService={blogService} blogCreationCallback={this.handleBlogCreation} />
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
