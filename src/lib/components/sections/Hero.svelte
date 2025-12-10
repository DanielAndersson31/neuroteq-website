<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Sparkles } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger } from '$lib/utils/animations';
	import CircuitBoardScene from '$lib/components/3d/CircuitBoardScene.svelte';

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

<section bind:this={heroSection} class="hero-section">
	<!-- 3D Circuit Board Background -->
	<div class="hero-3d-background">
		{#if mounted}
			<CircuitBoardScene />
		{/if}
	</div>

	<!-- Gradient Overlays - Very subtle, just for text readability -->
	<div class="hero-overlays">
		<div class="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60"></div>
		<div class="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background/70 to-transparent"></div>
	</div>
	
	<!-- Smooth transition to next section -->
	<div class="hero-transition"></div>

	<!-- Content -->
	<div class="hero-content-wrapper container-wide section-padding">
		<div class="hero-content mx-auto max-w-4xl text-center pt-20">
			<!-- Badge - Professional styling -->
			<div bind:this={badgeEl} class="mb-6 inline-flex items-center gap-2 opacity-0">
				<Badge variant="outline" class="px-4 py-1.5 text-sm border-primary/40 text-primary backdrop-blur-sm">
					<Sparkles class="mr-2 h-4 w-4" />
					Innovations Within AI
				</Badge>
			</div>

			<!-- Headline - Dark text with amber accent -->
			<h1 bind:this={headlineEl} class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground opacity-0">
				Transform Your Business with
				<span class="block mt-2 text-gradient">
					Intelligent AI Solutions
				</span>
			</h1>

			<!-- Subheadline -->
			<p bind:this={subheadlineEl} class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl opacity-0">
				We design, build, and integrate custom AI systems that drive real business results.
				From concept to deployment, Neuroteq is your partner in AI innovation.
			</p>

			<!-- CTA Buttons - Professional -->
			<div bind:this={ctaEl} class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0">
				<Button href="/contact" size="lg" class="btn-primary px-8">
					Start Your AI Journey
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
				<Button href="/services" variant="outline" size="lg" class="btn-outline px-8 backdrop-blur-sm">
					Explore Services
				</Button>
			</div>

			<!-- Trust Indicators - Amber accents -->
			<div bind:this={trustEl} class="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground opacity-0">
				<div class="flex items-center gap-2 group">
					<div class="h-2 w-2 rounded-full bg-primary pulse-subtle"></div>
					<span class="group-hover:text-primary transition-colors">50+ Projects Delivered</span>
				</div>
				<div class="flex items-center gap-2 group">
					<div class="h-2 w-2 rounded-full bg-blue-500 pulse-subtle"></div>
					<span class="group-hover:text-blue-500 transition-colors">98% Client Satisfaction</span>
				</div>
				<div class="flex items-center gap-2 group">
					<div class="h-2 w-2 rounded-full bg-green-500 pulse-subtle"></div>
					<span class="group-hover:text-green-500 transition-colors">Enterprise-Ready Solutions</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator - Clean styling -->
	<div class="scroll-indicator">
		<div class="flex flex-col items-center gap-2 text-muted-foreground">
			<span class="text-xs uppercase tracking-widest text-primary/60">Scroll</span>
			<div class="w-6 h-10 rounded-sm border border-border p-1">
				<div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce mx-auto"></div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		isolation: isolate; /* Creates a new stacking context */
	}

	.hero-3d-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.hero-overlays {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		pointer-events: none;
	}

	.hero-content-wrapper {
		position: relative;
		z-index: 2;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.hero-transition {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 280px;
		z-index: 5;
		pointer-events: none;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 20%,
			rgba(255, 255, 255, 0.3) 40%,
			rgba(255, 255, 255, 0.6) 60%,
			rgba(255, 255, 255, 0.85) 80%,
			#ffffff 100%
		);
	}
</style>
