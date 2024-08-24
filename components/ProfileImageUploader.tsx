// components/ProfileImageUploader.tsx

import React, { useState } from "react"
import { View, Button, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { uploadProfileImage } from "@/lib/appwrite"

const ProfileImageUploader = () => {
	const [image, setImage] = useState<string | null>(null)

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri)
			uploadImage(result.assets[0].uri)
		}
	}

	const uploadImage = async (uri: string) => {
		try {
			const response = await fetch(uri)
			const blob = await response.blob()
			const updatedUser = await uploadProfileImage(blob)
			console.log("User updated:", updatedUser)
		} catch (error) {
			console.error("Error uploading image:", error)
		}
	}

	return (
		<View>
			<Button title="Pick an image" onPress={pickImage} />
			{image && (
				<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
			)}
		</View>
	)
}

export default ProfileImageUploader
