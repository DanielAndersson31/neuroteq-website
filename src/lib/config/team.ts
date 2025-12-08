export interface TeamMember {
	id: string;
	name: string;
	role: string;
	bio: string;
	image: string;
	linkedin?: string;
	twitter?: string;
}

export const teamMembers: TeamMember[] = [
	{
		id: 'member-1',
		name: 'Alex Chen',
		role: 'CEO & Co-Founder',
		bio: 'Former Google AI researcher with 15+ years of experience in machine learning and enterprise AI solutions.',
		image: '/images/team/placeholder-1.jpg',
		linkedin: '#',
		twitter: '#'
	},
	{
		id: 'member-2',
		name: 'Sarah Martinez',
		role: 'CTO & Co-Founder',
		bio: 'PhD in Computer Science from MIT. Expert in deep learning architectures and scalable AI systems.',
		image: '/images/team/placeholder-2.jpg',
		linkedin: '#'
	},
	{
		id: 'member-3',
		name: 'James Wilson',
		role: 'Head of AI Research',
		bio: 'Published researcher in NLP and computer vision. Previously led AI teams at Amazon and Microsoft.',
		image: '/images/team/placeholder-3.jpg',
		linkedin: '#',
		twitter: '#'
	},
	{
		id: 'member-4',
		name: 'Emily Davis',
		role: 'Director of Client Success',
		bio: 'Passionate about helping businesses leverage AI for growth. 10+ years in tech consulting.',
		image: '/images/team/placeholder-4.jpg',
		linkedin: '#'
	}
];

export const companyValues = [
	{
		title: 'Innovation First',
		description: 'We stay at the forefront of AI technology, continuously exploring new approaches to solve complex problems.'
	},
	{
		title: 'Client Partnership',
		description: 'We work alongside our clients as true partners, deeply understanding their goals and challenges.'
	},
	{
		title: 'Ethical AI',
		description: 'We build AI systems that are fair, transparent, and beneficial for society as a whole.'
	},
	{
		title: 'Excellence',
		description: 'We hold ourselves to the highest standards in everything we deliver, from code to client communication.'
	}
];
