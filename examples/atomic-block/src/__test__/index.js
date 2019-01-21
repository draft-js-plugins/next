
import React from 'react'
import {render, cleanup} from 'react-testing-library'
import App from '../App'

afterEach(cleanup)

describe('Tests for render image via @djsp/atomic-block', () => {
  it('It should have an image in editor', () => {
    const { container } = render(<App />);
    const imageEl = container.querySelector('img');
    expect(imageEl).to.have.length(3);
  })
})
