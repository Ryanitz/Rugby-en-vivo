import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class CreateMatch extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        {
          !this.props.user ? (
            "Cannot create a match"
          ) : (
            "Create a match"
          )
        }

      </div>
    );
  }
}

export default CreateMatch
