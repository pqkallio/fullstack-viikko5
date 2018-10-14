import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: ''
    }
  }

  async componentDidMount() {
    if (this.state.user) {
      const blogs = await blogService.getAll()
      console.log('blogs:', blogs)
      this.setState({ blogs })
    } else {
      this.setState({ blogs: [] })
    }
  } 

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user })
      console.log('state\'s user:', this.state.user)
      blogService.setToken(user.token)
      const blogs = await blogService.getAll()
      console.log('blogs:', blogs)
      this.setState({ blogs })
    } catch (exception) {
      this.setState({ error: 'username or password invalid' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
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
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in</p>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
