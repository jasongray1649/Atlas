// app/(main)/(tabs)/nearby.tsx
/**
 * Nearby tab component.
 * Displays profiles of nearby users.
 * Includes functionality to filter and interact with displayed profiles.
 * TODO: Add refresh functionality to update location and profiles
 * TODO: Replace dummy profiles with real users
 * TODO: Add badge display on
 */

import React from "react"
import { useState, useEffect } from "react"
import {
	View,
	FlatList,
	TouchableOpacity,
	Image,
	Text,
	StyleSheet,
	Alert,
} from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { getProfiles } from "@/lib/appwrite"

interface ProfileThumbnailProps {
	profile: {
		$id: string
		username: string
		avatar: string
		distance: number
	}
}

interface Profile {
	$id: string
	username: string
	avatar: string
	distance: number
}

type DatabaseDocument = {
	$id: string
	$collectionId: string
	$databaseId: string
	$createdAt: string
	$updatedAt: string
	[key: string]: any
}

const ProfileThumbnail: React.FC<ProfileThumbnailProps> = ({ profile }) => {
	return (
		<Link href={`/user/${profile.$id}`} asChild>
			<TouchableOpacity className="relative w-1/3 aspect-square">
				<Image
					source={{ uri: profile.avatar }}
					className="w-full h-full border-[0.75px] border-[#999999]"
					resizeMode="cover"
					onError={(error) =>
						console.error(
							`Error loading image for ${profile.username}:`,
							error.nativeEvent.error
						)
					}
				/>
				<Text
					className="absolute bottom-1 left-3 right-1 text-white text-left"
					style={styles.profileName}
				>
					{profile.username}
				</Text>
			</TouchableOpacity>
		</Link>
	)
}

// TODO: Link this up with the database
const Nearby = () => {
	const [profiles, setProfiles] = useState<Profile[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchProfiles()
	}, [])

	const fetchProfiles = async () => {
		try {
			const fetchedProfiles = await getProfiles()
			if (Array.isArray(fetchedProfiles)) {
				const convertedProfiles = fetchedProfiles.map(
					(profile: DatabaseDocument) => ({
						$id: profile.$id,
						username: profile.username,
						avatar: profile.avatar,
						distance: profile.distance,
					})
				)
				setProfiles(convertedProfiles)
			}
		} catch (error) {
			console.error("Error fetching profiles:", error)
			Alert.alert("Error", "Failed to fetch profiles")
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "#1F1F27",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ color: "white" }}>Loading...</Text>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<FlatList
				data={profiles}
				renderItem={({ item }) => <ProfileThumbnail profile={item} />}
				keyExtractor={(item: Profile) => item.$id}
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
