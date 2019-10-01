import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

ReactDom.render(<App />, document.getElementById('root'))
serviceWorker.unregister()