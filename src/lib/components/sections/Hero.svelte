<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Sparkles } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger } from '$lib/utils/animations';
	import NeuralNetworkScene from '$lib/components/3d/NeuralNetworkScene.svelte';

	let heroSection: HTMLElement;
	let badgeEl: HTMLElement;
	let headlineEl: HTMLElement;
	let subheadlineEl: HTMLElement;
	let ctaEl: HTMLElement;
	let trustEl: HTMLElement;
	let mounted = $state(false);

	onMount(() => {
		mounted = true;

		// Register ScrollTrigger
		gsap.registerPlugin(ScrollTrigger);

		// Create entrance timeline
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		tl.fromTo(badgeEl, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 })
			.fromTo(
				headlineEl,
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 1 },
				'-=0.5'
			)
			.fromTo(
				subheadlineEl,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8 },
				'-=0.6'
			)
			.fromTo(
				ctaEl,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8 },
				'-=0.5'
			)
			.fromTo(
				trustEl,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.6 },
				'-=0.4'
			);

		// Parallax scroll effect for the hero content
		gsap.to('.hero-content', {
			y: 100,
			opacity: 0.3,
			ease: 'none',
			scrollTrigger: {
				trigger: heroSection,
				start: 'top top',
				end: 'bottom top',
				scrub: 1
			}
		});

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section bind:this={heroSection} class="relative min-h-screen overflow-hidden bg-gray-950">
	<!-- 3D Neural Network Background - Full viewport width -->
	<div class="absolute inset-0 z-0 overflow-visible">
		{#if mounted}
			<NeuralNetworkScene />
		{/if}
	</div>

	<!-- Gradient Overlays -->
	<div class="absolute inset-0 z-[1] pointer-events-none">
		<div class="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-transparent to-gray-950/90"></div>
		<div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-950 to-transparent"></div>
		<div class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-950 to-transparent"></div>
	</div>

	<!-- Content -->
	<div class="container-wide section-padding relative z-10">
		<div class="hero-content mx-auto max-w-4xl text-center pt-20">
			<!-- Badge -->
			<div bind:this={badgeEl} class="mb-6 inline-flex items-center gap-2 opacity-0">
				<Badge variant="secondary" class="px-4 py-1.5 text-sm bg-teal-500/20 text-teal-300 border-teal-500/30 backdrop-blur-sm">
					<Sparkles class="mr-2 h-4 w-4" />
					Innovations Within AI
				</Badge>
			</div>

			<!-- Headline -->
			<h1 bind:this={headlineEl} class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white opacity-0">
				Transform Your Business with
				<span class="block mt-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
					Intelligent AI Solutions
				</span>
			</h1>

			<!-- Subheadline -->
			<p bind:this={subheadlineEl} class="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl opacity-0">
				We design, build, and integrate custom AI systems that drive real business results.
				From concept to deployment, Neuroteq is your partner in AI innovation.
			</p>

			<!-- CTA Buttons -->
			<div bind:this={ctaEl} class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0">
				<Button href="/contact" size="lg" class="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-105">
					Start Your AI Journey
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
				<Button href="/services" variant="outline" size="lg" class="px-8 border-gray-600 text-gray-200 hover:bg-gray-800/50 hover:text-white backdrop-blur-sm">
					Explore Services
				</Button>
			</div>

			<!-- Trust Indicators -->
			<div bind:this={trustEl} class="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400 opacity-0">
				<div class="flex items-center gap-2 group">
					<div class="h-2 w-2 rounded-full bg-teal-400 group-hover:animate-pulse"></div>
					<span class="group-hover:text-teal-300 transition-colors">50+ Projects Delivered</span>
				</div>
				<div class="flex items-center gap-2 group">
					<div class="h-2 w-2 rounded-full bg-teal-400 group-hover:animate-pulse"></div>
					<span class="group-hover:text-teal-300 transition-colors">98% Client Satisfaction</span>
				</div>
				<div class="flex items-center gap-2 group">
					<div class="h-2 w-2 rounded-full bg-teal-400 group-hover:animate-pulse"></div>
					<span class="group-hover:text-teal-300 transition-colors">Enterprise-Ready Solutions</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
		<div class="flex flex-col items-center gap-2 text-gray-500">
			<span class="text-xs uppercase tracking-widest">Scroll</span>
			<div class="w-6 h-10 rounded-full border-2 border-gray-600 p-1">
				<div class="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce mx-auto"></div>
			</div>
		</div>
	</div>
</section>
