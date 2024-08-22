// app/(main)/(tabs)/_layout.tsx
/**
 * Tab navigation layout component.
 * Defines the structure and behavior of the main tab navigation.
 * Includes configuration for tab bar appearance and navigation options.
 */
import { View, Image, ImageSourcePropType, Text } from "react-native"
import { Tabs } from "expo-router"
import { icons } from "../../../constants"

interface TabIconProps {
	icon: ImageSourcePropType
	color: string
	name: string
	focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
	return (
		<View className="items-center justify-center gap-1 bg-black">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				style={{ width: 20, height: 20 }}
			/>
			<Text
				className={`${focused ? "font-pextrabold" : "font-pregular"} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	)
}

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#FFA001",
					tabBarInactiveTintColor: "#CDCDE0",
					tabBarStyle: {
						backgroundColor: "#161622",
						borderTopWidth: 1,
						borderTopColor: "#232533",
						height: 50,
					},
				}}
			>
				<Tabs.Screen
					name="nearby"
					options={{
						title: "Nearby",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.eye}
								color={color}
								name="Nearby"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="chats"
					options={{
						title: "Chats",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.chat}
								color={color}
								name="Chats"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="neighbor"
					options={{
						title: "Neighbor",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.knock}
								color={color}
								name="Knock"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								name="Profile"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}

export default TabsLayout
