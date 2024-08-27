import React from "react"
import { View, Text } from "react-native"
import { useGlobalContext } from "@/context/GlobalProvider"

const PointsDisplay = () => {
	const { user } = useGlobalContext()

	return (
		<View className="bg-gray-800 p-4 rounded-lg mb-4">
			<Text className="text-white text-lg">
				Your Points: {user?.points || 0}
			</Text>
			<Text className="text-white text-lg">
				Rank: {user?.rank || "Newcomer"}
			</Text>
		</View>
	)
}

export default PointsDisplay
