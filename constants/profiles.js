// Assuming you have 12 profiles, adjust this number as needed
const numberOfProfiles = 12

// Dynamically import all images from the profiles folder
const images = require.context(
	"../assets/images/profiles",
	false,
	/\.(png|jpe?g|svg)$/
)

// Import the default image
import defaultImage from "../assets/images/profiles/default.png"

const profile = Array.from({ length: numberOfProfiles }, (_, index) => {
	const id = (index + 1).toString()
	const imagePath = `./${id}.png`
	const thumbnail = images.keys().includes(imagePath)
		? images(imagePath)
		: defaultImage
	return {
		id,
		name: `User ${id}`,
		thumbnail,
	}
})

export default profile
