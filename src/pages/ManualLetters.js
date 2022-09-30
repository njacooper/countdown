import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import LetterSelection from '../components/LetterSelection'

import SelectedLetters from '../components/SelectedLetters'

function ManualLetters () {
  const [lettersSelectionDisabled, setLettersSelectionDisabled] = useState(
    false
  )

  const [letters, setLetters] = useState([])

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
        </div>
      </div>
    </>
  )
}

export default ManualLetters
