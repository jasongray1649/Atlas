// app/(main)/user/[ID].tsx
/**
 * User profile component.
 * Displays detailed profile information for a specific user.
 * Handles both the current user's profile and other users' profiles.
 */
import React from "react"
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router"
import { Text, View, Image } from "react-native"
import profile from "@/constants/profiles"

const UserProfile = () => {
	const params = useLocalSearchParams()
	const id = Number(params.ID) - 1
	console.log("URL Parameters:", params)
	console.log("id:", params.ID)
	console.log(profile[id].name)
	return (
		<View>
			<Text>{profile[id].id}</Text>
			<Image source={profile[id].thumbnail} />
		</View>
	)
}

export default UserProfile
