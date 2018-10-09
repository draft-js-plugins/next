// @flow
import React, { Component } from 'react'
import { RichUtils } from 'draft-js'
import unionClassNames from 'union-class-names'
import { withEditorContext } from 'djs-editor'
import buttonStyles from '../styles.css'

export default ({ style, children }: { style: string, children: string | React.Node }) => {
  type Props = {
    children: () => React.Node,
  };

  class InlineStyleButton extends Component<Props> {

    static defaultProps = {
      children: (buttonnApi) => {
        const className = buttonnApi.styleIsActive ? unionClassNames(buttonStyles.button, buttonStyles.active) : buttonStyles.button;

        return <button
          className={className}
          onClick={buttonnApi.toggleStyle}
          type="button"
          children={children}
        />
      }
    }

    toggleStyle = (event: SyntheticEvent<>) => {
      const {
        editorProps: { editorState },
        pluginMethods: { setEditorState }
      } = this.props;
      event.preventDefault();
      setEditorState(
        RichUtils.toggleInlineStyle(
          editorState,
          style
        )
      );
    }

    preventBubblingUp = (event: SyntheticEvent<>) => { event.preventDefault(); }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => {
      const {
        editorProps: { editorState },
      } = this.props;
      
      return editorState.getCurrentInlineStyle().has(style);
    }

    render() {
      return (
        <div
          className={buttonStyles.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >{this.props.children({
          styleIsActive: this.styleIsActive(),
          toggleStyle: this.toggleStyle
        })}
        </div>
      );
    }
  }

  return withEditorContext(InlineStyleButton);
};
