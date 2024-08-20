// app/(auth)/sign-in.tsx
/**
 * Authentication page.
 * Handles sign-in and links to sign-up.
 * Includes form for user credentials and submission logic.
 */
import {
	View,
	Image,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import { Ionicons } from "@expo/vector-icons"
import CustomButton from "../../components/CustomButton"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"

const Signin = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

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

					<View className="w-full mt-4">
						<TextInput
							className="w-full bg-gray-700 text-white p-4 rounded-md mb-4 text-lg"
							placeholder="Username"
							placeholderTextColor="#9CA3AF"
							value={username}
							onChangeText={setUsername}
						/>
						<View className="relative w-full flex-row items-center">
							<TextInput
								className="flex-1 bg-gray-700 text-white p-4 rounded-md text-lg"
								placeholder="Password"
								placeholderTextColor="#9CA3AF"
								secureTextEntry={!showPassword}
								value={password}
								onChangeText={setPassword}
							/>
							<TouchableOpacity
								className="absolute"
								onPress={() => setShowPassword(!showPassword)}
							>
								<Ionicons
									name={showPassword ? "eye-off" : "eye"}
									size={24}
									color="#9CA3AF"
								/>
							</TouchableOpacity>
						</View>
					</View>

					<CustomButton
						title="Sign in"
						handlePress={() => {
							console.log("Username:", username, "Password:", password)
							// Add your sign-in logic here
							router.push("/chats")
						}}
						containerStyles="w-full mt-10"
						textStyles={""}
						isLoading={false}
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	)
}

export default Signin
