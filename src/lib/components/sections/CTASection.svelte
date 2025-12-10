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

<section class="section-padding relative overflow-hidden bg-background">
	<!-- Background ambient effect - Professional -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl"></div>
	</div>

	<div class="container-wide relative">
		<div
			bind:this={ctaContainer}
			class="relative overflow-hidden rounded-lg bg-bg-surface px-8 py-16 text-center md:px-16 md:py-24 border border-border"
		>
			<!-- Subtle circuit pattern overlay -->
			<div class="absolute inset-0 circuit-pattern opacity-20"></div>

			<!-- Subtle ambient accents -->
			<div class="absolute inset-0 overflow-hidden rounded-lg">
				<div class="absolute -top-20 -right-20 h-40 w-40 bg-primary/5 blur-3xl"></div>
				<div class="absolute -bottom-20 -left-20 h-40 w-40 bg-accent/5 blur-3xl"></div>
			</div>

			<div bind:this={contentEl} class="relative mx-auto max-w-3xl">
				<h2 class="cta-animate text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
					{title}
				</h2>
				<p class="cta-animate mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
					{description}
				</p>
				<div class="cta-animate mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button
						href={primaryCta.href}
						size="lg"
						class="btn-primary px-8"
					>
						<MessageSquare class="mr-2 h-5 w-5" />
						{primaryCta.text}
					</Button>
					{#if secondaryCta}
						<Button
							href={secondaryCta.href}
							variant="outline"
							size="lg"
							class="btn-outline px-8 backdrop-blur-sm"
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
