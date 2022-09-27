import { Routes, Route, Link } from 'react-router-dom'

function Navigation () {
  return (
    <>
      <nav>
        <Link to='/'>Game</Link>
        <Link to='/manual'>Manual Letters</Link>
      </nav>
    </>
  )
}

export default Navigation
