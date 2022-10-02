import React from 'react'
import { useReducer } from 'react'

import GameLettersSelection from '../components/GameLettersSelection'

import { getShuffledConsonants, getShuffledVowels } from '../lib/letters'

function Game () {
  const initialLetters = []

  const initialVows = getShuffledVowels()
  const initialCons = getShuffledConsonants()

  const reducer = (state, action) => {
    console.log('state', state)
    console.log('action', action)
    switch (action.type) {
      case 'VOWEL':
        //Get random to value within range of array
        let randVow = Math.floor(Math.random() * state.vows.length)
        //store the consonant in variable
        let vowel = state.vows[randVow]
        //remove the vowel
        state.vows.splice(randVow, 1)
        console.log('state vows: ', state.vows)
        console.log('letters: ', state.letters)
        console.log('state cons: ', state.cons)
        //return the updated 
        return {
          ...state,
          vows: state.vows,
          letters: [...state.letters, vowel]
        }
      case 'CONSONANT':
        //Get random to value within range of array
        let randCon = Math.floor(Math.random() * state.vows.length)
        //store the consonant in variable
        let consonant = state.cons[randCon]
        state.cons.splice(randCon, 1)
        console.log('state vows: ', state.vows)
        console.log('letters: ', state.letters)
        console.log('state cons: ', state.cons)
        return {
          ...state,
          cons: state.cons,
          letters: [...state.letters, consonant]
        }

      case 'RESET':
        return initialState
      default:
        return state
    }
  }

  const initialState = {
    vows: initialVows,
    cons: initialCons,
    letters: initialLetters
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  //dispatch get vowel
  const handleGetVowel = letter => {
    console.log('clicked get vowel')

    if (state.letters.length != 9) {
      dispatch({ type: 'VOWEL' })
    }
  }

  //dispatch get consonant
  const handleGetConsonant = letter => {
    console.log('clicked get consonant')

    if (state.letters.length != 9) {
      dispatch({ type: 'CONSONANT' })
    }
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
        <GameLettersSelection letters={state.letters} />
      </div>
    </>
  )
}

export default Game
