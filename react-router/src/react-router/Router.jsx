// https://github.com/remix-run/react-router/blob/v5.3.0/packages/react-router/modules/Router.js
import React from 'react'
import RouterContext from './RouterContext'

class Router extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      location: props.history.location,
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}

export default Router
