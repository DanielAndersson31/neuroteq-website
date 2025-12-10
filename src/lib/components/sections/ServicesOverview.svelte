<script lang="ts">
	import { services } from '$lib/config/services';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger } from '$lib/utils/animations';

	let sectionHeader: HTMLElement;
	let servicesGrid: HTMLElement;
	let ctaSection: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Animate section header
		gsap.fromTo(
			sectionHeader,
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionHeader,
					start: 'top 85%',
					once: true
				}
			}
		);

		// Animate service cards with stagger
		const cards = servicesGrid.querySelectorAll('.service-card');
		gsap.fromTo(
			cards,
			{ opacity: 0, y: 60, scale: 0.95 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: servicesGrid,
					start: 'top 80%',
					once: true
				}
			}
		);

		// Animate CTA
		gsap.fromTo(
			ctaSection,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: ctaSection,
					start: 'top 90%',
					once: true
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section class="section-padding bg-bg-surface relative overflow-hidden pt-8">
	<!-- Subtle circuit pattern background -->
	<div class="absolute inset-0 circuit-pattern opacity-5 pointer-events-none"></div>

	<div class="container-wide relative">
		<!-- Section Header -->
		<div bind:this={sectionHeader} class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4 border-primary/30 text-primary">Our Services</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
				AI Solutions Tailored to Your Needs
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				From custom development to strategic consulting, we offer comprehensive AI services
				to help your business thrive in the age of artificial intelligence.
			</p>
		</div>

		<!-- Services Grid -->
		<div bind:this={servicesGrid} class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service, i}
				<Card.Root class="service-card group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 card-elevated">
					<!-- Gradient hover overlay -->
					<div class="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500"></div>

					<Card.Header class="relative">
						<div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-700 group-hover:text-white">
							<svelte:component this={service.icon} class="h-7 w-7" />
						</div>
						<Card.Title class="text-xl text-foreground group-hover:text-primary transition-colors">{service.title}</Card.Title>
						<Card.Description class="text-base text-muted-foreground">
							{service.shortDescription}
						</Card.Description>
					</Card.Header>
					<Card.Content class="relative">
						<ul class="space-y-2 text-sm text-muted-foreground">
							{#each service.features.slice(0, 3) as feature}
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
									{feature}
								</li>
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer class="relative">
						<Button href={service.href} variant="ghost" class="group/btn w-full justify-between text-muted-foreground hover:text-primary hover:bg-primary/10">
							Learn More
							<ArrowRight class="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>

		<!-- View All CTA -->
		<div bind:this={ctaSection} class="mt-12 text-center">
			<Button href="/services" variant="outline" size="lg" class="btn-outline">
				View All Services
				<ArrowRight class="ml-2 h-5 w-5" />
			</Button>
		</div>
	</div>
</section>
