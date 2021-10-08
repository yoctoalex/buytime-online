import { DEFAULT_COUNTRY } from '../helpers/constants';

export const strings = {
	header: {
		headerOptions: ['For Him', 'For Her', 'Help'],
		activeHeader: 'For Him',
		loginLabel: 'Log in',
		signUpLabel: 'Sign Up'
	},
	layout: {
		introduction: {
			title: 'Exclusive, Handcrafted, Attractive.',
			buttonLabel: 'Sign up to become a member',
			countrySelector: {
				defaultCountry: DEFAULT_COUNTRY,
				countries: ['US', 'GB', 'DE', 'AU', 'JP', 'KR', 'CA'],
				customLabels: undefined,
			},
			languageSelector: {
				defaultCountry: DEFAULT_COUNTRY,
				customLabels: { US: 'English', GB: 'English', DE: 'German', JP: 'English', KR: 'English', CA: 'English' },
				countries: ['US']
			},
		},
		sellerSection: {
			title: 'Become a member of Buytime',
			subtitle: 'Join BuyTime club to get exclusive offers and benefits.',
			steps: [
				{
					title: 'Special offers',
					text: 'embers have access to all our special offers.'
				},
				{
					title: 'Exclusives and new deals',
					text: 'Get premium access to all deals and exclusives.'
				},
				{
					title: 'Check out faster',
					text: 'Membership lets members spend less time on formality.'
				},
				{
					title: 'Review orders',
					text: 'Keep track of orders and review all previous purchases.'
				}
			],
		},
		popularSection: {
			title: 'Best Sellers',
		},
		commentsSection: {
			title: 'Watch Reviews',
		},
		footer: {
			footerOptions: ['Terms of Use', 'Privacy Policy', 'Help'],
		},
		nearestStoreSection: {
			title: "Find a store",
			zipCode: "Enter your zip code",
			findButton: "Find",
			distanceTitle: "Distance",
			errorNothingFound: "Sorry, didn't find stores near entered location",
			messageSearching: "Searching...."
		}
	},
	singUp: {
		title: 'Get Started',
		subtitle: 'Already have an account?',
		linkTitle: 'Log in',
		formTitle: 'Create account',
		namePlaceholder: 'Your name',
		loginPlaceholder: 'Username',
		emailPlaceholder: 'Email address',
		passwordPlaceholder: 'Password',
		confirmPasswordPlaceholder: 'Confirm password',
		submitButtonLabel: 'Sign Up',
	},
	login: {
		title: 'Log in',
		subtitle: 'Don\'t have an account?',
		linkTitle: 'Sign up',
		loginPlaceholder: 'Username',
		passwordPlaceholder: 'Password',
		submitButtonLabel: 'Login',
		forgotPasswordLabel: 'Forgot password?'
	},
	addItem: {
		title: 'Upload a photo for search',
		titlePlaceholder: 'Watch brand',
		startingPricePlaceholder: 'Material',
		datePlaceholder: 'Gender',
		descriptionPlaceholder: 'Description (optional)',
		submitButtonLabel: 'Find Watch'
	}
};
