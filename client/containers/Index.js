import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions/actions.js';
// import component for viewing 

export default class Index extends Component {
  componentDidMount () {
    //execute a function from this.props here ex. this.props.requestLogIn
    //this.props.requestLogIn will be imported from actions

    //immediately render getUser from actions
      //do something with his data
      //this.props.getUser()
  }

  //fancy d3 functions here

  render () {
    return (
      <div className="InitialLoad">
      <h1> Hello World! </h1>
      </div>
    )
  }
};

export default connect(
  () => ({}),
  { actions }
  // connect redux to actions being imported into container
)(Index);
