import React, { Component } from "react";
import ReactDOM from "react-dom";

import { EditorState, ContentState, Modifier } from "draft-js";
import { EditorContainer, Editor } from "@djsp/editor";
import Toolbar from "@djsp/toolbar";

class App extends Component {
  state = {
    editorState: EditorState.createWithContent(
      ContentState.createFromText(
        "Just type and togger style"
      )
    )
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    return (
      <div>
        <EditorContainer
          editorState={this.state.editorState}
          onChange={this.onChange}
        >
          <Editor />
          <Toolbar toolbarPosition="inline"/>
        </EditorContainer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
