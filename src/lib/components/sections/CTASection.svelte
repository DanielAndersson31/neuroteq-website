<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, MessageSquare } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger } from '$lib/utils/animations';

	interface Props {
		title?: string;
		description?: string;
		primaryCta?: { text: string; href: string };
		secondaryCta?: { text: string; href: string } | null;
	}

	let {
		title = "Ready to Transform Your Business with AI?",
		description = "Let's discuss how Neuroteq can help you leverage artificial intelligence to achieve your business goals.",
		primaryCta = { text: "Schedule a Consultation", href: "/contact" },
		secondaryCta = { text: "View Our Work", href: "/case-studies" }
	}: Props = $props();

	let ctaContainer: HTMLElement;
	let contentEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Animate the CTA card scaling in
		gsap.fromTo(
			ctaContainer,
			{ opacity: 0, scale: 0.95, y: 40 },
			{
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: ctaContainer,
					start: 'top 85%',
					once: true
				}
			}
		);

		// Animate content elements
		const elements = contentEl.querySelectorAll('.cta-animate');
		gsap.fromTo(
			elements,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: ctaContainer,
					start: 'top 75%',
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
	<!-- Background ambient effect -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl"></div>
	</div>

	<div class="container-wide relative">
		<div
			bind:this={ctaContainer}
			class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-16 text-center md:px-16 md:py-24"
		>
			<!-- Animated gradient border -->
			<div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 p-[1px]">
				<div class="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
			</div>

			<!-- Floating orbs -->
			<div class="absolute inset-0 overflow-hidden rounded-3xl">
				<div class="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl animate-pulse"></div>
				<div class="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-teal-400/10 blur-2xl"></div>
			</div>

			<!-- Grid pattern overlay -->
			<div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>

			<div bind:this={contentEl} class="relative mx-auto max-w-3xl">
				<h2 class="cta-animate text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
					{title}
				</h2>
				<p class="cta-animate mx-auto mt-6 max-w-2xl text-lg text-gray-300">
					{description}
				</p>
				<div class="cta-animate mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button
						href={primaryCta.href}
						size="lg"
						class="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-105"
					>
						<MessageSquare class="mr-2 h-5 w-5" />
						{primaryCta.text}
					</Button>
					{#if secondaryCta}
						<Button
							href={secondaryCta.href}
							variant="outline"
							size="lg"
							class="border-gray-600 text-gray-200 hover:bg-gray-700/50 hover:text-white px-8 backdrop-blur-sm"
						>
							{secondaryCta.text}
							<ArrowRight class="ml-2 h-5 w-5" />
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
