import React from 'react'
import './TasksList.css'

export default function TasksList({tasks, updateTaskCb, deleteCb}) {
  return (
      <div>
        {tasks.map((task)=> (
          <li key={task.id}>
            <span className={task.complete ? 'complete' : null}>{task.text}</span>
            <button onClick={()=> updateTaskCb(task.id)}>Toggle</button>
            <button onClick={()=> deleteCb(task.id)}>Delete</button>
          </li>
        ))}
      </div>

  )
}
