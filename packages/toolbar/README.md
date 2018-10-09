# @djsp/toolbar

> Toolbar for draft js plugins

## Install

```bash
npm install --save @djsp/toolbar
```

## Usage

```jsx
<EditorContainer>
  <Editor />
  
  <!-- static toolbar with default buttons -->
  <Toolbar />

  <!-- static toolbar with default buttons -->
  <Toolbar>
  {
    () => {
      return <div>
        <HeadlineOneButton />
        <BoldButton />
      </div>
    }
  }
  </Toolbar>

  <!-- inline toolbar with default buttons -->
  <Toolbar toolbarPosition="inline"/>

  <!-- side toolbar(left/right) with default buttons -->
  <Toolbar toolbarPosition="left"/>
</EditorContainer>
```

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
