/* eslint react/no-find-dom-node:0 */

import Input from 'react-toolbox/lib/input';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ImprovedInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = null;
  }

  setInputRef = node => {
    this.inputRef = node;
  };

  focus() {
    // This is an ugly hack, until I replace react-toolbox by something that's maintained
    const domNode = ReactDOM.findDOMNode(this.inputRef);
    const input = domNode.getElementsByTagName('input')[0];
    input.focus();
  }

  render() {
    return <Input ref={this.setInputRef} {...this.props} />;
  }
}

export default ImprovedInput;
