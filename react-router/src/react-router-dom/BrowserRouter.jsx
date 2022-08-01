// https://github.com/remix-run/react-router/blob/v5.3.0/packages/react-router-dom/modules/BrowserRouter.js
import React from 'react'
import { Router } from 'react-router'
import { createBrowserHistory as createHistory } from 'history'

class BrowserRouter extends React.Component {
  history = createHistory(this.props)
  render() {
    return <Router history={this.history} children={this.props.children} />
  }
}

export default BrowserRouter
