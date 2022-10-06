import { useEffect, useState, useRef } from 'react'
import { cloneDeep } from 'lodash'

import LetterSelection from '../components/LetterSelection'

import SelectedLetters from '../components/SelectedLetters'

import Results from '../components/Results'

const worker = new Worker(new URL('../worker', import.meta.url))

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
  const [results, setResults] = useState(null)

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

  //track whether results should be retrieved and loaded
  useEffect(() => {
    if (isResultsLoading == true) {
      //convert selected letters array to string
      let newLetters = letters.join()

      //post letters to web worker
      worker.postMessage(newLetters)
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
    setResults(null)
    setIsResultsLoading(false)
  }

  return (
    <>
      <div className='md:w-[950px] justify-center mx-auto pb-4 mt-4 rounded px-2'>
        <div className='py-2 pb-6'>
          <h2 className='font-bold text-2xl py-4'>Alphabet</h2>
          <h3 className='text-base text-stone-600'>
            Choose some letters from below to find words with
          </h3>
          <LetterSelection
            lettersSelectionDisabled={lettersSelectionDisabled}
            handleAddLetter={handleAddLetter}
          />

          <h2 className='mt-4 font-bold text-2xl py-4'>Letters</h2>

          <SelectedLetters
            letters={letters}
            handleRemoveLetter={handleRemoveLetter}
          />

          <button
            onClick={handleFindWords}
            className='raisedButton text-3xl font-bold'
          >
            Find Words
          </button>

          <button
            onClick={handleClear}
            className='raisedButton text-3xl font-bold ml-4'
          >
            Clear
          </button>
        </div>

        {results !== null ? (
          <div className='bg-stone-50 mt-6 mb-6 rounded'>
            <h2 className='text-2xl p-4 font-bold'>Found Words:</h2>
            <div className='p-4 bg-stone-200 rounded-b'>
              {isResultsLoading ? (
                <p>Loading...</p>
              ) : (
                <Results results={results} />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default ManualLetters
