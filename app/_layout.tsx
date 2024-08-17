// app/_layout.tsx
/**
 * Root layout component for the entire application.
 * Handles app-wide layout structure and navigation.
 * Implements global state providers and error boundaries.
 */

import { StyleSheet, Text, View } from "react-native"
import { Slot, Stack } from "expo-router"

const RootLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	)
}

export default RootLayout
