import React from "react"
import { TouchableOpacity, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import profile from "@/constants/profiles"

const UserLayout = () => {
	const router = useRouter()
	const params = useLocalSearchParams()

	// Debugging: Log the params to check if they are being extracted correctly
	console.log("URL Parameters:", params)

	// Extract the 'id' parameter and ensure it's a string
	const userId = params.ID?.toString() || "Unknown"
	const userName = profile[Number(userId) - 1].name

	return (
		<Stack
			screenOptions={{
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => router.push("/nearby")}
						className="flex-row items-center"
					>
						<Ionicons name="arrow-back" size={24} color="white" />
						<Text className="ml-2 text-white">Back</Text>
					</TouchableOpacity>
				),
				headerTitle: `${userName}`,
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: "#1F1F27" },
				headerTintColor: "white",
			}}
		>
			{/* Add your screens here */}
		</Stack>
	)
}

export default UserLayout
