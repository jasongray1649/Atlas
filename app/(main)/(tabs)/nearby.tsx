// app/(main)/(tabs)/nearby.tsx
/**
 * Nearby tab component.
 * Displays profiles of nearby users.
 * Includes functionality to filter and interact with displayed profiles.
 */

import React from "react"
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native"
import { Link } from "expo-router"
import profiles from "@/constants/profiles"

interface ProfileThumbnailProps {
	profile: { id: string; name: string; thumbnail: any }
}

const ProfileThumbnail: React.FC<ProfileThumbnailProps> = ({ profile }) => {
	console.log(`Loading thumbnail for ${profile.name}:`, profile.thumbnail)

	return (
		<Link href={`/profile/${profile.id}`} asChild>
			<TouchableOpacity className="flex-1 items-center mb-4">
				<Image
					source={profile.thumbnail}
					className="w-[150px] h-[150px]"
					resizeMode="cover"
					onError={(error) =>
						console.error(
							`Error loading image for ${profile.name}:`,
							error.nativeEvent.error
						)
					}
				/>
				<Text className="text-center font-semibold mt-2">{profile.name}</Text>
			</TouchableOpacity>
		</Link>
	)
}

const Nearby = () => {
	console.log("All profiles:", JSON.stringify(profiles, null, 2))

	return (
		<View className="flex-1 p-5 mt-10">
			<FlatList
				data={profiles}
				renderItem={({ item }) => <ProfileThumbnail profile={item} />}
				keyExtractor={(item) => item.id}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				contentContainerStyle={{ gap: 16 }}
			/>
		</View>
	)
}

export default Nearby
