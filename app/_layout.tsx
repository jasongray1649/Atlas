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
		return (
			<ActivityIndicator
				animating={isLoading}
				color="#fff"
				size="small"
				style={{ marginLeft: 2 }}
			/>
		)
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
				const result = await SplashScreen.preventAutoHideAsync()
				if (!result) {
					console.warn("Failed to prevent auto hide of splash screen.")
				}
			} catch (e) {
				console.warn(e)
			}
		}
		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			try {
				await SplashScreen.hideAsync()
			} catch (error) {
				console.warn(error)
			}
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return (
			<ActivityIndicator
				animating={!fontsLoaded}
				color="#fff"
				size="small"
				style={{ marginLeft: 2 }}
			/>
		)
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
