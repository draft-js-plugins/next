import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { waitForElement } from 'dom-testing-library'
import App from '../App'
import { expect } from 'chai'

// afterEach(cleanup)

describe('Tests for render image via @djsp/atomic-block', () => {
  const { container } = render(<App />)
  const imageEl = container.querySelector('img')

  it('It should have an image in editor', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(imageEl).to.exist
  })

  it('Image should be focused after clicked', async () => {
    fireEvent.click(imageEl)
    const focusedEl = await waitForElement(() =>
      container.querySelector('.focused')
    )
    expect(focusedEl).to.have.class('focused')
  })

  // Having problem about keyboard event
  // it('Image should be deleted', async () => {
  //   fireEvent.keyDown(imageEl, { key: 'backspace', code: 8, charCode: 8})
  //   await wait(() => console.log(container.querySelector('img')), { interval: 2000 })
  //   expect(container.querySelector('img')).not.to.exist
  // })
})
