import { Stack, useRouter, useSegments } from "expo-router"
import { View, AppState, ActivityIndicator } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { useCallback, useEffect } from "react"
import GlobalProvider from "../context/GlobalProvider"
import { useGlobalContext } from "../context/GlobalProvider"
import "../global.css"
import { getCurrentUser } from "@/lib/appwrite"

function RootLayoutNav() {
	const { isLoggedIn, isLoading, checkAuth } = useGlobalContext()
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading) {
			const inAuthGroup = segments[0] === "(auth)"
			if (!isLoggedIn && !inAuthGroup) {
				router.replace("/signin")
			} else if (isLoggedIn && inAuthGroup) {
				router.replace("/profile")
			}
		}
	}, [isLoggedIn, isLoading, segments])

	// Recheck auth when the app comes to the foreground
	useEffect(() => {
		const unsubscribe = AppState.addEventListener("change", (nextAppState) => {
			if (nextAppState === "active") {
				checkAuth()
			}
		})

		return () => unsubscribe.remove()
	}, [checkAuth])

	if (isLoading) {
		;<ActivityIndicator
			animating={isLoading}
			color="#fff"
			size="small"
			className="ml-2"
		/>
		return null
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: "#1F1F27" },
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(main)" options={{ headerShown: false }} />
		</Stack>
	)
}

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
				<RootLayoutNav />
			</GlobalProvider>
		</View>
	)
}
