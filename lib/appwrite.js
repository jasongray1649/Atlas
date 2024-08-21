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

		if (!currentAccount) throw new Error("No current account found")

		console.log("Querying user document with accountID:", currentAccount.$id)
		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		)
		console.log("current user is:", currentUser)

		if (!currentUser) throw new Error("User document not found")

		return currentUser.documents[0]
	} catch (error) {
		console.log(error)
	}
}
