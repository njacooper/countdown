import React from 'react'
import { useSortable } from '@dnd-kit/sortable'

const AnswerItem = props => {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useSortable({ id: props.id })

  return (
    <>
      <div className='bg-blue-500 relative h-20'>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default AnswerItem
