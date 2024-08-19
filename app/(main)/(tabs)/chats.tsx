// app/(main)/(tabs)/chats.tsx
/**
 * Chats tab component.
 * Displays a list of the user's active chat conversations.
 * Includes functionality to start new chats and access existing ones.
 */
import { View, Text } from "react-native"
import React from "react"
import { FlatList, TouchableOpacity, Image } from "react-native"
import { Link } from "expo-router"

const profiles = [
	{ id: "1", name: "User 1", thumbnail: "/assets/images/atlas-logo" },
	{ id: "2", name: "User 2", thumbnail: "/assets/images/atlas-logo" },
	{ id: "2", name: "User 2", thumbnail: "/assets/images/atlas-logo" },
	{ id: "2", name: "User 2", thumbnail: "/assets/images/atlas-logo" },
	{ id: "2", name: "User 2", thumbnail: "/assets/images/atlas-logo" },
	// Add more profiles as needed
]

const chats = () => {
	return (
		<View>
			<Text>chats</Text>
		</View>
	)
}

export default chats
