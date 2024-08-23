import { useState, useEffect } from "react"

const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(true)
const useAppwrite = (fn) => {
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const res = await getProfiles()
				setData(res)
			} catch (error) {
				Alert.alert("Error", error.message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	console.log("data:", data)
}
