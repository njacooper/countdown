import React from 'react'
import { useState, useEffect, useReducer } from 'react'

import GameLettersSelection from '../components/GameLettersSelection'

import AnswerBox from '../components/AnswerBox'

import { getShuffledConsonants, getShuffledVowels } from '../lib/letters'

function Game () {
  //maximum number of letters in total allowed
  const [lettersMax, setLettersMax] = useState(9)
  //keep track of how many letters are remaining to be picked
  const [lettersRemaining, setLettersRemaining] = useState(9)

  //if the maximum number of vowels or consonants are picked disable their buttons
  const [vowelDisabled, setVowelDisabled] = useState(false)
  const [consonantDisabled, setConsonantDisabled] = useState(false)

  //if the maximum number of letters has been picked, also disable the auto button
  const [autoDisabled, setAutoDisabled] = useState(false)

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
    vows: getShuffledVowels(),
    cons: getShuffledConsonants(),
    letters: []
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
    //reset initial states for letters, consonants and vowels
    dispatch({ type: 'RESET' })
    setVowelDisabled(false)
    setConsonantDisabled(false)
  }

  //after every change to the state.letters, check if the vowel or consonant buttons should be disabled
  useEffect(() => {
    if (state.letters.length == 9) {
      setVowelDisabled(true)
      setConsonantDisabled(true)
      setAutoDisabled(true)
    }

    let vowels = ['a', 'e', 'i', 'o', 'u']
    let consonants = [
      'b',
      'c',
      'd',
      'f',
      'g',
      'j',
      'k',
      'l',
      'm',
      'n',
      'p',
      'q',
      's',
      't',
      'v',
      'x',
      'z',
      'h',
      'r',
      'w',
      'y'
    ]

    let consonantCount = 0
    for (let i = 0; i < consonants.length; i++) {
      consonantCount =
        consonantCount + getOccurrence(state.letters, consonants[i])
    }

    let vowelCount = 0
    for (let i = 0; i < vowels.length; i++) {
      vowelCount = vowelCount + getOccurrence(state.letters, vowels[i])
    }

    let remainingLetters = state.letters.length - lettersMax
    //max vowel == max - consonant minimum = 9 - 4 = 5
    //max cons == max - vowel min = 9 - 3 = 4

    //disable vowel button
    if ((vowelCount == 5 && lettersRemaining) || lettersRemaining == 0) {
      setVowelDisabled(true)
    }

    //disable consonant button
    if ((consonantCount == 6 && lettersRemaining) || lettersRemaining == 0) {
      setConsonantDisabled(true)
    }

    console.log('vowelCount: ', vowelCount)
    console.log('consonantCount: ', consonantCount)
  }, [state.letters])

  function getOccurrence (array, value) {
    var count = 0
    array.forEach(v => v === value && count++)
    return count
  }

  return (
    <>
      <div className='bg-blue-400'>
        <button
          disabled={consonantDisabled}
          className='text-3xl font-bold uppercase text-white p-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-opacity-30'
          onClick={handleGetConsonant}
        >
          CONSONANT
        </button>
        <button
          disabled={vowelDisabled}
          className='text-3xl font-bold uppercase text-white p-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-opacity-30'
          onClick={handleGetVowel}
        >
          VOWEL
        </button>

        <GameLettersSelection letters={state.letters} />

        <AnswerBox />

        <button
          className='text-3xl font-bold uppercase text-white p-4'
          onClick={handleReset}
        >
          RESET
        </button>
      </div>
    </>
  )
}

export default Game
