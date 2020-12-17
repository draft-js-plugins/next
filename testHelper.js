import '@babel/polyfill'
import 'ignore-styles'
import chai from 'chai'
import chaiDom from 'chai-dom'

process.env.NODE_ENV = 'test'

const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
  // runScripts: 'outside-only',
})
const { window } = jsdom
window.Date = Date
// window.getSelection isn't in jsdom
// https://github.com/tmpvar/jsdom/issues/937
window.getSelection = () => ({
  addRange: () => {},
  removeAllRanges: () => {},
})

// window.document.createRange isn't in jsdom
window.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
  },
})

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {}
    )
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
copyProps(window, global)

const exposedProperties = ['window', 'navigator', 'document']

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

chai.use(chaiDom)
