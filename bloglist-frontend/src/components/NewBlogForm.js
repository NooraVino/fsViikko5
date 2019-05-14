import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({
  onSubmit,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange
}) => {
  return (

    <form onSubmit={onSubmit}>
      <div> lisää blogi </div>
      <div> blogin nimi: <input title={newTitle} onChange={handleTitleChange} /> </div>
      <div> julkaisija: <input author={newAuthor} name="Author" onChange={handleAuthorChange} /></div>
      <div>blogin osoite: <input url={newUrl} name="Url" onChange={handleUrlChange} /></div>
      <button type="submit">tallenna</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
}

export default NewBlogForm