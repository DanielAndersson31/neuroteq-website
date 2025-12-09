import { z } from 'zod';

export const contactSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name must be less than 100 characters'),

	email: z
		.string()
		.email('Please enter a valid email address'),

	company: z.string(),

	phone: z.string(),

	service: z
		.string()
		.min(1, 'Please select a service'),

	budget: z.string(),

	message: z
		.string()
		.min(20, 'Message must be at least 20 characters')
		.max(2000, 'Message must be less than 2000 characters'),

	privacy: z.boolean()
});

export type ContactFormData = z.infer<typeof contactSchema>;
