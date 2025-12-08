<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { ServiceDetail, CTASection } from '$lib/components/sections';
	import { services } from '$lib/config/services';

	const service = services.find(s => s.id === 'integration')!;
</script>

<SEOHead
	title={service.title}
	description={service.longDescription}
	keywords={['AI integration', 'system integration', 'API development', 'MLOps', 'AI deployment']}
/>

<ServiceDetail {service} />

<CTASection
	title="Ready to Integrate AI Into Your Systems?"
	description="Let's seamlessly embed AI capabilities into your existing infrastructure."
/>
