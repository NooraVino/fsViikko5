import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
// import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import { prettyDOM } from 'dom-testing-library'

it('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Noora',
    url: 'www.jotain',
    likes: '2'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})


test('renders title and author', () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Noora',
    url: 'www.jotain',
    likes: '2'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )
  expect(component.container).toHaveTextContent(
    'Noora'
  )
})

test('renders likes', () => {
  const blog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Noora',
    url: 'www.jotain',
    likes: '25'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const p = component.container.querySelector('p')
  
  console.log(prettyDOM(p))

  expect(component.container).toHaveTextContent(
    '25'
  )
})

