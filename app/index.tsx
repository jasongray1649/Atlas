// app/index.tsx
/**
 * Entry point of the application.
 * Handles initial routing based on authentication status.
 * Redirects to appropriate screens (sign-in or main app).
 */

import { StatusBar } from "expo-status-bar"
import { Image, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "../constants"
import CustomButton from "../components/CustomButton"
import { Redirect, router } from "expo-router"

export default function App() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-max-[300vh] items-center h-max-[150vh] px-6 mt-20">
					<Image
						source={images.logo}
						style={{ width: 300, height: 150 }}
						resizeMode="contain"
					/>

					<Image
						source={images.cards}
						className="max-w-[300px] w-full h-[300px] mt-7"
						resizeMode="contain"
					/>

					<CustomButton
						title="Continue with Email"
						handlePress={() => {
							router.push("/signin")
						}}
						containerStyles="w-full mt-10"
						textStyles={""}
						isLoading={false}
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	)
}
