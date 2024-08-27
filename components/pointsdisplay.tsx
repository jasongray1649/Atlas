import React from "react"
import { View, Text } from "react-native"
import { useGlobalContext } from "@/context/GlobalProvider"
import { FontAwesome5 } from "@expo/vector-icons"

const PointsDisplay = () => {
	const { user } = useGlobalContext()

	return (
		<View className="flex-row justify-between items-center bg-white bg-opacity-20 p-4 rounded-xl">
			<View className="flex-row items-center">
				<FontAwesome5 name="star" size={24} color="gold" />
				<Text className="text-white text-xl ml-2">
					{user?.points || 0} Points
				</Text>
			</View>
			<View className="flex-row items-center">
				<FontAwesome5 name="medal" size={24} color="silver" />
				<Text className="text-white text-xl ml-2">
					{user?.rank || "Newcomer"}
				</Text>
			</View>
		</View>
	)
}

export default PointsDisplay
