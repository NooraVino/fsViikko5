import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import './index.css'
import { useField } from './hooks/index'


const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const App = () => {

  const username = useField('username')
  const password = useField('password')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [notification, setNotification] = useState({
    message: null
  })

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
  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const noti = (message, type = 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }


  const handleLogout = () => {

    blogService.removeToken()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)

  }

  const handleLogin = async (event) => {

    event.preventDefault()
    try {

      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      username.reset()
      password.reset()


    } catch (exception) {
      noti('väärä käyttäjänimi tai salasana', 'error')
    }
  }
  const noteFormRef = React.createRef()
  const addBlog = (event) => {

    event.preventDefault()
    noteFormRef.current.toggleVisibility()


    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        title.reset()
        author.reset()
        url.reset()
        notify(`uusi luotu nimellä: ${newBlog.title}`)
      })
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2> Kirjaudu </h2>
      <div>käyttäjätunnus
        <input{...username}
        />
      </div>
      <div>
        salasana
        <input{...password} />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )

  const blogsForm = () => (
    <form >

      <h2>Blogit</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </form>
  )

  const newBlogForm = () => (
    <Togglable buttonLabel="lisää blogi" ref={noteFormRef}>
      <NewBlogForm addBlog={addBlog} title={title} author={author} url={url} />
    </Togglable>
  )

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        <div>
          <p className='note'> Sisäänkirjautuneena:  {user.name}</p>
          <button onClick={handleLogout}>kirjaudu ulos</button>
          {newBlogForm()}
          {blogsForm()}

        </div>

      }
    </div>
  )
}


export default App