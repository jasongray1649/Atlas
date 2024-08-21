import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
} from "react"
import { getCurrentUser, signOut } from "../lib/appwrite"

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [authError, setAuthError] = useState(null)
	const [initialAuthCheckComplete, setInitialAuthCheckComplete] =
		useState(false)

	const checkAuth = useCallback(async () => {
		setIsLoading(true)
		try {
			const res = await getCurrentUser()
			if (res) {
				setIsLoggedIn(true)
				setUser(res)
				setAuthError(null)
				console.log("User Authenticated")
			} else {
				setIsLoggedIn(false)
				setUser(null)
				setAuthError("Authentication failed. Please log in again.")
				console.log("User not authenticated or error occurred")
			}
		} catch (error) {
			console.error("GlobalProvider: get current user error:", error)
			setIsLoggedIn(false)
			setUser(null)
			setAuthError("An error occurred. Please try logging in again.")
		} finally {
			setIsLoading(false)
		}
	}, [])

	const handleSignOut = useCallback(async () => {
		setIsLoading(true)
		try {
			await signOut()
			await checkAuth()
			setIsLoggedIn(false)
			setUser(null)
		} catch (error) {
			console.error("GlobalProvider: Error signing out:", error)
			setAuthError("Error signing out. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		console.log("initial auth before:", initialAuthCheckComplete)
		checkAuth() //initial auth check
		console.log("initial auth after:", initialAuthCheckComplete)
	}, [checkAuth])

	useEffect(() => {
		if (user) console.log("username:", user.username)
	}, [user, isLoggedIn])

	const contextValue = useMemo(
		() => ({
			isLoggedIn,
			setIsLoggedIn,
			user,
			setUser,
			isLoading,
			setIsLoading,
			handleSignOut,
			checkAuth,
			authError,
			setInitialAuthCheckComplete,
		}),
		[
			isLoggedIn,
			user,
			isLoading,
			handleSignOut,
			checkAuth,
			authError,
			initialAuthCheckComplete,
		]
	)

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalProvider
