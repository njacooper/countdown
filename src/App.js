import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import './output.css'

import Navigation from './components/Navigation'

import Game from './pages/Game'
import ManualLetters from './pages/ManualLetters'

function App () {
  return (
    <div className='bg-blue-500'>
      <main>
        <Routes>
          <Route path='/' element={<Game />} />
          <Route path='manual' element={<ManualLetters />} />
        </Routes>

        <Navigation />
      </main>
    </div>
  )
}

export default App
