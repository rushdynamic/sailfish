/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-dark-bg': '#10181c',
				'secondary-dark-bg': '#34444c',
				'primary-dark-text': '#fefefe',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
				accent: ['Big Shoulders Display', 'cursive'],
			},
			fontSize: {
				xxs: '0.55rem',
			},
			boxShadow: {
				'harsh-primary': '5px 5px #03C988',
				'harsh-secondary': '5px 5px rgb(251,146,60)',
			},
		},
	},
	plugins: [],
};
