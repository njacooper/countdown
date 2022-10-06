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
      <div className='grid grid-cols-6 md:grid-cols-9 gap-1 md:gap-4 items-center text-center uppercase'>
        {alphabet.map(letter => (
          <button
            key={letter}
            className='raisedButton aspect-square uppercase text-xl lg:text-2xl mb-3 p-0'
            disabled={lettersSelectionDisabled}
            onClick={() => {
              handleAddLetter(letter)
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    </>
  )
}

export default LetterSelection
