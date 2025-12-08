<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { CTASection } from '$lib/components/sections';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, TrendingUp, Clock, Building2 } from 'lucide-svelte';

	const caseStudies = [
		{
			id: 'customer-service-ai',
			title: 'AI-Powered Customer Service Transformation',
			client: 'TechFlow Inc.',
			industry: 'Technology',
			challenge: 'High volume of support tickets leading to slow response times and customer dissatisfaction.',
			solution: 'Implemented an intelligent chatbot with NLP capabilities and automated ticket routing system.',
			results: [
				{ metric: '70%', label: 'Reduction in response time' },
				{ metric: '45%', label: 'Decrease in ticket volume' },
				{ metric: '92%', label: 'Customer satisfaction score' }
			],
			tags: ['NLP', 'Chatbot', 'Automation']
		},
		{
			id: 'predictive-analytics',
			title: 'Predictive Analytics for Retail',
			client: 'RetailMax',
			industry: 'Retail',
			challenge: 'Inaccurate demand forecasting leading to inventory issues and lost sales.',
			solution: 'Developed a machine learning model for demand prediction using historical sales and external data.',
			results: [
				{ metric: '40%', label: 'Improvement in forecast accuracy' },
				{ metric: '25%', label: 'Reduction in inventory costs' },
				{ metric: '$2M+', label: 'Annual savings' }
			],
			tags: ['Machine Learning', 'Forecasting', 'Analytics']
		},
		{
			id: 'document-processing',
			title: 'Intelligent Document Processing',
			client: 'FinanceFirst',
			industry: 'Financial Services',
			challenge: 'Manual document review processes causing delays and errors in loan applications.',
			solution: 'Built an AI system for automated document extraction, validation, and processing.',
			results: [
				{ metric: '80%', label: 'Faster processing time' },
				{ metric: '95%', label: 'Data extraction accuracy' },
				{ metric: '60%', label: 'Cost reduction' }
			],
			tags: ['Computer Vision', 'OCR', 'Automation']
		}
	];
</script>

<SEOHead
	title="Case Studies"
	description="Explore real-world AI success stories and see how Neuroteq has helped businesses transform with artificial intelligence."
	keywords={['AI case studies', 'machine learning success stories', 'AI implementation examples']}
/>

<!-- Hero Section -->
<section class="section-padding bg-gradient-to-b from-muted/50 to-background">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Case Studies</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				Real Results from
				<span class="text-gradient"> AI Innovation</span>
			</h1>
			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				Discover how we've helped organizations across industries leverage AI to solve complex
				challenges and drive measurable business outcomes.
			</p>
		</div>
	</div>
</section>

<!-- Case Studies Grid -->
<section class="section-padding">
	<div class="container-wide">
		<div class="space-y-12">
			{#each caseStudies as study, i}
				<Card.Root class="overflow-hidden">
					<div class="grid lg:grid-cols-2">
						<!-- Content -->
						<div class="p-8 lg:p-12">
							<div class="flex flex-wrap gap-2 mb-4">
								{#each study.tags as tag}
									<Badge variant="secondary">{tag}</Badge>
								{/each}
							</div>
							<h2 class="text-2xl font-bold lg:text-3xl">{study.title}</h2>
							<div class="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
								<span class="flex items-center gap-1">
									<Building2 class="h-4 w-4" />
									{study.client}
								</span>
								<span>{study.industry}</span>
							</div>

							<div class="mt-6 space-y-4">
								<div>
									<h3 class="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Challenge</h3>
									<p class="mt-1">{study.challenge}</p>
								</div>
								<div>
									<h3 class="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Solution</h3>
									<p class="mt-1">{study.solution}</p>
								</div>
							</div>

							<Button href="/contact" class="mt-8" variant="outline">
								Discuss a Similar Project
								<ArrowRight class="ml-2 h-4 w-4" />
							</Button>
						</div>

						<!-- Results -->
						<div class="bg-muted/30 p-8 lg:p-12 flex items-center">
							<div class="w-full">
								<h3 class="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
									<TrendingUp class="h-4 w-4" />
									Results
								</h3>
								<div class="mt-6 grid gap-6 sm:grid-cols-3">
									{#each study.results as result}
										<div class="text-center">
											<div class="text-3xl font-bold text-primary lg:text-4xl">{result.metric}</div>
											<div class="mt-1 text-sm text-muted-foreground">{result.label}</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>

<!-- More Projects Section -->
<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Want to See More?
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				We've completed 50+ successful AI projects across various industries. Contact us to learn
				more about our experience in your specific domain.
			</p>
			<Button href="/contact" class="mt-8 gradient-primary text-white">
				Request More Case Studies
				<ArrowRight class="ml-2 h-5 w-5" />
			</Button>
		</div>
	</div>
</section>

<CTASection
	title="Ready to Create Your Success Story?"
	description="Let's discuss how Neuroteq can help you achieve similar results with AI."
/>
