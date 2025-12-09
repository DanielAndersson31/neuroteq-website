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

<section class="section-padding bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
	<!-- Decorative background elements -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
	</div>

	<div class="container-wide relative">
		<!-- Section Header -->
		<div bind:this={sectionHeader} class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4 border-teal-500/30 text-teal-600 dark:text-teal-400">Our Services</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
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
				<Card.Root class="service-card group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50">
					<!-- Gradient hover overlay -->
					<div class="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>

					<Card.Header class="relative">
						<div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 text-teal-600 dark:text-teal-400 transition-all duration-500 group-hover:scale-110 group-hover:from-teal-500 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/25">
							<svelte:component this={service.icon} class="h-7 w-7" />
						</div>
						<Card.Title class="text-xl group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{service.title}</Card.Title>
						<Card.Description class="text-base">
							{service.shortDescription}
						</Card.Description>
					</Card.Header>
					<Card.Content class="relative">
						<ul class="space-y-2 text-sm text-muted-foreground">
							{#each service.features.slice(0, 3) as feature}
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-500"></span>
									{feature}
								</li>
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer class="relative">
						<Button href={service.href} variant="ghost" class="group/btn w-full justify-between hover:text-teal-600 dark:hover:text-teal-400">
							Learn More
							<ArrowRight class="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>

		<!-- View All CTA -->
		<div bind:this={ctaSection} class="mt-12 text-center">
			<Button href="/services" variant="outline" size="lg" class="border-teal-500/30 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50">
				View All Services
				<ArrowRight class="ml-2 h-5 w-5" />
			</Button>
		</div>
	</div>
</section>
