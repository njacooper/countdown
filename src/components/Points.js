import { useState, useEffect } from 'react'

//import { getLetterPoints } from '../lib/letters'

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
      <div className='pointsBox'>
        <div className='pointsTitle'>
          Points:
        </div>
        <p className='pointsTotal'>
          {points && points}
        </p>
      </div>
    </>
  )
}

export default Points
