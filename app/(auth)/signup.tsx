// app/(auth)/sign-in.tsx
/**
 * Authentication page.
 * Handles sign-in and links to sign-up.
 * Includes form for user credentials and submission logic.
 */
import { View, Image, ScrollView, Text, Alert } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import CustomButton from "../../components/CustomButton"
import { router, Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import CustomInput from "../../components/CustomInput"
import { createUser } from "../../lib/appwrite"
import { useGlobalContext } from "../../context/GlobalProvider"

const SignUp = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { setUser, setIsLoggedIn } = useGlobalContext()

	const submit = async () => {
		if (username == "" || email == "" || password == "") {
			Alert.alert("Error", "Please fill in all fields")
		}
		setIsSubmitting(true)
		console.log(password)
		try {
			const result = await createUser(email, password, username)
			setUser(result)
			setIsLoggedIn(true)
			router.replace("/nearby")
		} catch (error: any) {
			Alert.alert("Error", error.message)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<ScrollView contentContainerStyle={{ height: "101%" }}>
				<View className="items-center px-6 mt-0">
					<Image
						source={images.logofull}
						style={{ width: 500, height: 150, marginTop: 0 }}
						resizeMode="contain"
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-4xl text-gray-100 font-pregular">
							Sign up for Atlas
						</Text>
					</View>

					<View className="w-full mt-4 flex items-center">
						<CustomInput
							placeholder="Email"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
						/>
						<CustomInput
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
						/>
						<CustomInput
							placeholder="Password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>
					</View>

					<CustomButton
						title="Sign Up"
						handlePress={submit}
						containerStyles="w-full mt-10"
						textStyles={""}
						isLoading={isSubmitting}
					/>
				</View>
				<View className="justify-center pt-5 flex-row gap-2">
					<Text className="text-lg text-gray-100 font-pregular">
						Have an account already?
					</Text>
					<Link
						href="/signin"
						className="text-lg font-psemibold text-secondary"
					>
						Sign In
					</Link>
				</View>
				<View className="justify-center pt-5 flex-row gap-2">
					<Link href="/nearby" className="text-3xl font-psemibold to-blue-700">
						SKIP TO APP
					</Link>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	)
}

export default SignUp
