// app/(auth)/sign-in.tsx
/**
 * Authentication page.
 * Handles sign-in and links to sign-up.
 * Includes form for user credentials and submission logic.
 */
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Link } from "expo-router"

export default function App() {
	return (
		<View>
			<Text>sign-in</Text>
			<StatusBar style="auto" />
			<Link href="/sign-up">go to sign-up</Link>
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
