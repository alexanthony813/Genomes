import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import { logIn } from '../actions/login.js';
// import component for viewing 

export default class Index extends Component {
  componentDidMount () {
    //execute a function from this.props here ex. this.props.requestLogIn
    //this.props.requestLogIn will be imported from actions
    this.props.logIn();
  }

  handleSubmit () {
    console.log('this : ', this);
    console.log('yay submit!');
  }

  render () {
    return (
      <div className="InitialLoad">
      <h1> Hello World! </h1>

      <RaisedButton onClick={logIn} label="Sign in with 23AndMe" />
      </div>
    )
  }
};

export default connect(
  () => ({}),
  { logIn }
  // connect redux to actions being imported into container
)(Index);
