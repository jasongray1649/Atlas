import React, { useState } from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface CustomInputProps {
	placeholder: string
	value: string
	onChangeText: (text: string) => void
	secureTextEntry?: boolean
	keyboardType?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
	placeholder,
	value,
	onChangeText,
	secureTextEntry = false,
	keyboardType = "default",
}) => {
	const [showPassword, setShowPassword] = useState(!secureTextEntry)

	return (
		<View className="relative w-full flex-row items-center mb-4">
			<TextInput
				className="flex-1 bg-[#2C2C35] text-white p-5 rounded-md text-2xl border border-gray-500"
				placeholder={placeholder}
				placeholderTextColor="#9CA3AF"
				secureTextEntry={secureTextEntry && !showPassword}
				value={value}
				onChangeText={onChangeText}
			/>
			{secureTextEntry && (
				<TouchableOpacity
					className="absolute right-0 p-5"
					onPress={() => setShowPassword(!showPassword)}
				>
					<Ionicons
						name={showPassword ? "eye-off" : "eye"}
						size={24}
						color="#9CA3AF"
					/>
				</TouchableOpacity>
			)}
		</View>
	)
}

export default CustomInput
