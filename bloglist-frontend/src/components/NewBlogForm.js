import React from 'react'

const NewBlogForm = ({onSubmit, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange}) => {
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

export default NewBlogForm