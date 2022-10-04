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
    border: '4px solid white'
  }

  return (
    <>
      <div style={style} className='bg-blue-500 relative h-20'>
        <div className='' ref={setNodeRef}>
          <button
            onClick={() => props.handleRemove(props)}
            className='rounded-full p-0 -top-2 -right-2 absolute bg-red-500 text-white text-base w-6 h-6'
          >
            -
          </button>

          <div
            className='uppercase text-4xl font-bold text-white h-20 flex flex-col justify-center items-center'
            {...listeners}
            {...attributes}
          >
            {props.value}

            <div className='absolute text-sm bottom-1 right-1'>
              {getLetterPoints(props.value)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnswerItem
