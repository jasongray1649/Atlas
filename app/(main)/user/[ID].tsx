import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { getUserProfile } from "@/lib/appwrite"

interface UserProfile {
	$id: string
	$createdAt: string
	$updatedAt: string
	username: string
	email: string
	avatar: string
	accountId: string
	// Add any other fields that your user document contains
}

export default function UserProfile() {
	const params = useLocalSearchParams()
	const id = params.ID?.toString() || "Unknown"
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	console.log("ID:", id)
	useEffect(() => {
		fetchUserProfile()
	}, [id])

	const fetchUserProfile = async () => {
		try {
			const userDoc = await getUserProfile(id as string)
			if (userDoc && userDoc.$id && userDoc.username && userDoc.avatar) {
				setProfile(userDoc as unknown as UserProfile)
			} else {
				throw new Error("Invalid user data")
			}
		} catch (error) {
			console.error("Error fetching user profile:", error)
			setError("Failed to load user profile")
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		)
	}

	if (error || !profile) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.errorText}>{error || "User not found"}</Text>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<Image source={{ uri: profile.avatar }} style={styles.avatar} />
			<Text style={styles.username}>{profile.username}</Text>
			<Text style={styles.email}>{profile.email}</Text>
			{/* Add more profile information here */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1F1F27",
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 20,
	},
	username: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 10,
	},
	email: {
		fontSize: 18,
		color: "white",
		marginBottom: 10,
	},
	errorText: {
		fontSize: 18,
		color: "red",
	},
})
