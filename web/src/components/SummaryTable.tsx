import { generateRangeBetweenDates } from "../utils/generate-range-between-dates";
import HabitDay from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateRangeBetweenDates()

const minimumSummaryDates = 18 * 7
const amountOfDaysToFill = minimumSummaryDates - summaryDates.length 

function SummaryTable() {
  return (
    <div className="w-full flex">
        <div className="grid grid-rows-7 grid-flow-row gap-3">
            { weekDays.map((weekday, index) => {
                return(
                    <div 
                        className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
                        key={`${weekday}-${index}`}
                    >
                        {weekday}
                    </div>
                )
            })}
        </div>
        <div className="grid grid-rows-7 grid-flow-col gap-3">
            { summaryDates.map(date => {
                return (
                    <HabitDay 
                        amount={5} 
                        completed={3} 
                        key={date.toString()} 
                    />
                )
            })}
            { amountOfDaysToFill > 0 ? Array.from({ length: amountOfDaysToFill }).map((_, index) => {
                return(
                    <div 
                        className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                        key={index}
                    />
                )
            }) : null }
            <HabitDay 
                amount={10} 
                completed={1} 
            />
        </div>
    </div>
  )
}

export default SummaryTable;
