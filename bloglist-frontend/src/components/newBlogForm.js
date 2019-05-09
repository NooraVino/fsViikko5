import React from 'react'

const newBlogForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={handleChange}
        />
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default newBlogForm