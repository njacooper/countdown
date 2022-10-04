import { Routes, Route, Link } from 'react-router-dom'

function Navigation () {
  return (
    <>
      <div className='sticky top-0 bg-blue-900 z-50 flex justify-center w-screen py-1 shadow-sm h-16'>
        <div className='w-full flex justify-center font-bold'>
          <div className='flex py-4'>
            <ul className='justify-around flex h-full items-center gap-10 text-white'>
              <li className='flex'>
                <Link to='/'>Game</Link>
              </li>
              <li className='flex'>
                <Link to='/manual'>Manual Letters</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
