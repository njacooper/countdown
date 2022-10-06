import React, { useEffect, useState } from 'react'

function SelectedLetters (props) {
  const [letters, setLetters] = useState([])
  const [lettersContainers, setLettersContainers] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ])

  useEffect(() => {
    setLetters(props.letters)
  }, [props.letters])

  useEffect(() => {
    let newLettersContainers = ['', '', '', '', '', '', '', '', '']
    letters.map((letter, index) => {
      newLettersContainers[index] = letter
    })
    setLettersContainers(newLettersContainers)
  }, [letters])

  function handleRemoveLetter (index) {
    props.handleRemoveLetter(index)
  }
  return (
    <>
      <div className='grid grid-cols-9 gap-2 items-center text-center mb-6 empty:bg-red-400'>
        {lettersContainers.map((letter, index) =>
          letter != '' ? (
            <React.Fragment key={index}>
              <div className='h-20 lg:h-24 rounded-xl lg:aspect-square bg-blue-500 text-white border-2 border-blue-500 border-solid font-bold relative uppercase'>
                <div className='bg-blue-800 rounded-t-xl py-1'>
                  <button
                    className='font-bold text-[10px] lg:text-[12px] rounded-full w-5 h-5 p-0 bg-red-600 hover:bg-red-800 text-white'
                    onClick={() => {
                      handleRemoveLetter(index)
                    }}
                  >
                    -
                  </button>
                </div>
                <div className='bg-blue-700 p-2 rounded-b-xl h-12 lg:h-[2.5em] text-2xl'>
                  {letter}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              <div className='h-20 lg:h-24 rounded-xl lg:aspect-square p-2 py-4 bg-blue-800 text-white border-2 border-blue-500 border-solid font-bold relative'></div>
            </React.Fragment>
          )
        )}
      </div>
    </>
  )
}

export default SelectedLetters
