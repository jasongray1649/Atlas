// app/(auth)/sign-in.tsx
/**
 * Authentication page.
 * Handles sign-in and links to sign-up.
 * Includes form for user credentials and submission logic.
 */
import { View, Image, ScrollView } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import CustomButton from "../../components/CustomButton"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"

const Signin = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<ScrollView contentContainerStyle={{ height: "101%" }}>
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
						title="Sign in"
						handlePress={() => {
							router.push("/chats")
						}}
						containerStyles="w-full mt+10"
						textStyles={""}
						isLoading={false}
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	)
}

export default Signin
