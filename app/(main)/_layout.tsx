// app/(main)/_layout.tsx
/**
 * Layout component for authenticated app pages.
 * Implements authentication context and handles auth state.
 * Provides layout structure common to all main app pages.
 */
// app/(main)/_layout.tsx
import { Slot } from "expo-router"
import { SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"

export default function MainLayout() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<Slot />
		</SafeAreaView>
	)
}
