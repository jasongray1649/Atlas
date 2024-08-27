// app/(main)/(tabs)/neighbor.tsx
/**
 * Neighbor tab component.
 * Checks if you helped your neighbor. Possibly includes nearby events.
 * Full functionality still unknown.
 */
import React from "react"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import PointsDisplay from "@/components/pointsdisplay"
import TaskList from "@/components/TaskList"
import NeighborHelpForm from "@/components/NeighborHelpForm"

const HelpNeighbors = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<ScrollView>
				<View className="p-4">
					<Text className="text-white text-2xl font-bold mb-4">
						Do Something
					</Text>
					<PointsDisplay />
					<TaskList />
					<NeighborHelpForm />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HelpNeighbors
