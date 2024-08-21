import { Stack } from "expo-router"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { useCallback, useEffect } from "react"
import GlobalProvider from "../context/GlobalProvider"
import "../global.css"

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		// Specify fonts here
	})

	useEffect(() => {
		async function prepare() {
			try {
				// Keep the splash screen visible while we fetch resources
				await SplashScreen.preventAutoHideAsync()
			} catch (e) {
				console.warn(e)
			}
		}
		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<StatusBar style="light" />
			<GlobalProvider>
				<Stack
					screenOptions={{
						headerShown: false,
						contentStyle: { backgroundColor: "#1F1F27" },
					}}
				/>
			</GlobalProvider>
		</View>
	)
}
