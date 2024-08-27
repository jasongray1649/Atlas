import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { reportNeighborHelp } from "@/lib/appwrite"
import { FontAwesome5 } from "@expo/vector-icons"

const NeighborHelpForm = () => {
	const [description, setDescription] = useState("")

	const handleSubmit = async () => {
		if (description.trim()) {
			await reportNeighborHelp(description)
			setDescription("")
			// Optionally, show a success message
		}
	}

	return (
		<View className="bg-gray-800 p-6 rounded-xl shadow-lg">
			<Text className="text-white text-2xl font-bold mb-4">
				Report Neighbor Help
			</Text>
			<TextInput
				className="bg-gray-700 text-white p-4 rounded-lg mb-4"
				placeholder="Describe how you helped a neighbor"
				placeholderTextColor="#9CA3AF"
				value={description}
				onChangeText={setDescription}
				multiline
				numberOfLines={4}
			/>
			<TouchableOpacity
				className="bg-blue-500 p-4 rounded-lg flex-row justify-center items-center"
				onPress={handleSubmit}
			>
				<FontAwesome5 name="hands-helping" size={20} color="white" />
				<Text className="text-white text-lg font-semibold ml-2">
					Submit Report
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default NeighborHelpForm
