import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './output.css'

import Navigation from './components/Navigation'

import Game from './pages/Game'
import ManualLetters from './pages/ManualLetters'

function App () {
  return (
    <div className='bg-blue-500 min-h-screen'>
      <main className='bg-[#a0c9ff] min-h-screen flex flex-col'>
        <Navigation />
        <div className='mx-auto h-full flex-grow'>
          <Routes>
            <Route path='/' element={<Game />} />
            <Route path='manual' element={<ManualLetters />} />
          </Routes>
        </div>
        <footer className='mainFooter flex justify-center'>
          <div className='footerWrapper w-[950px] flex justify-center'>
            <div className='footerLinks flex'>
              <Link href='https://nealcooper.dev'>
                <a className='text-white hover:underline'>Made by Neal Cooper</a>
              </Link>
              <Link href='https://www.buymeacoffee.com/nealcooper'>
                <a className='flex text-white hover:underline'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1'></path>
                    <path d='M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'></path>
                    <path d='M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'></path>
                    <path d='M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z'></path>
                    <path d='M16.746 16.726a3 3 0 1 0 .252 -5.555'></path>
                  </svg>
                  <span className='ml-1'>Buy Me a Coffee</span>
                </a>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
