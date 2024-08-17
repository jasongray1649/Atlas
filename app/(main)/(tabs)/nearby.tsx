// app/(main)/(tabs)/nearby.tsx
/**
 * Nearby tab component.
 * Displays profiles of nearby users.
 * Includes functionality to filter and interact with displayed profiles.
 */
import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import { Link } from "expo-router"

export default function App() {
	return (
		<View className="flex-1 justify-center items-center">
			<Text className="text-3xl font-pextrabold">nearby</Text>
			<StatusBar style="auto" />
			<Link href="/">back to index</Link>
		</View>
	)
}
