<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { CTASection } from '$lib/components/sections';
	import { teamMembers } from '$lib/config/team';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Linkedin, Twitter } from 'lucide-svelte';
</script>

<SEOHead
	title="Our Team"
	description="Meet the talented team of AI experts, engineers, and strategists at Neuroteq."
	keywords={['Neuroteq team', 'AI experts', 'machine learning engineers', 'AI researchers']}
/>

<!-- Hero Section -->
<section class="section-padding bg-gradient-to-b from-muted/50 to-background">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Our Team</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				The Minds Behind
				<span class="text-gradient"> Neuroteq</span>
			</h1>
			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				Our team brings together world-class expertise in artificial intelligence, software
				engineering, and business strategy to deliver exceptional results.
			</p>
		</div>
	</div>
</section>

<!-- Team Grid -->
<section class="section-padding">
	<div class="container-wide">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each teamMembers as member}
				<Card.Root class="overflow-hidden">
					<div class="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
						<Avatar.Root class="h-32 w-32">
							<Avatar.Fallback class="text-4xl bg-primary/20 text-primary">
								{member.name.split(' ').map(n => n[0]).join('')}
							</Avatar.Fallback>
						</Avatar.Root>
					</div>
					<Card.Header>
						<Card.Title>{member.name}</Card.Title>
						<Card.Description class="text-primary font-medium">{member.role}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">{member.bio}</p>
						<div class="mt-4 flex gap-3">
							{#if member.linkedin}
								<a
									href={member.linkedin}
									class="text-muted-foreground hover:text-primary transition-colors"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="{member.name}'s LinkedIn"
								>
									<Linkedin class="h-5 w-5" />
								</a>
							{/if}
							{#if member.twitter}
								<a
									href={member.twitter}
									class="text-muted-foreground hover:text-primary transition-colors"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="{member.name}'s Twitter"
								>
									<Twitter class="h-5 w-5" />
								</a>
							{/if}
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>

<!-- Join Us Section -->
<section class="section-padding bg-muted/30">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Careers</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Join Our Team
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				We're always looking for talented individuals who are passionate about AI and innovation.
				If you want to work on cutting-edge projects with a team of experts, we'd love to hear from you.
			</p>
			<div class="mt-8">
				<a
					href="mailto:careers@neuroteq.com"
					class="inline-flex items-center text-primary hover:underline"
				>
					careers@neuroteq.com
				</a>
			</div>
		</div>
	</div>
</section>

<CTASection
	title="Want to Work With Our Team?"
	description="Let's discuss how Neuroteq can help bring your AI vision to life."
/>
