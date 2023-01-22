import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface HabitListProps {
    date: Date,
    onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        created_at: string
    }>,
    completedHabits: string[]
}

function HabitList({ date, onCompletedChange }: HabitListProps) {
    const [ habitsInfo, setHabitsInfo ] = useState<HabitsInfo>()

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString()
            }
        }).then(res => {
            setHabitsInfo(res.data)
        })
    }, [])
    
    const isPast =  dayjs(date).endOf('day').isBefore(new Date())

    const handleToggle = async (habitId: string) => {
        api.patch(`/habits/${habitId}/toggle`)

        const isHabitCompleted = habitsInfo?.completedHabits.includes(habitId)
        let completedHabits: string[] = []

        if(isHabitCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [ ...habitsInfo!.completedHabits, habitId]
        }
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        })

        onCompletedChange(completedHabits.length)
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            { habitsInfo?.possibleHabits.map(habit => {
                return ( 
                    <Checkbox.Root 
                        key={habit.id}
                        onCheckedChange={() => handleToggle(habit.id)}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        disabled={isPast}
                        className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white" />
                            </Checkbox.Indicator>
                        </div>
                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                            { habit.title }
                        </span>
                    </Checkbox.Root>
                )
            })}
        </div>
    )
}

export default HabitList
