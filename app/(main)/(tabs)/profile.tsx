// app/(main)/(tabs)/profile.tsx
/**
 * Profile tab component.
 * Displays the user's profile overview and quick actions.
 * Provides links to detailed profile view and editing options.
 */
import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import { signOut } from "@/lib/appwrite"
import CustomButton from "@/components/CustomButton"
import { useState } from "react"

const router = useRouter()
const [isSubmitting, setIsSubmitting] = useState(false)

const submit = async () => {
	setIsSubmitting(true)
	try {
		await signOut()
		// Reset the entire navigation state and go to the index
		router.replace("/signin")
	} catch (error: any) {
		console.log("Error signing out:", error.message)
	} finally {
		setIsSubmitting(false)
	}
}

const profile = () => {
	return (
		<View>
			<CustomButton
				title="Sign out"
				handlePress={submit}
				containerStyles="w-full mt-10"
				textStyles={""}
				isLoading={isSubmitting}
			/>
		</View>
	)
}

export default profile
