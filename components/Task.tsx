import React from 'react'
import { TaskModel } from '../utils/models'

type TaskProps = {
index:number;
task:TaskModel;
}

function Task({index, task}: TaskProps) {
  return (
    <article className='relative rounded w-200 pl-3 pr-7 pt-3 pb-1 shadow-sm cursor-grab'>


    </article>
  )
}

export default Task 