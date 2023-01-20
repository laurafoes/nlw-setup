import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Habit from "../screens/Habit"
import Home from "../screens/Home"
import NewHabit from "../screens/NewHabit"

const { Navigator, Screen } = createNativeStackNavigator()

function AppRoutes() {
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen 
                name="home"
                component={Home}
            />
            <Screen 
                name="new habit"
                component={NewHabit}
            />
            <Screen 
                name="habit"
                component={Habit}
            />
        </Navigator>
    )
}

export default AppRoutes