// app/(main)/(tabs)/chats.tsx
/**
 * Chats tab component.
 * Displays a list of the user's active chat conversations.
 * Includes functionality to start new chats and access existing ones.
 */
import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { FlatList, TouchableOpacity, Image } from "react-native"
import { Link } from "expo-router"
import profile from "@/constants/profiles"
import { SafeAreaView } from "react-native-safe-area-context"
import { getCurrentUser } from "@/lib/appwrite"

const chats = () => {
	return (
		<SafeAreaView>
			<Image
				source={profile[0].thumbnail}
				style={{ width: 300, height: 150 }}
				resizeMode="contain"
			/>
		</SafeAreaView>
	)
}

export default chats
