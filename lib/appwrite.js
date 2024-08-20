import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
	Storage,
} from "react-native-appwrite"

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.jsm.atlasprototype",
	projectId: "66c4429f00184aaf8bed",
	databaseId: "66c44452003b9e029709",
	userCollectionId: "66c44477000dba1cbc4e",
	eventCollectionId: "66c44498000061a93afa",
	storageId: "66c4465e002ee72c5623",
}

// Init your React Native SDK
const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

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

		await SignIn(email, password)

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{ accountID: newAccount.$id, email, username, avatar: avatarUrl }
		)
		return newUser
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

export async function SignIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(email, password)

		return session
	} catch (error) {
		throw new Error(error)
	}
}
