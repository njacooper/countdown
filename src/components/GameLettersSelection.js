import React, { useEffect, useState } from 'react'

import { cloneDeep } from 'lodash'
import AnswerBox from './AnswerBox'
import Points from './Points'
import { getLetterPoints } from '../lib/letters'

function GameLettersSelection (props) {
  //choosen vowels and consonants
  const [letters, setLetters] = useState([])

  //letters added for answer
  const [answerLetters, setAnswerLetters] = useState([])

  //track if the game has started
  const [isStarted, setIsStarted] = useState(false)

  //containers for storing each of the choosen vowels and consonants
  const [containerCount, setContainerCount] = useState(9)
  const [containers, setContainers] = useState([])

  //original items array
  const originalItems = [
    { id: '1', container: '1', value: '' },
    { id: '2', container: '2', value: '' },
    { id: '3', container: '3', value: '' },
    { id: '4', container: '4', value: '' },
    { id: '5', container: '5', value: '' },
    { id: '6', container: '6', value: '' },
    { id: '7', container: '7', value: '' },
    { id: '8', container: '8', value: '' },
    { id: '9', container: '9', value: '' }
  ]

  //array of items for storing a letter and its associated container
  const [items, setItems] = useState([
    { id: '1', container: '1', value: '' },
    { id: '2', container: '2', value: '' },
    { id: '3', container: '3', value: '' },
    { id: '4', container: '4', value: '' },
    { id: '5', container: '5', value: '' },
    { id: '6', container: '6', value: '' },
    { id: '7', container: '7', value: '' },
    { id: '8', container: '8', value: '' },
    { id: '9', container: '9', value: '' }
  ])

  //create an array of containers as large as the container count value
  useEffect(() => {
    let newContainers = []
    let id = 1
    for (let i = 0; i < containerCount; i++) {
      newContainers.push(id)
      id++
    }
    setContainers(newContainers)
  }, [containerCount])

  //updated letters on change to prop
  useEffect(() => {
    setLetters(props.letters)
  }, [props.letters])

  //updated isStarted on change to prop
  useEffect(() => {
    setIsStarted(props.isStarted)
  }, [props.isStarted])

  //when letters updates re-create the items array
  useEffect(() => {
    let newItems = cloneDeep(originalItems)
    letters.map((letter, lettersIndex) => {
      newItems.find((item, itemsIndex) => {
        if (itemsIndex == lettersIndex) {
          item.value = letter
        }
      })
    })
    setItems(newItems)
  }, [letters])

  //handle the adding of a letter to the answer component
  function handleAdd (id) {
    console.log('adding: ', id)
    let picked = items.find(item => {
      return item.id == id
    })
    console.log('picked: ', picked.value)

    //append the picked letter to the answer state
    let newAnswerLetters = cloneDeep(answerLetters)
    newAnswerLetters.push(picked)
    setAnswerLetters(newAnswerLetters)

    let newItems = cloneDeep(items)

    newItems = newItems.map(item => {
      if (item.id == id) {
        item.value = ''
        return item
      } else {
        return item
      }
    })
    setItems(newItems)
  }

  function updateItems (items) {
    setAnswerLetters(items)
  }

  function handleRemove (itemToRemove) {
    console.log('received in handle remove', itemToRemove)

    let newItems = cloneDeep(items)

    newItems = newItems.map(item => {
      if (item.id == itemToRemove.id) {
        item.value = itemToRemove.value
        return item
      }
      return item
    })
    setItems(newItems)

    let newAnswerLetters = cloneDeep(answerLetters)
    newAnswerLetters = answerLetters.filter(letter => {
      return letter.id != itemToRemove.id
    })
    setAnswerLetters(newAnswerLetters)
  }

  //if letters length is zero, reset the answer letters state
  useEffect(() => {
    if (letters.length == 0) {
      setAnswerLetters([])
    }
  }, [letters])

  //pass the updated answer to the component above
  useEffect(() => {
    let newAnswer = ''
    answerLetters.map(letter => {
      newAnswer += letter.value
    })
    props.updateAnswer(newAnswer)
  }, [answerLetters])

  return (
    <>
      <div className=''>
        <div className='grid grid-cols-9 gap-1 mt-4'>
          {containers.map(container => (
            <div
              className='h-20 lg:h-24 rounded-xl lg:aspect-square bg-blue-800 text-white border-2 border-blue-900 border-solid font-bold relative'
              key={container}
            >
              {items.map(
                item =>
                  item.container == container && (
                    <div key={item.id}>
                        <>
                          {item.value != '' ? (
                            <>
                              <div className='place-items-center flex justify-center bg-blue-900 py-1 h-7 rounded-t-xl'>
                                <button
                                  onClick={() => handleAdd(container)}
                                  disabled={!isStarted}
                                  className={
                                    'rounded-full p-0 justify-center bg-blue-700 hover:bg-blue-500 text-white text-base w-6 h-6 disabled:bg-stone-400 disabled:cursor-not-allowed'
                                  }
                                >
                                  +
                                </button>
                              </div>

                              <div className='rounded-b-xl h-12 md:h-16 uppercase text-2xl lg:text-4xl font-bold text-white flex flex-col justify-center items-center bg-blue-600  empty:shadow-[inset_0_-2px_4px_rgba(0.2,0.2,0.2,0.4)]'>
                                {item.value}

                                {item.value != '' && (
                                  <div className='absolute text-sm bottom-1 right-1 hidden'>
                                    {getLetterPoints(item.value)}
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className='bg-blue-800 py-1 rounded-xl h-8 md:h-[5.7em]'></div>
                            </>
                          )}
                        </>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>

        <AnswerBox
          items={answerLetters}
          handleRemove={handleRemove}
          updateItems={updateItems}
        />
      </div>
    </>
  )
}

export default GameLettersSelection
