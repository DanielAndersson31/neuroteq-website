<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Sparkles } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<section class="relative overflow-hidden">
	<!-- Background Gradient -->
	<div class="absolute inset-0 -z-10">
		<div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-accent-50 opacity-50"></div>
		<div class="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary-200/30 blur-3xl"></div>
		<div class="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent-200/30 blur-3xl"></div>
	</div>

	<div class="container-wide section-padding">
		<div class="mx-auto max-w-4xl text-center">
			<!-- Badge -->
			<div
				class="mb-6 inline-flex items-center gap-2 {mounted ? 'animate-fade-in-up' : 'opacity-0'}"
				style="animation-delay: 0.1s"
			>
				<Badge variant="secondary" class="px-4 py-1.5 text-sm">
					<Sparkles class="mr-2 h-4 w-4" />
					Innovations Within AI
				</Badge>
			</div>

			<!-- Headline -->
			<h1
				class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl {mounted ? 'animate-fade-in-up' : 'opacity-0'}"
				style="animation-delay: 0.2s"
			>
				Transform Your Business with
				<span class="text-gradient"> Intelligent AI Solutions</span>
			</h1>

			<!-- Subheadline -->
			<p
				class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl {mounted ? 'animate-fade-in-up' : 'opacity-0'}"
				style="animation-delay: 0.3s"
			>
				We design, build, and integrate custom AI systems that drive real business results.
				From concept to deployment, Neuroteq is your partner in AI innovation.
			</p>

			<!-- CTA Buttons -->
			<div
				class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row {mounted ? 'animate-fade-in-up' : 'opacity-0'}"
				style="animation-delay: 0.4s"
			>
				<Button href="/contact" size="lg" class="gradient-primary text-white px-8">
					Start Your AI Journey
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
				<Button href="/services" variant="outline" size="lg" class="px-8">
					Explore Services
				</Button>
			</div>

			<!-- Trust Indicators -->
			<div
				class="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground {mounted ? 'animate-fade-in-up' : 'opacity-0'}"
				style="animation-delay: 0.5s"
			>
				<div class="flex items-center gap-2">
					<div class="h-2 w-2 rounded-full bg-green-500"></div>
					<span>50+ Projects Delivered</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-2 w-2 rounded-full bg-green-500"></div>
					<span>98% Client Satisfaction</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-2 w-2 rounded-full bg-green-500"></div>
					<span>Enterprise-Ready Solutions</span>
				</div>
			</div>
		</div>
	</div>
</section>
