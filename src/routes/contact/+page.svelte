<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { contactSchema } from '$lib/schemas/contact';
	import { toast } from 'svelte-sonner';
	import { siteConfig } from '$lib/config/site';

	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import { Loader2, Mail, Phone, Clock } from 'lucide-svelte';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(contactSchema),
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.valid) {
					toast.success(form.message as string);
				} else {
					toast.error(form.message as string);
				}
			}
		}
	});

	const { form: formData, enhance, errors, delayed } = form;

	const services = [
		{ value: 'ai-development', label: 'Custom AI Development' },
		{ value: 'consulting', label: 'AI Consulting' },
		{ value: 'integration', label: 'AI Integration' },
		{ value: 'other', label: 'Other' }
	];

	const budgets = [
		{ value: 'under-10k', label: 'Under $10,000' },
		{ value: '10k-25k', label: '$10,000 - $25,000' },
		{ value: '25k-50k', label: '$25,000 - $50,000' },
		{ value: '50k-100k', label: '$50,000 - $100,000' },
		{ value: 'over-100k', label: 'Over $100,000' },
		{ value: 'not-sure', label: 'Not sure yet' }
	];
</script>

<SEOHead
	title="Contact Us"
	description="Get in touch with Neuroteq for AI consulting and development services. Start your AI journey today."
	keywords={['contact Neuroteq', 'AI consultation', 'get in touch']}
/>

<!-- Hero Section -->
<section class="section-padding bg-gradient-to-b from-muted/50 to-background">
	<div class="container-wide">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Contact Us</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
				Let's Build Something
				<span class="text-gradient"> Amazing Together</span>
			</h1>
			<p class="mt-6 text-lg text-muted-foreground md:text-xl">
				Ready to transform your business with AI? Get in touch with our team to discuss your project.
			</p>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section class="section-padding">
	<div class="container-wide">
		<div class="grid gap-12 lg:grid-cols-3">
			<!-- Contact Info -->
			<div class="space-y-6">
				<Card.Root>
					<Card.Content class="flex items-start gap-4 pt-6">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Mail class="h-5 w-5" />
						</div>
						<div>
							<h3 class="font-semibold">Email</h3>
							<a href="mailto:{siteConfig.email}" class="text-muted-foreground hover:text-primary">
								{siteConfig.email}
							</a>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Content class="flex items-start gap-4 pt-6">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Phone class="h-5 w-5" />
						</div>
						<div>
							<h3 class="font-semibold">Phone</h3>
							<a href="tel:{siteConfig.phone}" class="text-muted-foreground hover:text-primary">
								{siteConfig.phone}
							</a>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Content class="flex items-start gap-4 pt-6">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Clock class="h-5 w-5" />
						</div>
						<div>
							<h3 class="font-semibold">Response Time</h3>
							<p class="text-muted-foreground">We typically respond within 24 hours</p>
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<!-- Contact Form -->
			<div class="lg:col-span-2">
				<Card.Root>
					<Card.Header>
						<Card.Title>Send us a message</Card.Title>
						<Card.Description>Fill out the form below and we'll get back to you soon.</Card.Description>
					</Card.Header>
					<Card.Content>
						<form method="POST" use:enhance class="space-y-6">
							<div class="grid gap-4 sm:grid-cols-2">
								<div class="space-y-2">
									<Label for="name">Name *</Label>
									<Input
										id="name"
										name="name"
										bind:value={$formData.name}
										placeholder="John Doe"
										class={$errors.name ? 'border-destructive' : ''}
									/>
									{#if $errors.name}
										<p class="text-sm text-destructive">{$errors.name}</p>
									{/if}
								</div>

								<div class="space-y-2">
									<Label for="email">Email *</Label>
									<Input
										id="email"
										name="email"
										type="email"
										bind:value={$formData.email}
										placeholder="john@company.com"
										class={$errors.email ? 'border-destructive' : ''}
									/>
									{#if $errors.email}
										<p class="text-sm text-destructive">{$errors.email}</p>
									{/if}
								</div>
							</div>

							<div class="grid gap-4 sm:grid-cols-2">
								<div class="space-y-2">
									<Label for="company">Company</Label>
									<Input
										id="company"
										name="company"
										bind:value={$formData.company}
										placeholder="Acme Inc."
									/>
								</div>

								<div class="space-y-2">
									<Label for="phone">Phone</Label>
									<Input
										id="phone"
										name="phone"
										type="tel"
										bind:value={$formData.phone}
										placeholder="+1 (555) 000-0000"
									/>
								</div>
							</div>

							<div class="grid gap-4 sm:grid-cols-2">
								<div class="space-y-2">
									<Label for="service">Service of Interest *</Label>
									<select
										id="service"
										name="service"
										bind:value={$formData.service}
										class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {$errors.service ? 'border-destructive' : ''}"
									>
										<option value="">Select a service</option>
										{#each services as service}
											<option value={service.value}>{service.label}</option>
										{/each}
									</select>
									{#if $errors.service}
										<p class="text-sm text-destructive">{$errors.service}</p>
									{/if}
								</div>

								<div class="space-y-2">
									<Label for="budget">Estimated Budget</Label>
									<select
										id="budget"
										name="budget"
										bind:value={$formData.budget}
										class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<option value="">Select budget range</option>
										{#each budgets as budget}
											<option value={budget.value}>{budget.label}</option>
										{/each}
									</select>
								</div>
							</div>

							<div class="space-y-2">
								<Label for="message">Message *</Label>
								<Textarea
									id="message"
									name="message"
									bind:value={$formData.message}
									placeholder="Tell us about your project, goals, and timeline..."
									rows={5}
									class={$errors.message ? 'border-destructive' : ''}
								/>
								{#if $errors.message}
									<p class="text-sm text-destructive">{$errors.message}</p>
								{/if}
							</div>

							<div class="flex items-start space-x-3">
								<input
									type="checkbox"
									id="privacy"
									name="privacy"
									bind:checked={$formData.privacy}
									class="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
								/>
								<div class="grid gap-1.5 leading-none">
									<Label for="privacy" class="text-sm font-normal cursor-pointer">
										I agree to the <a href="/privacy" class="underline text-primary hover:text-primary/80">Privacy Policy</a> *
									</Label>
									{#if $errors.privacy}
										<p class="text-sm text-destructive">{$errors.privacy}</p>
									{/if}
								</div>
							</div>

							<Button type="submit" class="w-full gradient-primary text-white" disabled={$delayed}>
								{#if $delayed}
									<Loader2 class="mr-2 h-4 w-4 animate-spin" />
									Sending...
								{:else}
									Send Message
								{/if}
							</Button>
						</form>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
</section>
