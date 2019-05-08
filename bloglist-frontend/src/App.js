import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


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
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
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
  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }
  

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
      notify(`väärä nimi`, 'error')
    }
  }
  const addBlog = (event) => {

    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: "0",
    }
     notify(`uusi luotu: ${newBlog.title}`)
    blogService
    .create(newBlog)
    .then(returnedBlog => {
    setBlogs(blogs.concat(returnedBlog))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    })
    .catch(error =>{
      notify(`et voi luoda uutta blogia ilman nimeä, julkaisijaa ja osoitetta!`, 'error')
    } ) 

  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2> Kirjaudu </h2>
      <div>käyttäjätunnus
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

  const blogsForm = () => (
    <form >

      <h2>Blogit</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </form>
  )

  const newBlogForm = () => (

    <form onSubmit={addBlog}>
      <div> blogin nimi: <input value={newTitle} onChange={handleTitleChange} /> </div>
      <div> julkaisija: <input value={newAuthor} name="Author" onChange={handleAuthorChange} /></div>
      <div>blogin osoite: <input value={newUrl} name="Url" onChange={handleUrlChange} /></div>
      <button type="submit">tallenna</button>
    </form>
  )


  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        <div>
          <p> Sisäänkirjautuneena:  {user.name}</p>
          <button onClick={handleLogout}>kirjaudu ulos</button>
           <div>{newBlogForm()}</div>
           {blogsForm()}

        </div>

      }
    </div>
  )
}

export default App