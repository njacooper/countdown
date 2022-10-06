import React from 'react'
import { useState, useEffect, useReducer } from 'react'

import Modal from 'react-modal'

import GameLettersSelection from '../components/GameLettersSelection'

import Points from '../components/Points'

import Results from '../components/Results'

import {
  getShuffledConsonants,
  getShuffledVowels,
  shuffleLetters
} from '../lib/letters'

const worker = new Worker(new URL('../worker', import.meta.url))

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
  const [results, setResults] = useState(null)

  //for use whilst results are loading
  const [isResultsLoading, setIsResultsLoading] = useState(false)

  //modal functions for the solutions modal and game rules modal
  const [showSolutionsModal, setShowSolutionsModal] = useState(false)

  //handle show solutions modal
  function handleShowSolutionsModal () {
    setShowSolutionsModal(true)
  }

  //handle close solutions modal
  function handleCloseSolutionsModal () {
    setShowSolutionsModal(false)
  }

  //styling for the solutions modal
  const solutionsBoxStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      maxHeight: '80%',
      maxWidth: '90%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1',
      padding: '0'
    }
  }

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
    setResults(null)
  }

  //start web worker
  useEffect(() => {
    worker.addEventListener('message', e => {
      console.log('received', e.data)

      //update results
      setResults(e.data)

      //set isResultsLoading back to false
      setIsResultsLoading(false)
    })
  }, [])

  //after every change to the state.letters, check if the vowel or consonant buttons should be disabled
  useEffect(() => {
    //if manually picking vowels and consonants disable the auto button
    if (state.letters.length >= 1) {
      setAutoDisabled(true)
    }

    //if all letters have been picked
    if (state.letters.length == 9) {
      //disable buttons
      setVowelDisabled(true)
      setConsonantDisabled(true)

      //set game as started
      setIsStarted(true)

      //set results as loading
      setIsResultsLoading(true)

      //find words from selected letters and update the results state
      let newLetters = state.letters.join()
      worker.postMessage(newLetters)
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
      <div className='lg:w-[950px] justify-center flex pb-2'>
        <div className='flex w-full'>
          <button
            className='raisedButton rounded-full hover:rounded-full w-fit'
            onClick={handleReset}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 64 64'
              className='stroke-2 stroke-white fill-white'
            >
              <path d='M 29.304688 6 C 28.628562 5.99325 28 6.5305156 28 7.2910156 L 28 10.371094 C 17.7734 12.258417 10 21.235533 10 32 C 10 44.131 19.869 54 32 54 C 44.131 54 54 44.131 54 32 C 54 25.04 50.650969 18.41625 45.042969 14.28125 C 44.153969 13.62525 42.899094 13.815125 42.246094 14.703125 C 41.590094 15.592125 41.779922 16.845953 42.669922 17.501953 C 47.259922 20.885953 50 26.306 50 32 C 50 41.925 41.925 50 32 50 C 22.075 50 14 41.925 14 32 C 14 23.451418 19.9965 16.290829 28 14.464844 L 28 16.708984 C 28 17.722984 29.116609 18.340781 29.974609 17.800781 L 37.316406 13.177734 C 38.184406 12.631734 38.184406 11.366312 37.316406 10.820312 L 29.974609 6.1992188 C 29.760109 6.0642188 29.530062 6.00225 29.304688 6 z'></path>
            </svg>
          </button>
        </div>
        <div className='flex'>
          <div className='w-fit flex'>
            <button
              disabled={consonantDisabled}
              className='raisedButton aspect-auto text-sm md:text-2xl px-3'
              onClick={handleGetConsonant}
            >
              CONSONANT
            </button>
            <button
              onClick={handleAuto}
              className='raisedButton aspect-auto text-sm md:text-2xl p-3'
              disabled={autoDisabled}
            >
              AUTO
            </button>

            <button
              disabled={vowelDisabled}
              className='raisedButton aspect-auto text-sm md:text-2xl p-3'
              onClick={handleGetVowel}
            >
              VOWEL
            </button>
          </div>
        </div>
      </div>

      <div>
        <GameLettersSelection
          letters={state.letters}
          isStarted={isStarted}
          updateAnswer={updateAnswer}
        />

        <div className='justify-between flex'>
          <Points answer={answer} />

          <button
            className={
              results == null
                ? 'hidden ease-in-out duration-300'
                : 'raisedButton aspect-auto text-lg md:text-2xl ease-in-out duration-300'
            }
            onClick={handleShowSolutionsModal}
          >
            See Solutions
          </button>
        </div>
      </div>

      <Modal
        isOpen={showSolutionsModal}
        onRequestClose={handleCloseSolutionsModal}
        contentLabel='Results Modal'
        ariaHideApp={false}
        style={solutionsBoxStyle}
      >
        <div className='modalHeading sticky top-0 z-50 bg-stone-200 px-4 py-2 flex justify-between'>
          <h2 className='font-bold text-2xl'>Solutions</h2>
          <button
            onClick={handleCloseSolutionsModal}
            className='p-0 bg-transparent text-3xl font-bold text-black'
          >
            x
          </button>
        </div>
        <div className='p-4'>
          {isResultsLoading ? <p>Loading...</p> : <Results results={results} />}
        </div>
      </Modal>
    </>
  )
}

export default Game
