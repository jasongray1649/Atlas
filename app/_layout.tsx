import { Stack } from "expo-router"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import "../global.css"
import { useCallback, useEffect } from "react"
import GlobalProvider from "../context/GlobalProvider"

export default function RootLayout() {
	//	const [fontsLoaded, fontError] = useFonts({
	// Add fonts here
	//	})

	const onLayoutRootView = useCallback(async () => {
		//		if (fontsLoaded || fontError) {
		await SplashScreen.hideAsync()
		//		}
	}, [])
	//	[fontsLoaded, fontError])

	//	if (!fontsLoaded && !fontError) {
	//		return null
	//	}

	useEffect(() => {
		onLayoutRootView()
	}, [onLayoutRootView])

	return (
		<GlobalProvider>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "#1F1F27" },
				}}
			/>
		</GlobalProvider>
	)
}
