import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas/contact';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(contactSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(contactSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Validate privacy acceptance
		if (!form.data.privacy) {
			return message(form, 'You must accept the privacy policy', { status: 400 });
		}

		try {
			// In production, you would send an email here
			// For now, just log the submission
			console.log('Contact form submission:', form.data);

			// Simulate processing delay
			await new Promise(resolve => setTimeout(resolve, 500));

			return message(form, 'Thank you for your message! We will get back to you within 24 hours.');

		} catch (error) {
			console.error('Contact form error:', error);
			return message(form, 'Something went wrong. Please try again later.', { status: 500 });
		}
	}
};
