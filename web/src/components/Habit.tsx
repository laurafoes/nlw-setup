import React from 'react'

interface HabitProps {
    completed: number
}

function Habit(props: HabitProps) {
  return (
    <div className='bg-zinc-900 w-10 h-10 text-white m-2 flex justify-center items-center'>
        {props.completed}
    </div>
  )
}

export default Habit
