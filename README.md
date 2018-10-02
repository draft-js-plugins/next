# draft-js-plugins@next
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

# DISCLAIMER: This project isn't usable yet

This is at an experimental stage, mostly this project isn't complete and ready for use. If you're interested in participating, whether it's code or just debate, please open an issue, hit me up on twitter or the [draft js slack channel](https://draftjs.herokuapp.com/)

## Rationale - A component based architecture

Draft js plugins is great. But currently has a bunch of problems, some of which are entirely our own doing, building a plugin system that does more than it should.


1. We have our own state management (sometimes more than 1 version of state management 😢. This causes a whole class of bugs
2. Plugins have their own custom lifecycle, another class of bugs 😢 
3. Composing plugins really sucks 😕 (At some point we introduced a `decorator` “pattern” to remedy this, which is super confusing because it has nothing to do with draft js decorators)
4. The API for most of the plugins is too big and growing, making it exponentially hard to maintain and develop further.
5. Plugins aren’t very `reacty`

Having thought this over for almost a year now I think the best way forward would be to freeze draft js development (support yes, new features no) and start working on a successor with a different architecture: One that is component based.


1. Components already have state 😒 
2. Components already have a lifecycle 😒
3. Components provide great patterns for composition, and everyone who uses react is familiar with at least a handful of these patterns.
4. Using component patterns over massive configuration objects, would make the API much smaller and easier to test, follow, maintain

Now some examples, if you have any questions ideas lmk!

### EditorStateContainer

The EditorContainer would be a container for the editorState, as well as all the properties a draft js Editor can hold.tt

### Mentions

```js
<EditorStateContainer editorState={this.state.editorState} onChange={this.onChange}>
  <Suggestions trigger="@" getSuggestions={this.fetchUsers}/>
  <Editor />
</EditorStateContainer>
```


### Toolbars

In this case we use a text selection popover for a medium style toolbar, but this could be anything

```js
<EditorStateContainer editorState={this.state.editorState} onChange={this.onChange}>
  <TextSelectionPopover>
    <Bold />
    <Italic />
    <Underline />
    <Strikethrough />
  </TextSelectionPopover>
  <Editor />
</EditorStateContainer>
```


### Atomic blocks

```jsx
<EditorContainer>
  <Editor />

  <AtomicBlock type="IMAGE">
    {(props) => <Image {...props} />}
  </AtomicBlock>

  <AtomicBlock type="VIDEO">
    {(props) => <Video {...props} />}
  </AtomicBlock>
</EditorContainer>
```

### File

```jsx
<EditorContainer>
  <Editor />

  <Upload
    onSelectFile={}
  >
    {() => (
      <input type="file" />
    )}
  </Upload>
</EditorContainer>
```



## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/11409069?v=4" width="100px;"/><br /><sub><b>blackywkl</b></sub>](http://freedomlang.com)<br />[💻](https://github.com/draft-js-plugins/next/commits?author=freedomlang "Code") [📖](https://github.com/draft-js-plugins/next/commits?author=freedomlang "Documentation") [💡](#example-freedomlang "Examples") | [<img src="https://avatars2.githubusercontent.com/u/1166143?v=4" width="100px;"/><br /><sub><b>Hosmel Quintana</b></sub>](http://hosmelq.com)<br />[💻](https://github.com/draft-js-plugins/next/commits?author=hosmelq "Code") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!