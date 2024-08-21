// app/(main)/(tabs)/profile.tsx
/**
 * Profile tab component.
 * Displays the user's profile overview and quick actions.
 * Provides links to detailed profile view and editing options.
 */
import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"

const profile = () => {
	return (
		<View>
			<Text>profile</Text>
			<View className="justify-center pt-5 flex-row gap-2">
				<Link href="/index">
					<Text className="text-3xl font-psemibold to-blue-700">
						Return to Index
					</Text>
				</Link>
			</View>
			<View className="justify-center pt-5 flex-row gap-2">
				<Link href="/signin">
					<Text className="text-3xl font-psemibold to-blue-700">
						Return to SignIn
					</Text>
				</Link>
			</View>
		</View>
	)
}

export default profile
