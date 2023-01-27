/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			boxShadow: {
				'harsh-primary': '5px 5px #03C988',
				'harsh-secondary': '5px 5px orange',
			},
		},
	},
	plugins: [],
};
