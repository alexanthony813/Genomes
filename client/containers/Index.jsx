import React, { Component } from 'react';
import { connect } from 'react-redux';
// import component for viewing 

export default class Index extends Component {
  componentDidMount () {
    //execute a function from this.props here ex. this.props.requestLogIn
    //this.props.requestLogIn will be imported from actions
  }

  render () {
    return (
      <div className="InitialLoad">
      <h1> Hello World! </h1>
      </div>
    )
  }
};

export default connect(
  () => ({})
  // connect redux to actions being imported into container
)(Index);
