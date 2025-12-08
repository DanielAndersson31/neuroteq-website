import type { LucideIcon } from 'lucide-svelte';
import { Brain, Lightbulb, Cog, GraduationCap, Code, Database } from 'lucide-svelte';

export interface Service {
	id: string;
	title: string;
	shortDescription: string;
	longDescription: string;
	icon: typeof Brain;
	href: string;
	features: string[];
	benefits: string[];
}

export const services: Service[] = [
	{
		id: 'ai-development',
		title: 'Custom AI Development',
		shortDescription: 'Bespoke AI/ML solutions engineered specifically for your business challenges.',
		longDescription: 'We design and develop custom artificial intelligence solutions that address your unique business needs. From machine learning models to neural networks, our team builds AI systems that deliver measurable results.',
		icon: Brain,
		href: '/services/ai-development',
		features: [
			'Custom machine learning models',
			'Deep learning & neural networks',
			'Natural language processing (NLP)',
			'Computer vision systems',
			'Predictive analytics',
			'Recommendation engines'
		],
		benefits: [
			'Solutions tailored to your specific needs',
			'Scalable architecture for growth',
			'Continuous improvement and optimization',
			'Full ownership of developed IP'
		]
	},
	{
		id: 'consulting',
		title: 'AI Consulting',
		shortDescription: 'Strategic guidance to navigate your AI journey with confidence.',
		longDescription: 'Our expert consultants help you identify AI opportunities, develop implementation strategies, and build the foundation for successful AI adoption across your organization.',
		icon: Lightbulb,
		href: '/services/consulting',
		features: [
			'AI readiness assessment',
			'Technology stack recommendations',
			'ROI analysis and business case development',
			'AI governance frameworks',
			'Data strategy consulting',
			'Change management support'
		],
		benefits: [
			'Clear roadmap for AI implementation',
			'Risk mitigation strategies',
			'Informed technology decisions',
			'Accelerated time to value'
		]
	},
	{
		id: 'integration',
		title: 'AI Integration',
		shortDescription: 'Seamlessly embed AI capabilities into your existing systems and workflows.',
		longDescription: 'We specialize in integrating AI solutions with your existing technology infrastructure, ensuring smooth adoption and maximum impact without disrupting your operations.',
		icon: Cog,
		href: '/services/integration',
		features: [
			'API development and integration',
			'Legacy system modernization',
			'Cloud AI service integration',
			'Real-time data pipelines',
			'MLOps implementation',
			'System optimization'
		],
		benefits: [
			'Minimal disruption to operations',
			'Leverage existing investments',
			'Faster deployment cycles',
			'Unified data ecosystem'
		]
	}
];

export const additionalCapabilities = [
	{
		title: 'AI Training & Workshops',
		description: 'Empower your team with hands-on AI education and skill development.',
		icon: GraduationCap
	},
	{
		title: 'Prototype Development',
		description: 'Rapid AI prototypes to validate concepts before full-scale development.',
		icon: Code
	},
	{
		title: 'Data Engineering',
		description: 'Build robust data infrastructure to fuel your AI initiatives.',
		icon: Database
	}
];
