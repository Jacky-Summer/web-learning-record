import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from './react-router-dom'
import { Route } from 'react-router-dom'
import Home from './components/Home'
import Detail from './components/Detail'
import List from './components/List'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Route path="/home" component={Home}></Route>
    <Route path="/detail" component={Detail}></Route>
    <Route path="/list" component={List}></Route>
  </BrowserRouter>
)
