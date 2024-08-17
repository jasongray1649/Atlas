// app/(auth)/sign-in.tsx
/**
 * Authentication page.
 * Handles sign-in and links to sign-up.
 * Includes form for user credentials and submission logic.
 */
import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"

const Signin = () => {
	return (
		<View className="flex-1 justify-center items-center">
			<Link href="/nearby">
				<Text className="text-3xl font-pbold">Sign In</Text>
			</Link>
		</View>
	)
}

export default Signin
