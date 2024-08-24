import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
	Storage,
	Locale,
} from "react-native-appwrite"

import * as Location from "expo-location"

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.jsm.atlasprototype",
	projectId: "66c4429f00184aaf8bed",
	databaseId: "66c44452003b9e029709",
	userCollectionId: "66c44477000dba1cbc4e",
	eventCollectionId: "66c44498000061a93afa",
	storageId: "66c4465e002ee72c5623",
}

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	EventCollectionId,
	storageId,
} = config

// Init your React Native SDK
const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

export const checkSession = async () => {
	console.log("//////////start checkSession")
	const result = await account.listSessions()
	console.log(result)
	const result2 = await account.get()
	console.log("account.get()")
	console.log(result2)
	console.log("//////////end checkSession")
}

export const signOut = async () => {
	try {
		await account.deleteSession("current")
	} catch (error) {
		console.log(error)
	}
}

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		)
		if (!newAccount) throw Error

		const avatarUrl = avatars.getInitials(username)

		await signIn(email, password)

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		)
		return newUser
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

export async function signIn(email, password) {
	account.deleteSession("current")
	try {
		const session = await account.createEmailPasswordSession(email, password)

		return session
	} catch (error) {
		throw new Error(error)
	}
}

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get()

		if (!currentAccount) {
			console.error("No current account found")
			await signOut()
			return null
		}
		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		)

		if (!currentUser) {
			throw new Error("User document not found")
		}
		if (!currentUser.documents || currentUser.documents.length === 0) {
			console.error(
				"No user document found for account ID:",
				currentAccount.$id
			)
			console.log("currentUser:", currentUser)
			await signOut()
			return null
		}
		return currentUser.documents[0]
	} catch (error) {
		console.log(error)
	}
}

export const checkAuth = async () => {
	setLoading(true)
	try {
		const currentUser = await getCurrentUser()
		if (currentUser) {
			setIsAuthenticated(true)
			setUser(currentUser)
			console.log("User is authenticated: ", currentUser)
		} else {
			setIsAuthenticated(false)
			setUser(null)
			console.log("User is NOT authenticated: ", currentUser)
		}
	} catch (error) {
		console.error("Auth check failed", error)
		setIsAuthenticated(false)
		setUser(null)
	}
	setLoading(false)
}

export const getEvents = async () => {
	try {
		const events = await databases.listDocuments(
			config.databaseId,
			config.eventCollectionId
		)
		return events
	} catch (error) {
		console.log(error)
	}
}

//TODO: Make this image specific and linked to user
export const uploadProfileImage = async (file) => {
	try {
		// Upload the file to Appwrite Storage
		const uploadedFile = await storage.createFile(
			config.storageId,
			ID.unique(),
			file
		)

		// Get the URL of the uploaded file
		const fileUrl = storage.getFileView(config.storageId, uploadedFile.$id)

		// Get the current user
		const currentUser = await getCurrentUser()

		if (!currentUser) {
			throw new Error("User not found")
		}

		// Update the user's thumbnail attribute
		const updatedUser = await databases.updateDocument(
			config.databaseId,
			config.userCollectionId,
			currentUser.$id,
			{
				thumbnail: fileUrl,
			}
		)

		console.log("Profile image updated successfully")
		return updatedUser
	} catch (error) {
		console.error("Error uploading profile image:", error)
		throw error
	}
}

//TODO: Make this get the nearest profiles
export const getProfiles = async () => {
	try {
		const profiles = await databases.listDocuments(databaseId, userCollectionId)
		return profiles.documents
	} catch (error) {
		console.log("getProfiles error:", error)
	}
}

//TODO: Make this get a specific profile
export const getUserProfile = async (userId) => {
	console.log("getUserProfile:", userId)
	try {
		const profile = await databases.getDocument(
			config.databaseId,
			config.userCollectionId,
			userId
		)
		console.log("getUserProfile:", profile)
		return profile
	} catch (error) {
		console.log("getUserProfile error:", error)
		throw error
	}
}

//LOCATION:

export const getCurrentLocation = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync()
	if (status !== "granted") {
		console.error("Permission to access location was denied")
		return
	}

	let location = await Location.getCurrentPositionAsync({})
	if (!location) {
		console.error("getCurrentLocation: Location not found")
		return
	}
	// console.log("getCurrentLocation:", location)
	return {
		latitude: location.coords.latitude,
		longitude: location.coords.longitude,
	}
}

export const getLocale = async () => {
	const locale = new Locale(client)

	const result = await locale.get()

	return result
}

export async function storeUserLocation() {
	try {
		console.log("Storing user location...")
		const currentUser = await getCurrentUser()
		if (!currentUser) throw new Error("storeUserLocation: User not found.")
		const locale = await getLocale()
		if (!locale) throw new Error("storeUserLocation: Locale not found")
		console.log("typeof Locale:", typeof locale)
		console.log(locale)
		const location = await getCurrentLocation()
		if (!location) throw new Error("storeUserLocation: Location not found")
		const { latitude, longitude } = location

		const updatedUser = await databases.updateDocument(
			config.databaseId,
			config.userCollectionId,
			currentUser.$id,
			{
				location: [longitude, latitude],
				locationTime: new Date().toISOString(),
				country: locale.country,
			}
		)
		console.log("Location stored successfully:", updatedUser)
		return updatedUser
	} catch (error) {
		console.error("Error storing location:", error)
		throw error
	}
}
