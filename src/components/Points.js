import { useState, useEffect } from 'react'

import { getLetterPoints } from '../lib/letters'

import { findWord } from '../lib/words'

function Points (props) {
  const [points, setPoints] = useState(0)
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    if (props.answer) {
      let word = ''
      props.answer.map(letter => {
        word += letter.value
      })
      setAnswer(word)
    } else {
      setAnswer('')
    }
  }, [props.answer])

  useEffect(() => {
    let wordExists = findWord(answer)

    if (answer.length > 2 && wordExists) {
      let newPoints = 0
      for (let i = 0; i < answer.length; i++) {
        newPoints += +getLetterPoints(answer[i])
      }
      setPoints(newPoints)
    } else {
      setPoints(0)
    }
  }, [answer])

  return (
    <>
      <p className='w-fit p-4 text-white bg-blue-500 border-4 border-blue-100 border-solid text-5xl font-bold'>
        {points && points}
      </p>
    </>
  )
}

export default Points
