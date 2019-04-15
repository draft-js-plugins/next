import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { EditorState, convertFromRaw, Modifier } from 'draft-js'
import { EditorContainer, Editor } from '@djsp/core'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import AtomicBlock from '@djsp/atomic-block'
import './styles.css'

const rawContent = {
  blocks: [
    {
      text: 'Hey there duder',
    },
    {
      type: 'atomic',
      text: ' ',
      entityRanges: [
        {
          key: 0,
          length: 1,
          offset: 0,
        },
      ],
    },
  ],
  entityMap: {
    0: {
      data: {
        title: 'Kitten',
        src: 'https://placekitten.com/200/200',
        width: 200,
        height: 200,
      },
      mutability: 'IMMUTABLE',
      type: 'IMAGE',
    },
  },
}

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(rawContent)),
  }

  onChange = editorState => this.setState({ editorState })

  updateSizeData = (
    resizeData,
    editorState,
    setEditorState,
    block,
    selection
  ) => {
    const contentstate = editorState.getCurrentContent()

    const entityKey = block.getEntityAt(0)
    let newContentState = contentstate.mergeEntityData(entityKey, {
      width: resizeData.width,
      height: resizeData.height,
    })

    // Add the created entity to the current selection, for a new contentState
    newContentState = Modifier.applyEntity(
      newContentState,
      selection,
      entityKey
    )

    // Add newContentState to the existing editorState, for a new editorState
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'apply-entity'
    )

    setEditorState(newEditorState)
  }

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}>
          <Editor />

          <AtomicBlock type="image">
            {({
              isFocused,
              selection,
              block,
              blockProps: {
                src,
                title,
                width = 200,
                height = 200,
                editorState,
                setEditorState,
              },
            }) => {
              return isFocused ? (
                <ResizableBox
                  width={width}
                  height={height}
                  lockAspectRatio={true}
                  onResize={(event, data) =>
                    this.updateSizeData(
                      data.size,
                      editorState,
                      setEditorState,
                      block,
                      selection
                    )
                  }>
                  <img className="imgBLock focused" src={src} alt={title} />
                </ResizableBox>
              ) : (
                <img
                  className="imgBLock"
                  src={src}
                  alt={title}
                  style={{ width, height }}
                />
              )
            }}
          </AtomicBlock>
        </EditorContainer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
