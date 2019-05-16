import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({
  addBlog,
  title,
  author,
  url

}) => {
  return (

    <form onSubmit={addBlog}>
      <div> lisää blogi </div>
      <div> blogin nimi: <input {...title} /> </div>
      <div> julkaisija: <input {...author} /></div>
      <div>blogin osoite: <input {...url} /></div>
      <button type="submit">tallenna</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default NewBlogForm