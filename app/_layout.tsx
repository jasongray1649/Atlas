import { Stack } from "expo-router"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import "../global.css"
import { useCallback } from "react"

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		pregular: require("@/assets/fonts/Poppins-Regular.ttf"),
		pmedium: require("@/assets/fonts/Poppins-Medium.ttf"),
		pbold: require("@/assets/fonts/Poppins-Bold.ttf"),
		psemi: require("@/assets/fonts/Poppins-SemiBold.ttf"),
		pextrabold: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
		pblack: require("@/assets/fonts/Poppins-Black.ttf"),
		pextralight: require("@/assets/fonts/Poppins-ExtraLight.ttf"),
		pthin: require("@/assets/fonts/Poppins-Thin.ttf"),
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded, fontError])

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: "#1F1F27" },
			}}
		/>
	)
}
