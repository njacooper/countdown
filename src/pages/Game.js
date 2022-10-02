import React from 'react'
import { useReducer } from 'react'

import GameLettersSelection from '../components/GameLettersSelection'

function Game () {
  const initialLetters = []

  const reducer = (state, action) => {
    switch (action.type) {
      case 'VOWEL':
        return [...initialLetters]
      case 'CONSONANT':
        return [...initialLetters]
      case 'RESET':
        return [...initialLetters]
      default:
        return state
    }
  }

  const [letters, dispatch] = useReducer(reducer, initialLetters)

  //dispatch vowel
  const handleGetVowel = letter => {
    console.log('clicked get vowel')
    dispatch({ type: 'VOWEL' })
  }

  //dispatch consonant
  const handleGetConsonant = letter => {
    console.log('clicked get consonant')
    dispatch({ type: 'CONSONANT' })
  }

  //dispatch reset
  const handleReset = () => {
    console.log('clicked reset')
    dispatch({ type: 'RESET' })
  }

  return (
    <>
      <div className='bg-blue-400'>
        <button
          className='text-3xl font-bold uppercase text-white p-4'
          onClick={handleGetConsonant}
        >
          CONSONANT
        </button>
        <button
          className='text-3xl font-bold uppercase text-white p-4'
          onClick={handleGetVowel}
        >
          VOWEL
        </button>
        <button
          className='text-3xl font-bold uppercase text-white p-4'
          onClick={handleReset}
        >
          RESET
        </button>
        <GameLettersSelection letters={letters} />
      </div>
    </>
  )
}

export default Game
