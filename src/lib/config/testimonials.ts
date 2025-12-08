export interface Testimonial {
	id: string;
	quote: string;
	author: string;
	role: string;
	company: string;
	image?: string;
}

export const testimonials: Testimonial[] = [
	{
		id: 'testimonial-1',
		quote: 'Neuroteq transformed our customer service with an AI solution that reduced response times by 70%. Their expertise and dedication to understanding our business made all the difference.',
		author: 'Michael Thompson',
		role: 'VP of Operations',
		company: 'TechFlow Inc.',
		image: '/images/testimonials/placeholder-1.jpg'
	},
	{
		id: 'testimonial-2',
		quote: 'Working with Neuroteq was a game-changer. They delivered a predictive analytics platform that increased our revenue forecasting accuracy by 40%.',
		author: 'Jennifer Lee',
		role: 'Chief Data Officer',
		company: 'RetailMax',
		image: '/images/testimonials/placeholder-2.jpg'
	},
	{
		id: 'testimonial-3',
		quote: 'The team at Neuroteq doesnt just build AI solutions—they build partnerships. Their consulting helped us develop a clear AI strategy that aligned with our business goals.',
		author: 'Robert Garcia',
		role: 'CEO',
		company: 'InnovateCorp',
		image: '/images/testimonials/placeholder-3.jpg'
	}
];

export const stats = [
	{ value: '50+', label: 'Projects Delivered' },
	{ value: '98%', label: 'Client Satisfaction' },
	{ value: '40%', label: 'Average ROI Increase' },
	{ value: '24/7', label: 'Support Available' }
];
