import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './elements/Header'
import Months from './pages/Home/Months'
import AddMonths from './pages/Home/AddMonths'
import Home from './pages/Home/index'
import Moves from './pages/Moves'
import '../src/pages/Home/Home.css'
import '../src/elements/Header.css'
import './App.css'
import '../src/pages/Moves.css'


function App() {
  return (
    <Router>
      <div className='contain'>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/moves/:data' component={Moves} />
      </div>
    </Router>
  );
}

export default App
