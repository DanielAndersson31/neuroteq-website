<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { CTASection } from '$lib/components/sections';
	import { Badge } from '$lib/components/ui/badge';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';
	import { MessageSquare } from 'lucide-svelte';

	const faqs = [
		{
			category: 'General',
			questions: [
				{
					question: 'What industries does Neuroteq work with?',
					answer: 'We work with businesses across various industries including healthcare, finance, retail, manufacturing, and technology. Our AI solutions are adaptable to different business contexts and can be customized to meet industry-specific requirements and regulations.'
				},
				{
					question: 'How long does a typical AI project take?',
					answer: 'Project timelines vary based on complexity and scope. A proof-of-concept typically takes 4-8 weeks, while full production deployments can range from 3-12 months. During our initial consultation, we provide detailed timeline estimates based on your specific requirements.'
				},
				{
					question: 'Do you work with startups or only enterprise clients?',
					answer: 'We work with organizations of all sizes, from innovative startups to Fortune 500 enterprises. We tailor our engagement model and solutions to match your organization size, budget, and growth stage.'
				}
			]
		},
		{
			category: 'Technical',
			questions: [
				{
					question: 'What AI technologies do you specialize in?',
					answer: 'We specialize in machine learning, deep learning, natural language processing (NLP), computer vision, and predictive analytics. Our team is proficient with major frameworks like TensorFlow, PyTorch, and scikit-learn, and we leverage cloud AI services from AWS, Google Cloud, and Azure.'
				},
				{
					question: 'Can you integrate AI with our existing systems?',
					answer: 'Absolutely. Integration is one of our core services. We design AI solutions that seamlessly connect with your existing infrastructure, including legacy systems, CRMs, ERPs, and custom applications through APIs and data pipelines.'
				},
				{
					question: 'How do you ensure data security and privacy?',
					answer: 'Data security is paramount in all our projects. We implement enterprise-grade security measures, comply with regulations like GDPR and HIPAA where applicable, and can work with on-premises deployments for sensitive data. All team members follow strict data handling protocols.'
				}
			]
		},
		{
			category: 'Process & Support',
			questions: [
				{
					question: 'What does your development process look like?',
					answer: 'We follow an agile methodology with four key phases: Discovery (understanding your needs), Design (architecting the solution), Development (iterative building and testing), and Deployment (launch and optimization). You have visibility and input at every stage.'
				},
				{
					question: 'Do you provide ongoing support after deployment?',
					answer: 'Yes, we offer comprehensive support and maintenance packages. This includes system monitoring, performance optimization, model retraining, and feature enhancements. Our team remains available to ensure your AI solution continues to deliver value.'
				},
				{
					question: 'How do you handle project communication?',
					answer: 'We believe in transparent, regular communication. You will have a dedicated project manager, access to our project management tools, weekly status updates, and direct channels to our technical team. We adapt our communication style to your preferences.'
				}
			]
		},
		{
			category: 'Pricing',
			questions: [
				{
					question: 'How is pricing determined for AI projects?',
					answer: 'Pricing depends on project scope, complexity, timeline, and required resources. We offer flexible engagement models including fixed-price projects, time-and-materials, and retainer arrangements. We provide detailed proposals after our initial discovery session.'
				},
				{
					question: 'Do you offer pilot or proof-of-concept projects?',
					answer: 'Yes, we often recommend starting with a proof-of-concept to validate the AI approach before committing to full-scale development. This reduces risk and helps establish clear success metrics for the larger project.'
				}
			]
		}
	];
</script>

<SEOHead
	title="Frequently Asked Questions"
	description="Find answers to common questions about Neuroteq's AI services, process, and capabilities."
	keywords={['AI FAQ', 'Neuroteq questions', 'AI development questions', 'machine learning FAQ']}
/>

<!-- Hero Section -->
<section class="section-padding bg-gradient-to-b from-muted/50 to-background">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">FAQ</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				Frequently Asked Questions
			</h1>
			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				Find answers to common questions about our AI services, process, and how we can help your business.
			</p>
		</div>
	</div>
</section>

<!-- FAQ Sections -->
<section class="section-padding">
	<div class="container-narrow">
		{#each faqs as category, categoryIndex}
			<div class="{categoryIndex > 0 ? 'mt-12' : ''}">
				<h2 class="text-2xl font-bold mb-6">{category.category}</h2>
				<Accordion.Root class="space-y-4">
					{#each category.questions as faq, i}
						<Accordion.Item value="{category.category}-{i}" class="border rounded-lg px-6">
							<Accordion.Trigger class="text-left py-4 hover:no-underline">
								<span class="font-medium">{faq.question}</span>
							</Accordion.Trigger>
							<Accordion.Content class="pb-4 text-muted-foreground">
								{faq.answer}
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>
		{/each}
	</div>
</section>

<!-- Still Have Questions -->
<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<div class="mx-auto max-w-2xl text-center">
			<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
				<MessageSquare class="h-6 w-6" />
			</div>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Still Have Questions?
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				Can't find the answer you're looking for? Our team is here to help.
			</p>
			<Button href="/contact" class="mt-8 gradient-primary text-white">
				Contact Us
			</Button>
		</div>
	</div>
</section>

<CTASection
	title="Ready to Get Started?"
	description="Let's discuss your AI project and see how Neuroteq can help you succeed."
/>
