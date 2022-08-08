import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Route } from './react-router-dom'
import Home from './components/Home'
import Detail from './components/Detail'
import List from './components/List'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <Router>
      {/* <ul>
        <li>
          <Link to="/detail">跳转到Detail</Link>
        </li>
        <li>
          <Link to="/list">跳转到List</Link>
        </li>
      </ul> */}
      <Route path="/home" component={Home}></Route>
      <Route path="/detail" component={Detail}></Route>
      <Route path="/list" component={List}></Route>
    </Router>
  </div>
)
