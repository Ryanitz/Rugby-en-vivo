import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
      </div>
    );
  }
}

export default Loading
