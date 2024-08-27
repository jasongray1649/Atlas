import React from "react"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import PointsDisplay from "@/components/PointsDisplay"
import TaskList from "@/components/TaskList"
import NeighborHelpForm from "@/components/NeighborHelpForm"

const HelpNeighbors = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<ScrollView className="flex-1">
				<View className="p-6">
					<View className="flex-row justify-between items-center mb-6">
						<Text className="text-white text-3xl font-bold">
							Help Neighbors
						</Text>
						<Feather name="help-circle" size={24} color="white" />
					</View>

					<View className="mb-8">
						<PointsDisplay />
					</View>

					<View className="mb-8">
						<TaskList />
					</View>

					<View>
						<NeighborHelpForm />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HelpNeighbors
