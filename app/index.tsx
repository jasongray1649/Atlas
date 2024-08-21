// app/index.tsx
/**
 * Entry point of the application.
 * Handles initial routing based on authentication status.
 * Redirects to appropriate screens (sign-in or main app).
 */

import { StatusBar } from "expo-status-bar"
import { Image, ScrollView, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "../constants"
import CustomButton from "../components/CustomButton"
import { Redirect, router } from "expo-router"
import "react-native-url-polyfill/auto"
import { useGlobalContext } from "@/context/GlobalProvider"
import { getCurrentUser, checkSession } from "@/lib/appwrite"
import { useState, useEffect } from "react"

export default function App() {
	const { isLoggedIn, isLoading } = useGlobalContext()

	if (!isLoading && isLoggedIn) {
		return <Redirect href="/nearby" />
	} else {
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
							title="Continue with Email"
							handlePress={() => {
								router.push("/signin")
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
}
