// https://github.com/remix-run/react-router/blob/v5.3.0/packages/react-router/modules/Route.js
import React from 'react'
import RouterContext from './RouterContext'

class Route extends React.Component {
  static contextType = RouterContext

  render() {
    const { history, location } = this.context
    const { path, component: RouteComponent } = this.props
    const match = location.pathname === path
    const routeProps = { history, location }
    let element = null
    if (match) {
      element = <RouteComponent {...routeProps} />
    }
    return element
  }
}

export default Route
