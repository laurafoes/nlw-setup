import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native"
import BackButton from "../components/BackButton"
import Checkbox from "../components/Checkbox"
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useState } from 'react'

const availableWeekDays = [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

function NewHabit() {
    const [ weekdays, setWeekdays ] = useState<number[]>([])

    const handleToggle = (weekdayIndex: number) => {
        if(weekdays.includes(weekdayIndex)){
            setWeekdays(weekdays.filter(weekday => weekday !== weekdayIndex))
        } else {
            setWeekdays([ ...weekdays, weekdayIndex ])
        }
    } 

  return (
    <View className="flex-1 bg-background px-8 pt-16">
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <BackButton />
            <Text className="mt-6 text-white font-extrabold text-3xl">
                Criar hábito
            </Text>
            <Text className="mt-6 text-white font-semibold text-base">
                Qual seu comprometimento?
            </Text>
            <TextInput 
                className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                placeholderTextColor={colors.zinc[400]} 
            />
            <Text className="font-semibold mt-4 mb-3 text-white text-base">
                Qual a recorrência?
            </Text>
            { availableWeekDays.map((weekday, index) => (
                <Checkbox 
                    key={weekday}
                    title={weekday}
                    checked={weekdays.includes(index)}
                    onPress={() => handleToggle(index)}
                />
            ))}
            <TouchableOpacity
                activeOpacity={0.7}
                className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
            >
                <Feather 
                    name="check"
                    size={20}
                    color={colors.white}
                />
                <Text className="font-semibold text-base text-white ml-2">
                    Comfirmar
                </Text>
            </TouchableOpacity>
        </ScrollView>

    </View>
  )
}

export default NewHabit
