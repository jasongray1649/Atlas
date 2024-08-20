const numberOfProfiles = 50

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
	const hasImage = images.keys().includes(imagePath)
	const thumbnail = hasImage ? images(imagePath) : defaultImage
	const profilepic = thumbnail
	const username = hasImage ? `User ${id}` : "Donald J. Trump"
	return {
		id,
		name: username,
		thumbnail,
		profilepic,
	}
})

export default profile
