import { useState, useEffect } from 'react'

import { getLetterPoints } from '../lib/letters'

import { findWord } from '../lib/words'

function Points (props) {
  const [points, setPoints] = useState(0)
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    setAnswer(props.answer)
  }, [props.answer])

  useEffect(() => {
    let wordExists = findWord(answer)

    if (answer.length > 2 && wordExists) {
      let newPoints = 0
      let wordLength = answer.length
      if (wordLength == 9) {
        newPoints = 18
      } else {
        newPoints = wordLength
      }
      setPoints(newPoints)
    } else {
      setPoints(0)
    }
  }, [answer])

  return (
    <>
      <div className='flex items-center border-4 border-solid border-blue-700 bg-blue-800 rounded-xl'>
        <div className='font-bold text-xl md:text-5xl align-middle px-4 text-stone-100'>
          Points:
        </div>
        <p className='w-fit p-4 text-white text-2xl lg:text-5xl font-bold'>
          {points && points}
        </p>
      </div>
    </>
  )
}

export default Points
