import { useState } from 'react'

import LetterSelection from '../components/LetterSelection'

function ManualLetters () {
  const [lettersSelectionDisabled, setLettersSelectionDisabled] = useState(
    false
  )

  function handleAddLetter (letter) {
    console.log('handle add letter', letter)
  }

  return (
    <>
      <div className='bg-blue-400 w-[950px] mx-auto py-4 px-4 mt-6 m-2'>
        <div className='p-4'>
          <h2 className='font-bold text-2xl py-4'>Alphabet</h2>
          <LetterSelection
            disabled={lettersSelectionDisabled}
            handleAddLetter={handleAddLetter}
          />
        </div>
      </div>
    </>
  )
}

export default ManualLetters
