import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import LetterSelection from '../components/LetterSelection'

import SelectedLetters from '../components/SelectedLetters'

import Results from '../components/Results'

function ManualLetters () {
  const [lettersSelectionDisabled, setLettersSelectionDisabled] = useState(
    false
  )

  const [letters, setLetters] = useState([])

  const [results, setResults] = useState([])

  const [isResultsLoading, setIsResultsLoading] = useState(false)

  function handleAddLetter (letter) {
    let newLetters = cloneDeep(letters)
    newLetters.push(letter)
    setLetters(newLetters)
  }
  function handleRemoveLetter (index) {
    let newLetters = cloneDeep(letters)

    newLetters.splice(index, 1)
    setLetters(newLetters)
  }

  useEffect(() => {
    if (letters.length == 9) {
      setLettersSelectionDisabled(true)
    } else {
      setLettersSelectionDisabled(false)
    }
  }, [letters])

  function handleFindWords () {
    setIsResultsLoading(true)
  }

  function handleClear () {
    setLetters([])
    setResults([])
  }

  return (
    <>
      <div className='bg-blue-400 w-[950px] mx-auto py-4 px-4 mt-6 m-2'>
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

          {isResultsLoading ? <Results results={results} /> : <p>Loading...</p>}
        </div>
      </div>
    </>
  )
}

export default ManualLetters
