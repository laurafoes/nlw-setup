import { useRoute } from "@react-navigation/native"
import { View, ScrollView, Text, Alert } from "react-native"
import BackButton from "../components/BackButton"
import dayjs from 'dayjs'
import clsx from 'clsx'
import ProgressBar from "../components/ProgressBar"
import Checkbox from "../components/Checkbox"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { api } from "../lib/axios"
import { generateProgressPercentage } from "../utils/generate-progress-percentage"
import NoHabitsYet from "../components/NoHabitsYet"

interface HabitProps {
  date: string
}

interface DayInfoProps {
    completedHabits: string,
    possibleHabits: {
        id: string,
        title: string
    }[]
}

function Habit() {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ dayInfo, setDayInfo ] = useState<DayInfoProps>()
    const [ completedHabits, setCompletedHabits ] = useState<string[]>([])

    const route = useRoute()
    const { date } = route.params as HabitProps;

    const parsedDate = dayjs(date)
    const isPastDate = parsedDate.endOf('day').isBefore(new Date());
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    const fetchHabits = async () => {
        try {
          setIsLoading(true)
    
          const res = await api.get('/day', { params: { date } });
          setDayInfo(res.data)
          setCompletedHabits(res.data.completedHabits)

        } catch (error) {
          console.log(error)
          Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos.')

        } finally {
            setIsLoading(false)
        }
    }

    const handleToggleHabit = async (habitId: string) => {
        if(completedHabits.includes(habitId)) {
            setCompletedHabits( completedHabits.filter(habit => habit !== habitId))
        } else {
            setCompletedHabits([ ...completedHabits, habitId ])
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if(isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />
                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    { dayOfWeek }
                </Text>
                <Text className="text-white font-extrabold text-3xl">
                    { dayAndMonth }
                </Text>
                <ProgressBar progress={habitsProgress} />
                <View className={clsx("mt-6", {
                    ["opacity-50"]: isPastDate
                })}>
                    { dayInfo?.possibleHabits ?
                        dayInfo.possibleHabits.map(habit => (
                            <Checkbox 
                                key={habit.id}
                                title={habit.title} 
                                checked={completedHabits.includes(habit.id)}
                                onPress={() => handleToggleHabit(habit.id)}
                                disabled={isPastDate}
                            />
                        ))
                    : <NoHabitsYet /> }
                    { isPastDate ? (
                        <Text className="text-white mt-10 text-center">
                        Você não pode editar hábitos de uma data passada.
                        </Text>) 
                    : null }
                </View>
            </ScrollView>
        </View>
    )
}

export default Habit
