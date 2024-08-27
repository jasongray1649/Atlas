import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { reportNeighborHelp } from "@/lib/appwrite"

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
		<View className="bg-gray-800 p-4 rounded-lg">
			<Text className="text-white text-xl font-bold mb-2">
				Report Neighbor Help
			</Text>
			<TextInput
				className="bg-white p-2 rounded mb-2"
				placeholder="Describe how you helped a neighbor"
				value={description}
				onChangeText={setDescription}
			/>
			<TouchableOpacity
				className="bg-green-500 p-2 rounded"
				onPress={handleSubmit}
			>
				<Text className="text-white text-center">Submit</Text>
			</TouchableOpacity>
		</View>
	)
}

export default NeighborHelpForm
