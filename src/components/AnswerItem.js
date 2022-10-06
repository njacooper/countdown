import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { getLetterPoints } from '../lib/letters'

const AnswerItem = props => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: '0px solid white'
  }

  return (
    <>
    
      <div style={style} className='bg-blue-800 rounded-xl relative h-24'>
        <div className='' ref={setNodeRef}>
          <div className='flex justify-center place-items-center bg-blue-600 py-1 w-full rounded-t-xl py-1'>
            
            <button
              onClick={() => props.handleRemove(props)}
              className='rounded-full p-0 justify-center bg-red-900 text-white text-base w-6 h-6'
            >
              -
            </button>
          </div>

          <div
            className='uppercase text-xl lg:text-4xl font-bold text-white flex flex-col justify-center items-center bg-blue-400 rounded-b-xl h-16'
            {...listeners}
            {...attributes}
          >
            {props.value}

            <div className='absolute text-sm bottom-1 right-1 hidden'>
              {getLetterPoints(props.value)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnswerItem
