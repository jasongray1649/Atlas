// app/(auth)/_layout.tsx
/**
 * Layout component for authentication pages.
 * Provides styling for sign-in and sign-up and forgot-password pages.
 * Provides layout and buttons shared by these pages.
 */
import { Stack } from "expo-router"
import { View } from "react-native"

export default function RootLayout() {
	return (
		<View style={{ flex: 1 }}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</View>
	)
}
