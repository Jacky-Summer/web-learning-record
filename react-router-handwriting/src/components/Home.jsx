import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <p>Home</p>
        <button onClick={() => this.props.history.push('/detail')}>跳到/detail</button>
        <button onClick={() => this.props.history.goForward()}>前进</button>
        <button onClick={() => this.props.history.goBack()}>后退</button>
      </div>
    )
  }
}
