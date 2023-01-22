import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from "phosphor-react"
import { useState } from 'react'

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
    const [ weekdays, setWeekdays ] = useState<number[]>([])

    const createNewHabit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleWeekdayToggle = (weekday: number) => {
        if(weekdays.includes(weekday)) {
            const removeSelectedWeekday = weekdays.filter(day => day !== weekday)
            setWeekdays(removeSelectedWeekday)
        } else {
                const addSelectedWeekday = [ ...weekdays, weekday ]
                setWeekdays(addSelectedWeekday)
        }
    }

    return (
        <form className='w-full flex flex-col mt-6' onSubmit={(e) => createNewHabit(e)}>
            <label htmlFor="title" className='font-semibold leading-tight'>
                Qual seu comprometimento?
            </label>
            <input 
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
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
                                className="flex items-center gap-3 group"
                                key={ weekday }
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
            <button type="submit" className='mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500'>
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    );
}

export default NewHabitForm;
