# draft-js-plugins@next
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
![Build Status](https://travis-ci.org/draft-js-plugins/next.svg?branch=master)
![codeship](https://img.shields.io/codeship/julian-little-haze-31/master.svg)

# DISCLAIMER: This project is unmaintained.

Unfortunately the next version of draft js plugins has become unmaintained. If you are interested in maintaining draft js plugins please [follow the steps outlined here](https://github.com/draft-js-plugins/draft-js-plugins/issues/1407#issuecomment-629710454).

# Examples

- [Inline Toolbar](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/inline-toolbar)
- [Emoji picker](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/emoji-example)
- [Static Toolbar](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/static-toolbar-example)
- [Mentions](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/mentions-example)
- [Atomic Block](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/atomic-block)
- [Block Switcher](https://codesandbox.io/s/github/draft-js-plugins/next/tree/master/examples/inline-toolbar)

# Contributing

## Install project

1. Run `npm install` (we use package-lock.json rather than `yarn`)
2. Run `yarn lerna bootstrap`, this will install all dependencies of all packages and examples.

# Contributing

## Feature prs
- Please open an issue first
- We're reachable on the draft js slack

## Working locally

In order to work on packages and examples at the same time, just run `yarn lerna link` and start `yarn watch` in the package/example folders you want to work on.

## Process

If you'd like to contribute, please follow this process. If you disagree with the process or would like to change it, just open an issue or talk to me [on slack](https://draftjs.herokuapp.com).

1. Plugins go into the `packages` folder. Plugins are basic building blocks, they don't cater to a specific usecase, but should be used as composable building blocks for your draft js app. Generally I'm trying to avoid any styling and leave that up to user land. Usage of render props and inversion of control is encouraged, if you're not sure what I mean, please have a peak at [Kent's video](https://www.youtube.com/watch?v=5k2YasGFX7o) building [downshift](https://github.com/paypal/downshift).
2. We use [flow](https://flow.org/) for type checking.
3. Examples are our playground for trying out packages we're working out and building out different usecases. standalone `create-react-app` apps found in the examples folder. To add an example, just copy an existing example and modify it to suit your needs.

## Working on Documentation

We use gitbook for documentation, in order to add documentation for a package you're working on, you can just add a readme in the package folder, and link it from the main readme.

To show the docs in your browser while writing them, run `npm run docs`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/11409069?v=4" width="100px;"/><br /><sub><b>blackywkl</b></sub>](http://freedomlang.com)<br />[💻](https://github.com/draft-js-plugins/next/commits?author=freedomlang "Code") [📖](https://github.com/draft-js-plugins/next/commits?author=freedomlang "Documentation") [💡](#example-freedomlang "Examples") | [<img src="https://avatars2.githubusercontent.com/u/1166143?v=4" width="100px;"/><br /><sub><b>Hosmel Quintana</b></sub>](http://hosmelq.com)<br />[💻](https://github.com/draft-js-plugins/next/commits?author=hosmelq "Code") | [<img src="https://avatars0.githubusercontent.com/u/1326431?v=4" width="100px;"/><br /><sub><b>Rose</b></sub>](http://r.osey.me)<br />[💻](https://github.com/draft-js-plugins/next/commits?author=Rosey "Code") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
