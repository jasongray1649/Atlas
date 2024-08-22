// app/(main)/(tabs)/profile.tsx
/**
 * Profile tab component.
 * Displays the user's profile overview and quick actions.
 * Provides links to detailed profile view and editing options.
 */
import { View, Text, Image } from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import CustomButton from "@/components/CustomButton"
import { useState } from "react"
import { useGlobalContext } from "@/context/GlobalProvider"
import { SafeAreaView } from "react-native-safe-area-context"
import profile from "@/constants/profiles"

// Loads error/loading message if user isn't available due to type error
// user is null if not logged in, otherwise it's an object with user data
const UserInfo = ({ user }: { user: any }) => {
	if (!user) {
		return (
			<View className="p-4 bg-gray-800 rounded-lg mb-4">
				<Text className="text-white text-lg">Loading user information...</Text>
			</View>
		)
	}

	// Displays user information
	// TODO: Add user profile image
	// TODO: Add image upload to database
	// TODO: Create enough users to test this
	// TODO: Add default image
	return (
		<View className="p-4 bg-gray-800 rounded-lg mb-4">
			<Text className="text-white text-lg mb-2">
				Username: {user.username || "N/A"}
			</Text>
			<Text className="text-white text-lg mb-2">
				Email: {user.email || "N/A"}
			</Text>
			<Text className="text-white text-lg">ID: {user.$id || "N/A"}</Text>
			<Image
				source={profile[0].thumbnail}
				style={{ width: 300, height: 150 }}
				resizeMode="contain"
			/>
		</View>
	)
}

const Profile = () => {
	const { user, isLoggedIn } = useGlobalContext()

	if (user) {
		console.log("user:", user.username)
	} else console.log("user: null")
	console.log("isLoggedin:", isLoggedIn)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const router = useRouter()
	const { handleSignOut } = useGlobalContext()
	const submit = async () => {
		setIsSubmitting(true)
		try {
			await handleSignOut()
		} catch (error: any) {
			console.log("Error signing out:", error.message)
		} finally {
			setIsSubmitting(false)
		}
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<View className="flex-1 justify-between">
				<UserInfo user={user} />
				<View
					style={{
						flex: 1,
						padding: 3,
						justifyContent: "center",
						paddingHorizontal: 50,
					}}
				>
					<CustomButton
						title="Sign out"
						handlePress={submit}
						containerStyles={{ width: "100%", marginTop: -10 }}
						textStyles={{}}
						isLoading={isSubmitting}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Profile
