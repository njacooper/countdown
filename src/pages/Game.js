import React from 'react'
import { useState, useEffect, useReducer } from 'react'

import GameLettersSelection from '../components/GameLettersSelection'

import Points from '../components/Points'

import Results from '../components/Results'

import {
  getShuffledConsonants,
  getShuffledVowels,
  shuffleLetters
} from '../lib/letters'

import { findWordsFromLetters } from '../lib/words'

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

  //track if the game has started
  const [isStarted, setIsStarted] = useState(false)

  const [answer, setAnswer] = useState('')

  //store results
  const [results, setResults] = useState([])

  //for use whilst results are loading
  const [isResultsLoading, setIsResultsLoading] = useState(false)

  //reducer for handling the picking of vowel and consonants along with the selected letters state
  const reducer = (state, action) => {
    switch (action.type) {
      case 'VOWEL':
        //get random to value within range of array
        let randVow = Math.floor(Math.random() * state.vows.length)
        //store the consonant in variable
        let vowel = state.vows[randVow]
        //remove the vowel
        state.vows.splice(randVow, 1)
        //return the updated state
        return {
          ...state,
          vows: state.vows,
          letters: [...state.letters, vowel]
        }
      case 'CONSONANT':
        //get random to value within range of array
        let randCon = Math.floor(Math.random() * state.vows.length)
        //store the consonant in variable
        let consonant = state.cons[randCon]
        //remove the consonant
        state.cons.splice(randCon, 1)
        //return the updated state
        return {
          ...state,
          cons: state.cons,
          letters: [...state.letters, consonant]
        }
      case 'SHUFFLE':
        //shuffle letters
        let newLettersArrangement = shuffleLetters(state.letters)
        return {
          ...state,
          letters: newLettersArrangement
        }
      case 'RESET':
        return initialState
      default:
        return state
    }
  }

  //initial game state
  const initialState = {
    vows: getShuffledVowels(),
    cons: getShuffledConsonants(),
    letters: []
  }

  //create reducer
  const [state, dispatch] = useReducer(reducer, initialState)

  //dispatch get vowel
  const handleGetVowel = letter => {
    if (state.letters.length != 9) {
      dispatch({ type: 'VOWEL' })
    }
  }

  //dispatch get consonant
  const handleGetConsonant = letter => {
    if (state.letters.length != 9) {
      dispatch({ type: 'CONSONANT' })
    }
  }

  //auto select vowels and consonants
  const handleAuto = async () => {
    //get random value for vowel count
    let randVowCount = Math.floor(Math.random() * (5 - 3) + 3)

    //get random value for consonants based on value that was choosen for vowels
    let randConsonantCount = lettersMax - randVowCount

    //pick vowels
    for (let i = 0; i < randVowCount; i++) {
      dispatch({ type: 'VOWEL' })
    }

    //pick consonants
    for (let i = 0; i < randConsonantCount; i++) {
      dispatch({ type: 'CONSONANT' })
    }

    //shuffle picked vowels and consonants
    dispatch({ type: 'SHUFFLE' })
  }

  //dispatch reset
  const handleReset = () => {
    //reset initial game state
    dispatch({ type: 'RESET' })

    //undisable any buttons
    setVowelDisabled(false)
    setConsonantDisabled(false)
    setAutoDisabled(false)

    //reset the results
    setResults([])
  }

  //after every change to the state.letters, check if the vowel or consonant buttons should be disabled
  useEffect(() => {
    //if all letters have been picked
    if (state.letters.length == 9) {
      //disable buttons
      setVowelDisabled(true)
      setConsonantDisabled(true)
      setAutoDisabled(true)

      //set game as started
      setIsStarted(true)

      //find words from selected letters and update the results state
      let newLetters = state.letters.join()
      let res = findWordsFromLetters(newLetters)
      setResults(res)
    }

    //valid vowels
    let vowels = ['a', 'e', 'i', 'o', 'u']

    //valid consonants
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

    //get consonant count from selected letters
    let consonantCount = 0
    for (let i = 0; i < consonants.length; i++) {
      consonantCount =
        consonantCount + getOccurrence(state.letters, consonants[i])
    }

    //get vowel count from selected letters
    let vowelCount = 0
    for (let i = 0; i < vowels.length; i++) {
      vowelCount = vowelCount + getOccurrence(state.letters, vowels[i])
    }

    //disable vowel button if maximum vowels picked
    if ((vowelCount == 5 && lettersRemaining) || lettersRemaining == 0) {
      setVowelDisabled(true)
    }

    //disable consonant button if maximum consonants picked
    if ((consonantCount == 6 && lettersRemaining) || lettersRemaining == 0) {
      setConsonantDisabled(true)
    }
  }, [state.letters])

  //get occurrance of a given value inside given array
  function getOccurrence (array, value) {
    var count = 0
    array.forEach(v => v === value && count++)
    return count
  }

  //update answer
  function updateAnswer (newAnswer) {
    setAnswer(newAnswer)
  }

  return (
    <>
      <div className='bg-blue-400 my-4 lg:w-[950px] px-4 justify-center mx-auto'>
        <div className='grid grid-cols-3 gap-2'>
          <button
            disabled={consonantDisabled}
            className='text-sm md:text-3xl font-bold uppercase text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-opacity-30'
            onClick={handleGetConsonant}
          >
            CONSONANT
          </button>
          <button
            onClick={handleAuto}
            className='text-sm md:text-3xl w-full disabled:bg-stone-400 disabled:text-opacity-30 disabled:cursor-not-allowed'
            disabled={autoDisabled}
          >
            AUTO
          </button>

          <button
            disabled={vowelDisabled}
            className='text-sm md:text-3xl font-bold uppercase text-white p-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-opacity-30'
            onClick={handleGetVowel}
          >
            VOWEL
          </button>
        </div>

        <GameLettersSelection
          letters={state.letters}
          isStarted={isStarted}
          updateAnswer={updateAnswer}
        />

        <div className='justify-between flex'>
          <button
            className='text-3xl font-bold uppercase text-white p-4'
            onClick={handleReset}
          >
            RESET
          </button>

          <div className='bg-blue-400 flex items-center my-2 border-4 border-solid border-blue-800'>
            <div className='font-bold text-4xl align-middle mr-6 px-4'>
              Points:
            </div>
            <Points answer={answer} />
          </div>
        </div>

        {isResultsLoading ? <p>Loading...</p> : <Results results={results} />}
      </div>
    </>
  )
}

export default Game
