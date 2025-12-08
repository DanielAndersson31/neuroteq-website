<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { ServiceDetail, CTASection } from '$lib/components/sections';
	import { services } from '$lib/config/services';

	const service = services.find(s => s.id === 'consulting')!;
</script>

<SEOHead
	title={service.title}
	description={service.longDescription}
	keywords={['AI consulting', 'AI strategy', 'technology consulting', 'AI roadmap', 'digital transformation']}
/>

<ServiceDetail {service} />

<CTASection
	title="Need Expert AI Guidance?"
	description="Our consultants will help you develop a clear AI strategy aligned with your business objectives."
/>
