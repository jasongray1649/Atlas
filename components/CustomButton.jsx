import { ActivityIndicator, Text, TouchableOpacity } from "react-native"

const CustomButton = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary rounded-2xl min-h-[62px] flex flex-row justify-center w-max-[300px] items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
		>
			<Text className={`text-primary font-pbold text-2xl ${textStyles}`}>
				{title}
			</Text>

			{isLoading && (
				<ActivityIndicator
					animating={isLoading}
					color="#fff"
					size="small"
					className="ml-2"
				/>
			)}
		</TouchableOpacity>
	)
}

export default CustomButton
