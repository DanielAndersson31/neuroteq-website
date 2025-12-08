<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { CTASection } from '$lib/components/sections';
	import { companyValues } from '$lib/config/team';
	import { stats } from '$lib/config/testimonials';
	import { siteConfig } from '$lib/config/site';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Target, Users, Lightbulb, ArrowRight } from 'lucide-svelte';
</script>

<SEOHead
	title="About Us"
	description="Learn about Neuroteq's mission to democratize AI and help businesses innovate through intelligent solutions."
	keywords={['about Neuroteq', 'AI company', 'AI innovation', 'technology company']}
/>

<!-- Hero Section -->
<section class="section-padding bg-gradient-to-b from-muted/50 to-background">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">About Us</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				Pioneering the Future of
				<span class="text-gradient"> AI Innovation</span>
			</h1>
			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				At Neuroteq, we believe artificial intelligence should be accessible, ethical, and
				transformative. We're dedicated to helping businesses unlock the power of AI.
			</p>
		</div>
	</div>
</section>

<!-- Story Section -->
<section class="section-padding">
	<div class="container-wide">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
			<div>
				<Badge variant="outline" class="mb-4">Our Story</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
					Born from a Vision to Democratize AI
				</h2>
				<div class="mt-6 space-y-4 text-muted-foreground">
					<p>
						Neuroteq was founded with a simple yet ambitious mission: to make cutting-edge AI
						technology accessible to businesses of all sizes. We saw too many companies struggling
						to navigate the complex landscape of artificial intelligence, missing opportunities
						to innovate and grow.
					</p>
					<p>
						Our team of AI researchers, engineers, and business strategists came together to bridge
						this gap. We combine deep technical expertise with a genuine understanding of business
						challenges, delivering AI solutions that create real, measurable value.
					</p>
					<p>
						Today, we're proud to partner with organizations across industries, helping them
						transform their operations, enhance customer experiences, and drive innovation
						through intelligent AI solutions.
					</p>
				</div>
			</div>
			<div class="grid gap-6 sm:grid-cols-2">
				{#each stats as stat}
					<Card.Root class="text-center p-6">
						<div class="text-3xl font-bold text-primary">{stat.value}</div>
						<div class="mt-2 text-sm text-muted-foreground">{stat.label}</div>
					</Card.Root>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Mission & Vision -->
<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<div class="grid gap-8 md:grid-cols-2">
			<Card.Root class="p-8">
				<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<Target class="h-6 w-6" />
				</div>
				<h3 class="text-2xl font-bold">Our Mission</h3>
				<p class="mt-4 text-muted-foreground">
					To empower businesses with intelligent AI solutions that drive innovation, efficiency,
					and growth while maintaining the highest standards of ethics and responsibility.
				</p>
			</Card.Root>
			<Card.Root class="p-8">
				<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<Lightbulb class="h-6 w-6" />
				</div>
				<h3 class="text-2xl font-bold">Our Vision</h3>
				<p class="mt-4 text-muted-foreground">
					A world where every organization can harness the transformative power of artificial
					intelligence to solve complex challenges and create positive impact.
				</p>
			</Card.Root>
		</div>
	</div>
</section>

<!-- Values Section -->
<section class="section-padding">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Our Values</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				What We Stand For
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				These core principles guide everything we do at Neuroteq.
			</p>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each companyValues as value, i}
				<Card.Root class="text-center p-6">
					<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
						{i + 1}
					</div>
					<h3 class="text-lg font-semibold">{value.title}</h3>
					<p class="mt-2 text-sm text-muted-foreground">{value.description}</p>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>

<!-- Team CTA -->
<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
				<Users class="h-6 w-6" />
			</div>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Meet the Team Behind Neuroteq
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				Our diverse team of experts brings together decades of experience in AI, machine learning,
				and business transformation.
			</p>
			<Button href="/team" class="mt-8 gradient-primary text-white">
				Meet Our Team
				<ArrowRight class="ml-2 h-5 w-5" />
			</Button>
		</div>
	</div>
</section>

<CTASection />
