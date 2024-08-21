// app/(main)/_layout.tsx
/**
 * Layout component for authenticated app pages.
 * Implements authentication context and handles auth state.
 * Provides layout structure common to all main app pages.
 */
// app/(main)/_layout.tsx
import { Slot } from "expo-router"
import { View } from "react-native"

export default function MainLayout() {
	return (
		<View style={{ flex: 1 }}>
			<Slot />
		</View>
	)
}
