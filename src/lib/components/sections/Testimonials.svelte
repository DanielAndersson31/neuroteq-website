<script lang="ts">
	import { testimonials, stats } from '$lib/config/testimonials';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Quote } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger } from '$lib/utils/animations';

	let statsSection: HTMLElement;
	let headerSection: HTMLElement;
	let testimonialsGrid: HTMLElement;

	// Parse stat values for counter animation
	function parseStatValue(value: string): { num: number; prefix: string; suffix: string } {
		const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
		if (match) {
			return { prefix: match[1], num: parseInt(match[2]), suffix: match[3] };
		}
		return { prefix: '', num: 0, suffix: value };
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Animate stats with counter effect
		const statElements = statsSection.querySelectorAll('.stat-item');
		gsap.fromTo(
			statElements,
			{ opacity: 0, y: 30, scale: 0.9 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: statsSection,
					start: 'top 85%',
					once: true
				}
			}
		);

		// Counter animation for stat values
		const statValues = statsSection.querySelectorAll('.stat-value');
		statValues.forEach((el, i) => {
			const parsed = parseStatValue(stats[i].value);
			const counter = { value: 0 };

			gsap.to(counter, {
				value: parsed.num,
				duration: 2,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: statsSection,
					start: 'top 85%',
					once: true
				},
				onUpdate: () => {
					(el as HTMLElement).textContent = `${parsed.prefix}${Math.round(counter.value)}${parsed.suffix}`;
				}
			});
		});

		// Animate section header
		gsap.fromTo(
			headerSection,
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: headerSection,
					start: 'top 85%',
					once: true
				}
			}
		);

		// Animate testimonial cards
		const cards = testimonialsGrid.querySelectorAll('.testimonial-card');
		gsap.fromTo(
			cards,
			{ opacity: 0, y: 50, rotateX: -10 },
			{
				opacity: 1,
				y: 0,
				rotateX: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: testimonialsGrid,
					start: 'top 80%',
					once: true
				}
			}
		);

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section class="section-padding relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
		<div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
	</div>

	<div class="container-wide relative">
		<!-- Stats -->
		<div
			bind:this={statsSection}
			class="mb-20 grid gap-8 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 sm:grid-cols-2 lg:grid-cols-4 relative overflow-hidden"
		>
			<!-- Stats background effects -->
			<div class="absolute inset-0 overflow-hidden rounded-3xl">
				<div class="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl"></div>
				<div class="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>
			</div>
			<!-- Gradient border -->
			<div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500/50 via-cyan-500/50 to-teal-500/50 p-[1px]">
				<div class="absolute inset-[1px] rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
			</div>

			{#each stats as stat, i}
				<div class="stat-item text-center relative z-10">
					<div class="stat-value text-4xl font-bold md:text-5xl bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
						{stat.value}
					</div>
					<div class="mt-2 text-sm text-gray-400">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Section Header -->
		<div bind:this={headerSection} class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4 border-teal-500/30 text-teal-600 dark:text-teal-400">Testimonials</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
				Trusted by Industry Leaders
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				See what our clients say about working with Neuroteq on their AI initiatives.
			</p>
		</div>

		<!-- Testimonials Grid -->
		<div bind:this={testimonialsGrid} class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" style="perspective: 1000px;">
			{#each testimonials as testimonial}
				<Card.Root class="testimonial-card relative bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 group">
					<!-- Hover gradient -->
					<div class="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>

					<Card.Header class="relative">
						<Quote class="h-8 w-8 text-teal-500/30 group-hover:text-teal-500/50 transition-colors" />
					</Card.Header>
					<Card.Content class="relative">
						<p class="text-muted-foreground italic">"{testimonial.quote}"</p>
					</Card.Content>
					<Card.Footer class="relative flex items-center gap-4">
						<Avatar.Root class="ring-2 ring-teal-500/20 group-hover:ring-teal-500/40 transition-all">
							<Avatar.Fallback class="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 text-teal-600 dark:text-teal-400">
								{testimonial.author.split(' ').map(n => n[0]).join('')}
							</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<div class="font-semibold group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{testimonial.author}</div>
							<div class="text-sm text-muted-foreground">
								{testimonial.role}, {testimonial.company}
							</div>
						</div>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
