// app/(auth)/sign-up.tsx
/**
 * Account creation page.
 * Handles sign-up.
 * Includes form for user credentials and submission logic.
 */
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Link } from "expo-router"

export default function App() {
	return (
		<View>
			<Text>sign-up</Text>
			<StatusBar style="auto" />
			<Link href="/nearby">go to nearby</Link>
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
