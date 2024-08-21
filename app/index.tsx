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

export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					height: "101%",
				}}
			>
				<View
					style={{
						alignItems: "center",
						paddingHorizontal: 24,
						marginTop: -10,
					}}
				>
					<Image
						source={images.logo}
						style={{ width: 300, height: 150, marginTop: 0 }}
						resizeMode="contain"
					/>

					<Image
						source={images.cards}
						style={{ width: 300, height: 300, marginTop: -40 }}
						resizeMode="contain"
					/>
					<CustomButton
						title="Get Atlas"
						handlePress={() => {
							router.push("/signin")
						}}
						containerStyles="w-full mt+10"
						textStyles={""}
						isLoading={false}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
