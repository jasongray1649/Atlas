// app/(main)/(tabs)/nearby.tsx
/**
 * Nearby tab component.
 * Displays profiles of nearby users.
 * Includes functionality to filter and interact with displayed profiles.
 */

import React from "react"
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native"
import { Link } from "expo-router"
import images from "@/constants/images"

const profiles = [
	{
		id: "1",
		name: "User 1",
		thumbnail: images.icon,
	},
	{
		id: "2",
		name: "User 2",
		thumbnail: images.icon,
	},
	{
		id: "3",
		name: "User 3",
		thumbnail: images.icon,
	},
	{
		id: "4",
		name: "User 4",
		thumbnail: images.icon,
	},
	{
		id: "5",
		name: "User 5",
		thumbnail: images.icon,
	},
	// Add more profiles as needed
]

interface ProfileThumbnailProps {
	profile: { id: string; name: string; thumbnail: string }
}

const ProfileThumbnail: React.FC<ProfileThumbnailProps> = ({ profile }) => {
	return (
		<Link href={`/profile/${profile.id}`} asChild>
			<TouchableOpacity className="flex-1 items-center mb-4">
				<Image
					source={{ uri: profile.thumbnail }}
					className="w-32 h-32 rounded-full mb-2"
				/>
				<Text className="text-center font-semibold">{profile.name}</Text>
			</TouchableOpacity>
		</Link>
	)
}

const nearby = () => {
	return (
		<View className="flex-1 bg-black p-4">
			<FlatList
				data={profiles}
				renderItem={({ item }) => <ProfileThumbnail profile={item} />}
				keyExtractor={(item) => item.id}
				numColumns={2}
				contentContainerStyle={{ gap: 16 }}
			/>
		</View>
	)
}

export default nearby
