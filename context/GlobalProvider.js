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

	const checkAuth = useCallback(async () => {
		setIsLoading(true)
		try {
			const res = await getCurrentUser()
			if (res) {
				setIsLoggedIn(true)
				setUser(res)
			} else {
				setIsLoggedIn(false)
				setUser(null)
			}
		} catch (error) {
			console.log("GlobalProvider: get current user error:", error)
			setIsLoggedIn(false)
			setUser(null)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	const handleSignOut = useCallback(async () => {
		setIsLoading(true)
		try {
			await signOut()
			setIsLoggedIn(false)
			setUser(null)
		} catch (error) {
			console.error("GlobalProvider; Error signing out:", error)
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
