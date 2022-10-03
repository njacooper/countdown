import { useEffect, useState, useRef } from 'react'
import { cloneDeep } from 'lodash'

import LetterSelection from '../components/LetterSelection'

import SelectedLetters from '../components/SelectedLetters'

import Results from '../components/Results'

import { findWordsFromLetters } from '../lib/words'

function ManualLetters () {
  //valid letters for key handler
  const KEYS = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ]

  //listen to events on window element
  function useEventListener (eventName, handler, element = window) {
    //store handler in ref
    const keyHandler = useRef()

    useEffect(() => {
      keyHandler.current = handler
    }, [handler])

    useEffect(() => {
      //check if is supported
      const isSupported = element && element.addEventListener

      //if is not supported return here
      if (!isSupported) {
        return
      }

      //event listener that calls handler function inside ref
      const eventListener = event => keyHandler.current(event)

      //add event listener to window element
      element.addEventListener(eventName, eventListener)

      //remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    }, [eventName, element])
  }

  //key handler
  function handler ({ key }) {
    if (KEYS.includes(String(key))) {
      if (letters.length != 9) {
        handleAddLetter(key)
      }
    } else if (key == 'Backspace') {
      handleRemoveLetter(letters.length - 1)
    } else if (key == 'Enter') {
      handleFindWords()
    }
  }

  //run key handler
  useEventListener('keydown', handler)

  const [lettersSelectionDisabled, setLettersSelectionDisabled] = useState(
    false
  )

  //selected letters
  const [letters, setLetters] = useState([])

  //results
  const [results, setResults] = useState([])

  //is results loading
  const [isResultsLoading, setIsResultsLoading] = useState(false)

  //handle the adding of letters
  function handleAddLetter (letter) {
    let newLetters = cloneDeep(letters)
    newLetters.push(letter)
    setLetters(newLetters)
  }

  //handle the removal of letters
  function handleRemoveLetter (index) {
    let newLetters = cloneDeep(letters)

    newLetters.splice(index, 1)
    setLetters(newLetters)
  }

  //track whether the addition of more letters should be disabled or enabled
  useEffect(() => {
    if (letters.length == 9) {
      setLettersSelectionDisabled(true)
    } else {
      setLettersSelectionDisabled(false)
    }
  }, [letters])

  //track whether results should be retrieved and loaded
  useEffect(() => {
    if (isResultsLoading == true) {
      //convert selected letters array to string
      let newLetters = letters.join()

      //find words from selected letters
      let res = findWordsFromLetters(newLetters)

      //update the results
      setResults(res)
    }
  }, [isResultsLoading])

  //reset the is results loading state
  useEffect(() => {
    setIsResultsLoading(false)
  }, [results])

  //trigger the finding of words
  function handleFindWords (e) {
    setIsResultsLoading(true)
  }

  //handle clear by resetting the letters, results and results loading state
  function handleClear () {
    setLetters([])
    setResults([])
    setIsResultsLoading(false)
  }

  return (
    <>
      <div className='bg-blue-400 mx-auto py-4 mt-6'>
        <div className='p-4'>
          <h2 className='font-bold text-2xl py-4'>Alphabet</h2>
          <LetterSelection
            lettersSelectionDisabled={lettersSelectionDisabled}
            handleAddLetter={handleAddLetter}
          />

          <h2 className='font-bold text-2xl py-4'>Letters</h2>

          <SelectedLetters
            letters={letters}
            handleRemoveLetter={handleRemoveLetter}
          />

          <button onClick={handleFindWords} className='text-3xl font-bold'>
            Find Words
          </button>

          <button onClick={handleClear} className='text-3xl font-bold ml-4'>
            Clear
          </button>

          {isResultsLoading ? <p>Loading...</p> : <Results results={results} />}
        </div>
      </div>
    </>
  )
}

export default ManualLetters
