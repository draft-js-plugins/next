import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { wait } from 'dom-testing-library'
import App from '../App'
import { expect, use } from 'chai'
import chaiDom from 'chai-dom'

use(chaiDom)
afterEach(cleanup)

describe('Tests for render image via @djsp/atomic-block', () => {
  const { container } = render(<App />)
  const imageEl = container.querySelector('img')

  it('It should have an image in editor', () => {
    expect(imageEl).to.have.length(1)
  })

  it('Display border when the image was clicked', async () => {
    const clickedImage = imageEl[0]
    fireEvent.click(clickedImage)
    await wait(() => expect(clickedImage).to.have.class('focused'))
  })
})
