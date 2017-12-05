import React, { Component } from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.js';

class Account extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <AccountsUIWrapper />
      </div>
    );
  }
}

export default Account
