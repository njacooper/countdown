import React, { useState } from 'react'

function SelectedLetters (props) {
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

  function handleRemoveLetter (index) {
    console.log('remove letter at index: ', index)
  }
  return (
    <>
      <div className='grid grid-cols-9 gap-4 items-center text-center mb-6 empty:bg-red-400'>
        {lettersContainers.map((letter, index) =>
          letter != '' ? (
            <React.Fragment key={index}>
              <div className='p-2 py-4 bg-blue-800 text-white border-2 border-blue-100 border-solid font-bold relative h-20 uppercase items-center justify-center flex flex-col'>
                <button
                  className='font-bold text-xs rounded-full w-6 h-6 bg-red-600 text-white absolute -top-3 -right-3 p-0'
                  onClick={() => {
                    handleRemoveLetter(index)
                  }}
                >
                  -
                </button>
                {letter}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>
              <div className='p-2 py-4 bg-blue-800 text-white border-2 border-blue-100 border-solid font-bold relative h-20'></div>
            </React.Fragment>
          )
        )}
      </div>
    </>
  )
}

export default SelectedLetters
