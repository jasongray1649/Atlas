import React from "react"
import { TouchableOpacity, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import profile from "@/constants/profiles"

const UserLayout = () => {
	const router = useRouter()
	const params = useLocalSearchParams()
	// Extract the 'id' parameter and ensure it's a string
	const userId = params.ID?.toString() || "Unknown"

	return (
		<Stack
			screenOptions={{
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => router.push("/nearby")}
						className="flex-row items-center"
					>
						<Ionicons name="arrow-back" size={30} color="white" />
					</TouchableOpacity>
				),
				headerTitle: `${userId}`,
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
