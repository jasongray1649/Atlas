// app/(main)/(tabs)/nearby.tsx
/**
 * Nearby tab component.
 * Displays profiles of nearby users.
 * Includes functionality to filter and interact with displayed profiles.
 */

import React from "react"
import {
	View,
	FlatList,
	TouchableOpacity,
	Image,
	Text,
	StyleSheet,
} from "react-native"
import { Link } from "expo-router"
import profiles from "@/constants/profiles"
import { SafeAreaView } from "react-native-safe-area-context"

interface ProfileThumbnailProps {
	profile: { id: string; name: string; thumbnail: any }
}

const ProfileThumbnail: React.FC<ProfileThumbnailProps> = ({ profile }) => {
	return (
		<Link href={`/user/${profile.id}`} asChild>
			<TouchableOpacity className="relative w-1/3 aspect-square">
				<Image
					source={profile.thumbnail}
					className="w-full h-full border-[0.75px] border-[#999999]"
					resizeMode="cover"
					onError={(error) =>
						console.error(
							`Error loading image for ${profile.name}:`,
							error.nativeEvent.error
						)
					}
				/>
				<Text
					className="absolute bottom-1 left-3 right-1 text-white text-left"
					style={styles.profileName}
				>
					{profile.name}
				</Text>
			</TouchableOpacity>
		</Link>
	)
}

const Nearby = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<FlatList
				data={profiles}
				renderItem={({ item }) => <ProfileThumbnail profile={item} />}
				keyExtractor={(item) => item.id}
				numColumns={3}
				contentContainerStyle={{ flexGrow: 1 }}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	profileName: {
		color: "white",
		fontWeight: "bold",
		textAlign: "left",
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
})

export default Nearby
