<script lang="ts">
	import type { Service } from '$lib/config/services';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { ArrowRight, CheckCircle2 } from 'lucide-svelte';

	export let service: Service;
</script>

<!-- Hero Section -->
<section class="section-padding bg-gradient-to-b from-muted/50 to-background">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
				<svelte:component this={service.icon} class="h-8 w-8" />
			</div>
			<Badge variant="outline" class="mb-4">Service</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				{service.title}
			</h1>
			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				{service.longDescription}
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button href="/contact" size="lg" class="gradient-primary text-white">
					Get Started
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
				<Button href="/case-studies" variant="outline" size="lg">
					View Case Studies
				</Button>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="section-padding">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">What We Offer</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Capabilities & Features
			</h2>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each service.features as feature, i}
				<Card.Root class="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
					<Card.Header>
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
								{i + 1}
							</div>
							<Card.Title class="text-lg">{feature}</Card.Title>
						</div>
					</Card.Header>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>

<!-- Benefits Section -->
<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
			<div>
				<Badge variant="outline" class="mb-4">Why Choose Us</Badge>
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
					Benefits of Our {service.title}
				</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					Partner with Neuroteq to leverage our expertise and drive meaningful results for your business.
				</p>
			</div>
			<div class="space-y-4">
				{#each service.benefits as benefit}
					<div class="flex items-start gap-4 rounded-lg bg-background p-4 shadow-sm">
						<CheckCircle2 class="h-6 w-6 flex-shrink-0 text-primary mt-0.5" />
						<span class="text-lg">{benefit}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Process Section -->
<section class="section-padding">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Our Process</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				How We Work
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				Our proven methodology ensures successful delivery of your AI project.
			</p>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-4">
			{#each [
				{ step: '01', title: 'Discovery', description: 'We analyze your requirements and business context' },
				{ step: '02', title: 'Design', description: 'Our team architects the optimal solution' },
				{ step: '03', title: 'Development', description: 'We build and iterate on your AI solution' },
				{ step: '04', title: 'Deployment', description: 'We deploy, monitor, and optimize' }
			] as phase}
				<div class="text-center">
					<div class="mx-auto mb-4 text-4xl font-bold text-primary/30">{phase.step}</div>
					<h3 class="text-xl font-semibold">{phase.title}</h3>
					<p class="mt-2 text-sm text-muted-foreground">{phase.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
