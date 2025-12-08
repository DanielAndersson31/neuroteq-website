<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { CTASection } from '$lib/components/sections';
	import { services, additionalCapabilities } from '$lib/config/services';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, CheckCircle2 } from 'lucide-svelte';
</script>

<SEOHead
	title="AI Services"
	description="Explore Neuroteq's comprehensive AI services including custom development, consulting, and integration solutions."
	keywords={['AI services', 'machine learning services', 'AI consulting', 'custom AI development']}
/>

<!-- Hero Section -->
<section class="section-padding bg-gradient-to-b from-muted/50 to-background">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Our Services</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				Comprehensive AI Solutions
			</h1>
			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				From strategy to implementation, we provide end-to-end AI services that help businesses
				harness the power of artificial intelligence.
			</p>
		</div>
	</div>
</section>

<!-- Main Services -->
<section class="section-padding">
	<div class="container-wide">
		<div class="space-y-24">
			{#each services as service, i}
				<div class="grid gap-12 lg:grid-cols-2 lg:gap-16 {i % 2 === 1 ? 'lg:flex-row-reverse' : ''}">
					<!-- Content -->
					<div class="{i % 2 === 1 ? 'lg:order-2' : ''}">
						<div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<svelte:component this={service.icon} class="h-7 w-7" />
						</div>
						<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{service.title}</h2>
						<p class="mt-4 text-lg text-muted-foreground">{service.longDescription}</p>

						<!-- Features -->
						<div class="mt-8 grid gap-3 sm:grid-cols-2">
							{#each service.features as feature}
								<div class="flex items-start gap-3">
									<CheckCircle2 class="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
									<span class="text-sm">{feature}</span>
								</div>
							{/each}
						</div>

						<Button href={service.href} class="mt-8 gradient-primary text-white">
							Learn More
							<ArrowRight class="ml-2 h-5 w-5" />
						</Button>
					</div>

					<!-- Benefits Card -->
					<div class="{i % 2 === 1 ? 'lg:order-1' : ''}">
						<Card.Root class="h-full bg-muted/30">
							<Card.Header>
								<Card.Title>Key Benefits</Card.Title>
								<Card.Description>Why choose our {service.title.toLowerCase()} services</Card.Description>
							</Card.Header>
							<Card.Content>
								<ul class="space-y-4">
									{#each service.benefits as benefit}
										<li class="flex items-start gap-3">
											<div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
											<span>{benefit}</span>
										</li>
									{/each}
								</ul>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Additional Capabilities -->
<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Additional Capabilities</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Beyond Our Core Services
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				We offer additional capabilities to support your complete AI journey.
			</p>
		</div>

		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each additionalCapabilities as capability}
				<Card.Root class="text-center">
					<Card.Header>
						<div class="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<svelte:component this={capability.icon} class="h-6 w-6" />
						</div>
						<Card.Title>{capability.title}</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-muted-foreground">{capability.description}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>

<CTASection
	title="Not Sure Which Service You Need?"
	description="Let's discuss your specific challenges and find the right AI solution for your business."
	primaryCta={{ text: "Schedule a Free Consultation", href: "/contact" }}
/>
