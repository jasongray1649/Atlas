// app/(auth)/sign-in.tsx
/**
 * Authentication page.
 * Handles sign-in and links to sign-up.
 * Includes form for user credentials and submission logic.
 */
import { View, Image, ScrollView, Text, Alert } from "react-native"
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import CustomButton from "../../components/CustomButton"
import { router, Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import CustomInput from "../../components/CustomInput"
import { getCurrentUser, signIn } from "@/lib/appwrite"
import { useGlobalContext } from "../../context/GlobalProvider"

type InputProps = {
	placeholder: string
	value: string
	onChangeText: (text: string) => void
	secureTextEntry?: boolean
}

type InputSectionProps = {
	email: InputProps
	password: InputProps
}

const signinpage = () => {
	const { isLoading, isLoggedIn, user } = useGlobalContext()
	const { checkAuth, authError } = useGlobalContext()
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const initialCheckDone = useRef(false)

	const submit = useCallback(async () => {
		if (email == "" || password == "") {
			Alert.alert("Error", "Please fill in all fields")
			return
		}
		setIsSubmitting(true)

		try {
			await signIn(email, password)
			const result = await getCurrentUser()
			checkAuth()
			Alert.alert("Success", "Logged in successfully")
			console.log("FULL USER:", user)
			router.replace("/profile")
		} catch (error: any) {
			Alert.alert("Error", error.message)
			console.log("ERROR isLoading:", isLoading)
			console.log("ERROR isLoggedIn:", isLoggedIn)
		} finally {
			setIsSubmitting(false)
		}
	}, [email, password, checkAuth])

	const inputProps: InputSectionProps = useMemo(
		() => ({
			email: {
				placeholder: "Email",
				value: email,
				onChangeText: setEmail,
			},
			password: {
				placeholder: "Password",
				value: password,
				onChangeText: setPassword,
				secureTextEntry: true,
			},
		}),
		[email, password]
	)

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1F1F27" }}>
			<ScrollView contentContainerStyle={{ height: "101%" }}>
				<View className="items-center px-6 mt-0">
					<Image
						source={images.logo}
						style={{ width: 300, height: 150, marginTop: 0 }}
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						style={{ width: 300, height: 300, marginTop: -40 }}
						resizeMode="contain"
					/>
					<View className="w-full mt-4 flex items-center">
						<InputSection {...inputProps} />
					</View>
					<CustomButton
						title="Sign in"
						handlePress={submit}
						containerStyles="w-full mt-10"
						textStyles={""}
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have an account?
						</Text>
						<Link
							href="/signup"
							className="text-lg font-psemibold text-secondary"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	)
}

const InputSection = React.memo(({ email, password }: InputSectionProps) => (
	<View className="w-full mt-4 flex items-center">
		<CustomInput {...email} />
		<CustomInput {...password} />
	</View>
))

export default signinpage
