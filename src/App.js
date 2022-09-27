import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Game from './pages/Game'
import ManualLetters from './pages/ManualLetters'

function App () {
  return (
    <div>
      <main>
        <Routes>
          <Route path='/' element={<Game />} />
          <Route path='manual' element={<ManualLetters />} />
        </Routes>

        <nav>
          <Link to='/'>Game</Link>
          <Link to='/manual'>Manual Letters</Link>
        </nav>
      </main>
    </div>
  )
}

export default App
