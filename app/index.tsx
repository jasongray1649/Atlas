// app/index.tsx
/**
 * Entry point of the application.
 * Handles initial routing based on authentication status.
 * Redirects to appropriate screens (sign-in or main app).
 */

import { Image, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "../constants"
import CustomButton from "../components/CustomButton"
import { router } from "expo-router"
import "react-native-url-polyfill/auto"
import { useGlobalContext } from "@/context/GlobalProvider"

export default function App() {
	const { isLoggedIn, isLoading, checkAuth } = useGlobalContext()
	console.log("Logged in", isLoggedIn)
	console.log("Loading", isLoading)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					height: "101%",
					width: "105%",
				}}
			>
				<Image
					source={images.cards}
					style={{ width: 500, height: 500, marginTop: -40 }}
					resizeMode="contain"
				/>
			</ScrollView>
		</SafeAreaView>
	)
}
