import React, { Component } from 'react';

import './SendMessageForm.css'

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    return (
      <div className="sendmessage-container">
        <div>
          <form className="sendmessage-form" onSubmit={this.onSubmit.bind(this)}>
            <input 
              type="text"
              className="sendmessage-input"
              placeholder="Type message here then hit Enter"
              onChange={this.onChange.bind(this)}
              value={this.state.text}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SendMessageForm;
