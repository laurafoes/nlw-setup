import { View } from "react-native"
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import Loading from "./src/components/Loading";
import Home from "./src/screens/Home";
import Header from "./src/components/Header";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View className='flex-1'>
        <Home />
        <StatusBar style="light" backgroundColor="transparent" translucent />
    </View>
  );
}