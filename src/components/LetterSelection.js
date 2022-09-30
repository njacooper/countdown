import { useState, useEffect } from 'react'

function LetterSelection (props) {
  const [alphabet] = useState([
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
  ])

  const [lettersSelectionDisabled, setLettersSelectionDisabled] = useState(
    false
  )

  useEffect(() => {
    setLettersSelectionDisabled(props.lettersSelectionDisabled)
  }, [props.lettersSelectionDisabled])

  function handleAddLetter (letter) {
    props.handleAddLetter(letter)
  }

  return (
    <>
      <div className='grid grid-cols-9 gap-4 items-center text-center uppercase'>
        {alphabet.map(letter => (
          <div
            key={letter}
            className='h-20 p-2 py-4 bg-blue-800 text-white border-2 border-blue-100 border-solid font-bold relative items-center justify-center flex flex-col'
          >
            <button
              disabled={lettersSelectionDisabled}
              className='font-bold text-xs rounded-full w-6 h-6 bg-green-600 text-white absolute -top-3 -right-3 p-0 disabled:bg-stone-400 disabled:cursor-not-allowed'
              onClick={() => {
                handleAddLetter(letter)
              }}
            >
              +
            </button>
            {letter}
          </div>
        ))}
      </div>
    </>
  )
}

export default LetterSelection
