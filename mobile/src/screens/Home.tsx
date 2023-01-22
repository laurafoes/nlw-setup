import { useNavigation } from "@react-navigation/native"
import { View, Text, ScrollView, Alert } from "react-native"
import { generateRangeBetweenDates } from "../utils/generate-range-between-dates"
import HabitDay, { DAY_SIZE } from "../components/HabitDay"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import Loading from "../components/Loading"
import dayjs from "dayjs"

const weekDays = [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeBetweenDates()
const minimumSummaryDates = 18 * 5
const amountOfDaysToFill = minimumSummaryDates - datesFromYearStart.length

interface Summary {
    id: string,
    date: string,
    amount: number,
    completed: number
}

interface SummaryTable extends Array<Summary>{}

function Home() {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ summary, setSummary ] = useState<SummaryTable>([])

    const { navigate } = useNavigation()

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const res = await api.get('summary')
            setSummary(res.data)
        } catch(error) {
            Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(isLoading) {
        return <Loading />
    } else {
        return (
            <View className='flex-1 bg-background px-8 py-16'>
                <Header />
                <View className='flex-row mt-6 mb-2'>
                    { 
                        weekDays.map((weekDay, index) => (
                            <Text
                                key={`${weekDay}-${index}`}
                                className='text-zinc-400 text-xl font-bold text-center mx-1'
                                style={{ width: DAY_SIZE}}
                            >
                                { weekDay }
                            </Text>
                        ))
                    }
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    { summary ?
                        <View className='flex-row flex-wrap'>
                            { 
                                datesFromYearStart.map(date => {
                                    const dayWithHabits = summary.find(day => {
                                        dayjs(date).isSame(day.date, 'day')
                                    })

                                    return (
                                        <HabitDay 
                                            date={date}
                                            amountOfHabits={dayWithHabits?.amount}
                                            amountOfCompleted={dayWithHabits?.completed}
                                            key={date.toISOString()} 
                                            onPress={ () => navigate('habit', { date: date.toISOString() }) }
                                        />
                                    )
                                }
                                )}
                            {
                                amountOfDaysToFill > 0 ? Array
                                    .from({ length: amountOfDaysToFill })
                                    .map((_, index) => (
                                        <View
                                        className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                                        style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                        key={index}
                                        /> 
                                    ))
                                : null
                            }
                        </View>
                    : null }
                </ScrollView>
          </View>
        )
    }
}

export default Home
