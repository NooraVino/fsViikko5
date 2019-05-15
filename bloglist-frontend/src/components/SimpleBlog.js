import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className= 'note'>
      {blog.title} {blog.author}
    </div>
    <div>
        <p> 'böö' </p>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
