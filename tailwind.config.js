/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./constants/**/*.{js,jsx,ts,tsx}",
		"./assets/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#23232b",
				secondary: {
					DEFAULT: "#FF9C01",
					100: "#FF9001",
					200: "#FF8E01",
				},
				black: {
					DEFAULT: "#000",
					100: "#1E1E2D",
					200: "#232533",
				},
				gray: {
					100: "#CDCDE0",
				},
			},
			fontFamily: {
				pthin: ["sans-serif"],
				pextralight: ["sans-serif"],
				plight: ["sans-serif"],
				pregular: ["sans-serif"],
				pmedium: ["sans-serif"],
				psemibold: ["sans-serif"],
				pbold: ["sans-serif"],
				pextrabold: ["sans-serif"],
				pblack: ["sans-serif"],
			},
		},
	},
	plugins: [],
}
