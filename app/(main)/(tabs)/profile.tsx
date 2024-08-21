// app/(main)/(tabs)/profile.tsx
/**
 * Profile tab component.
 * Displays the user's profile overview and quick actions.
 * Provides links to detailed profile view and editing options.
 */
import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import CustomButton from "@/components/CustomButton"
import { useState } from "react"
import { useGlobalContext } from "@/context/GlobalProvider"

const Profile = () => {
	const { user, isLoggedIn } = useGlobalContext()
	console.log("User:", user)
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
		<View>
			<CustomButton
				title="Sign out"
				handlePress={submit}
				containerStyles={{ width: "100%", marginTop: 10 }}
				textStyles={{}}
				isLoading={isSubmitting}
			/>
		</View>
	)
}

export default Profile
