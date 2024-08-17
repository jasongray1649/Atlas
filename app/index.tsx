// app/index.tsx
/**
 * Entry point of the application.
 * Handles initial routing based on authentication status.
 * Redirects to appropriate screens (sign-in or main app).
 */

import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Link } from "expo-router"

export default function App() {
	return (
		<View>
			<Text>Index</Text>
			<StatusBar style="auto" />
			<Link href="/sign-in">Sign In</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})
