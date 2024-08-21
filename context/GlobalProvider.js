import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react"
import { getCurrentUser, signOut } from "../lib/appwrite"

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [authError, setAuthError] = useState(null)

	const checkAuth = useCallback(async () => {
		setIsLoading(true)
		try {
			const res = await getCurrentUser()
			if (res) {
				setIsLoggedIn(true)
				setUser(res)
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

	useEffect(() => {
		checkAuth() //initial auth check

		//periodic auth check
		const authCheckInterval = setInterval(checkAuth, 5 * 6 * 1000)
		return () => clearInterval(authCheckInterval)
	}, [checkAuth])

	useEffect(() => {
		if (isLoggedIn) console.log("username:", user.username)
	}, [user])

	const handleSignOut = useCallback(async () => {
		setIsLoading(true)
		try {
			await signOut()
			setIsLoggedIn(false)
			setUser(null)
		} catch (error) {
			console.error("GlobalProvider: Error signing out:", error)
			setAuthError("Error signing out. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}, [])

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
				isLoading,
				setIsLoading,
				handleSignOut,
				checkAuth,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalProvider
