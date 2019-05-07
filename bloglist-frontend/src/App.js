import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
    
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )  

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog =async (newBlog )=> {
    
    const createdBlog = await blogService.create(newBlog)
    console.log(createdBlog  `hshsh`)

    
        setBlogs(blogs.concat(createdBlog))
        setNewBlog('')
    
  }
  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
 

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2> Kirjaudu </h2>
      <div>
        käyttäjätunnus
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addBlog}>

      <input
        value={newBlog}
        onChange={handleBlogChange}
      /> 
      <button type="submit">tallenna</button>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </form>
  )



  return (
    <div>
     {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>kirjaudu ulos</button>
        {noteForm()}
      </div>
    }
    </div>
  )
}

export default App