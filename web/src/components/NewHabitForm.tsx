import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from "phosphor-react"
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

const availableWeekDays = [ 
    'Domingo', 
    'Segunda-feira', 
    'Terça-feira', 
    'Quarta-feira', 
    'Quinta-feira', 
    'Sexta-feira', 
    'Sábado'
]


function NewHabitForm() {
    const [ title, setTitle ] = useState<string>('')
    const [ weekDays, setWeekDays ] = useState<number[]>([])

    const createNewHabit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        
    if(!title || weekDays.length === 0) {
        return
      }
  
      await api.post('habits', {
        title,
        weekDays
      })
  
      setTitle('')
      setWeekDays([])
  
      alert('Hábito criado com sucesso!')
    }

    const handleWeekdayToggle = (weekday: number) => {
        if(weekDays.includes(weekday)) {
            const removeSelectedWeekday = weekDays.filter(day => day !== weekday)
            setWeekDays(removeSelectedWeekday)
        } else {
                const addSelectedWeekday = [ ...weekDays, weekday ]
                setWeekDays(addSelectedWeekday)
        }
    }
    useEffect(() => {
        console.log( title, weekDays)
    })

    return (
        <form className='w-full flex flex-col mt-6' onSubmit={createNewHabit}>
            <label htmlFor="title" className='font-semibold leading-tight'>
                Qual seu comprometimento?
            </label>
            <input 
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
            />
            <label htmlFor="" className='font-semibold leading-tight mt-4'>
                Qual a recorrência?
            </label>
            <div className="flex flex-col gap-2 mt-3">
                    { availableWeekDays.map((weekday, index) => {
                        return (
                            <Checkbox.Root 
                                className="flex items-center gap-3 group focus:outline-none"
                                key={ weekday }
                                checked={weekDays.includes(index)}
                                onCheckedChange={() => handleWeekdayToggle(index)}
                            >
                                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
            
                                    <Checkbox.Indicator>
                                        <Check size={20} className="text-white" />
                                    </Checkbox.Indicator>
                                </div>
                                <span className='text-xl text-white leading-tight'>
                                    { weekday }
                                </span>
                            </Checkbox.Root>
                        )
                    })}
            </div>
            <button 
                type="submit" 
                className='mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors'
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    );
}

export default NewHabitForm;
