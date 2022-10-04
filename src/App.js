import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import './output.css'

import Navigation from './components/Navigation'

import Game from './pages/Game'
import ManualLetters from './pages/ManualLetters'

function App () {
  return (
    <div className='bg-blue-500 min-h-screen'>
      <main className='bg-blue-400'>
        <Navigation />
        <div className='mx-auto box-content'>
          <Routes>
            <Route path='/' element={<Game />} />
            <Route path='manual' element={<ManualLetters />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
