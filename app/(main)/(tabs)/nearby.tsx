// app/(main)/(tabs)/nearby.tsx
/**
 * Nearby tab component.
 * Displays profiles of nearby users.
 * Includes functionality to filter and interact with displayed profiles.
 */
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Link } from "expo-router"

export default function App() {
	return (
		<View>
			<Text>nearby</Text>
			<StatusBar style="auto" />
			<Link href="/">back to index</Link>
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
