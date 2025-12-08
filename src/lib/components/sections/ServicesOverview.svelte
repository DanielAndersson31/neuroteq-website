<script lang="ts">
	import { services } from '$lib/config/services';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight } from 'lucide-svelte';
</script>

<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<!-- Section Header -->
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Our Services</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
				AI Solutions Tailored to Your Needs
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				From custom development to strategic consulting, we offer comprehensive AI services
				to help your business thrive in the age of artificial intelligence.
			</p>
		</div>

		<!-- Services Grid -->
		<div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service, i}
				<Card.Root class="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
					<Card.Header>
						<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
							<svelte:component this={service.icon} class="h-6 w-6" />
						</div>
						<Card.Title class="text-xl">{service.title}</Card.Title>
						<Card.Description class="text-base">
							{service.shortDescription}
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<ul class="space-y-2 text-sm text-muted-foreground">
							{#each service.features.slice(0, 3) as feature}
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
									{feature}
								</li>
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer>
						<Button href={service.href} variant="ghost" class="group/btn w-full justify-between">
							Learn More
							<ArrowRight class="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>

		<!-- View All CTA -->
		<div class="mt-12 text-center">
			<Button href="/services" variant="outline" size="lg">
				View All Services
				<ArrowRight class="ml-2 h-5 w-5" />
			</Button>
		</div>
	</div>
</section>
