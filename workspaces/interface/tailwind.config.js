/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"14Blue": "#A5B8CB",
				"14Purple": "#E5DDEA",
				"14Yellow": "#FFF496",
				"14Midnight": "#2C333A",
				"14Starlight": "#F9F7F2",
				"14Red": "#FB1231",
				"15Blue": "#D5DDE0",
				"15Pink": "#EBD4D4",
				"15Yellow": "#EDE8CA",
				"15Green": "#D3DBCD",
				"15Black": "#474A4C",
				"15ProNaturalTitanium": "#BBB5A9",
				"15ProBlueTitanium": "#484F5F",
				"15ProWhiteTitanium": "#F3F2ED",
				"15ProBlackTitanium": "#4C4E4F",
			},
		},
	},
	plugins: [],
}
