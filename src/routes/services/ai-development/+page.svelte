<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { ServiceDetail, CTASection } from '$lib/components/sections';
	import { services } from '$lib/config/services';

	const service = services.find(s => s.id === 'ai-development')!;
</script>

<SEOHead
	title={service.title}
	description={service.longDescription}
	keywords={['custom AI development', 'machine learning', 'deep learning', 'neural networks', 'AI solutions']}
/>

<ServiceDetail {service} />

<CTASection
	title="Ready to Build Your Custom AI Solution?"
	description="Let's discuss your project requirements and create an AI solution tailored to your business needs."
/>
