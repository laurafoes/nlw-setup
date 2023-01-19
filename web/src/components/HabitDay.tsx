import React from 'react'

interface HabitProps {
    completed?: number
}

function HabitDay(props: HabitProps) {
  const { completed } = props

  return (
    <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg">

    </div> 
  )
}

export default HabitDay