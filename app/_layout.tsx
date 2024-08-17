// app/_layout.tsx
/**
 * Root layout component for the entire application.
 * Handles app-wide layout structure and navigation.
 * Implements global state providers and error boundaries.
 */

import { Slot, Stack } from "expo-router"
import { View } from "react-native"

import "../../node_modules/.cache/nativewind/global.css"

export default function RootLayout() {
	return (
		<View className="flex-1">
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
			<Slot />
		</View>
	)
}
