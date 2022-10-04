import React, { useEffect, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'

import AnswerItem from './AnswerItem'

import { arrayMove as dndKitArrayMove } from '@dnd-kit/sortable'

export const arrayMove = (array, oldIndex, newIndex) => {
  return dndKitArrayMove(array, oldIndex, newIndex)
}

function AnswerBox (props) {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  const EmptyCells = () => {
    let emptyCellCount = 9 - items.length

    let emptyCells = []

    for (let i = 0; i < emptyCellCount; i++) {
      emptyCells.push(
        <div
          key={i}
          className='bg-blue-400 relative h-20 m-2 shadow-[inset_0_-2px_4px_rgba(0.2,0.2,0.2,0.4)]'
        ></div>
      )
    }

    return emptyCells
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          id={'grid-sort-contextbasic'}
          items={items}
          strategy={horizontalListSortingStrategy}
          collisionDetection={closestCenter}
        >
          <div className='grid grid-cols-9 bg-blue-100 gap-1 h-24'>
            {items.map(item => (
              <React.Fragment key={item.id}>
                <div className=' relative h-20 m-2'>
                  <AnswerItem
                    handle={true}
                    key={item?.id}
                    id={item?.id}
                    value={item?.value}
                    handleRemove={props.handleRemove}
                  ></AnswerItem>
                </div>
              </React.Fragment>
            ))}

            <EmptyCells />
          </div>
        </SortableContext>
      </DndContext>
    </>
  )

  function handleDragEnd (event) {
    console.log('hand drag end in sort', event)
    const { active, over } = event

    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.map(i => i.id).indexOf(active.id)
        const newIndex = items.map(i => i.id).indexOf(over.id)

        props.updateItems(arrayMove(items, oldIndex, newIndex))
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}

export default AnswerBox
