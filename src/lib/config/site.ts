export const siteConfig = {
	name: 'Neuroteq',
	tagline: 'Innovations Within AI',
	description: 'Neuroteq provides cutting-edge AI consulting and custom development services to transform your business with artificial intelligence.',
	url: 'https://neuroteq.com',
	ogImage: '/images/og-image.png',

	// Contact
	email: 'contact@neuroteq.com',
	phone: '+1 (555) 123-4567',

	// Social
	social: {
		twitter: 'https://twitter.com/neuroteq',
		linkedin: 'https://linkedin.com/company/neuroteq',
		github: 'https://github.com/neuroteq'
	},

	// Navigation
	mainNav: [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{
			title: 'Services',
			href: '/services',
			children: [
				{ title: 'AI Development', href: '/services/ai-development', description: 'Custom AI/ML solutions built for your needs' },
				{ title: 'Consulting', href: '/services/consulting', description: 'Strategic AI roadmapping and advisory' },
				{ title: 'Integration', href: '/services/integration', description: 'Seamless AI integration into existing systems' }
			]
		},
		{ title: 'Case Studies', href: '/case-studies' },
		{ title: 'Team', href: '/team' },
		{ title: 'FAQ', href: '/faq' },
		{ title: 'Contact', href: '/contact' }
	],

	// Footer navigation groups
	footerNav: {
		services: [
			{ title: 'AI Development', href: '/services/ai-development' },
			{ title: 'Consulting', href: '/services/consulting' },
			{ title: 'Integration', href: '/services/integration' }
		],
		company: [
			{ title: 'About', href: '/about' },
			{ title: 'Team', href: '/team' },
			{ title: 'Case Studies', href: '/case-studies' }
		],
		resources: [
			{ title: 'FAQ', href: '/faq' },
			{ title: 'Contact', href: '/contact' }
		],
		legal: [
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' }
		]
	}
};

export type SiteConfig = typeof siteConfig;
