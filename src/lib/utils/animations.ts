import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

// Animation presets
export const animationPresets = {
	fadeInUp: {
		from: { opacity: 0, y: 60 },
		to: { opacity: 1, y: 0 }
	},
	fadeInDown: {
		from: { opacity: 0, y: -60 },
		to: { opacity: 1, y: 0 }
	},
	fadeInLeft: {
		from: { opacity: 0, x: -60 },
		to: { opacity: 1, x: 0 }
	},
	fadeInRight: {
		from: { opacity: 0, x: 60 },
		to: { opacity: 1, x: 0 }
	},
	fadeIn: {
		from: { opacity: 0 },
		to: { opacity: 1 }
	},
	scaleIn: {
		from: { opacity: 0, scale: 0.8 },
		to: { opacity: 1, scale: 1 }
	},
	rotateIn: {
		from: { opacity: 0, rotation: -10, y: 30 },
		to: { opacity: 1, rotation: 0, y: 0 }
	}
} as const;

export type AnimationPreset = keyof typeof animationPresets;

// Create scroll-triggered animation
export function createScrollAnimation(
	element: HTMLElement,
	preset: AnimationPreset = 'fadeInUp',
	options: {
		duration?: number;
		delay?: number;
		ease?: string;
		start?: string;
		end?: string;
		scrub?: boolean | number;
		markers?: boolean;
		stagger?: number;
		once?: boolean;
	} = {}
) {
	const {
		duration = 1,
		delay = 0,
		ease = 'power3.out',
		start = 'top 85%',
		end = 'bottom 20%',
		scrub = false,
		markers = false,
		stagger = 0,
		once = true
	} = options;

	const animation = animationPresets[preset];

	gsap.set(element, animation.from);

	return gsap.to(element, {
		...animation.to,
		duration,
		delay,
		ease,
		stagger,
		scrollTrigger: {
			trigger: element,
			start,
			end,
			scrub,
			markers,
			once,
			toggleActions: once ? 'play none none none' : 'play reverse play reverse'
		}
	});
}

// Create staggered animation for multiple elements
export function createStaggeredAnimation(
	container: HTMLElement,
	childSelector: string,
	preset: AnimationPreset = 'fadeInUp',
	options: {
		duration?: number;
		stagger?: number;
		ease?: string;
		start?: string;
	} = {}
) {
	const { duration = 0.8, stagger = 0.1, ease = 'power3.out', start = 'top 85%' } = options;

	const children = container.querySelectorAll(childSelector);
	const animation = animationPresets[preset];

	gsap.set(children, animation.from);

	return gsap.to(children, {
		...animation.to,
		duration,
		stagger,
		ease,
		scrollTrigger: {
			trigger: container,
			start,
			once: true
		}
	});
}

// Parallax effect
export function createParallax(
	element: HTMLElement,
	options: {
		speed?: number;
		direction?: 'up' | 'down';
	} = {}
) {
	const { speed = 0.5, direction = 'up' } = options;
	const yMove = direction === 'up' ? -100 * speed : 100 * speed;

	return gsap.to(element, {
		y: yMove,
		ease: 'none',
		scrollTrigger: {
			trigger: element,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true
		}
	});
}

// Text reveal animation
export function createTextReveal(
	element: HTMLElement,
	options: {
		duration?: number;
		stagger?: number;
		ease?: string;
	} = {}
) {
	const { duration = 0.8, stagger = 0.02, ease = 'power3.out' } = options;

	// Split text into characters
	const text = element.textContent || '';
	element.innerHTML = text
		.split('')
		.map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
		.join('');

	const chars = element.querySelectorAll('.char');

	gsap.set(chars, { opacity: 0, y: 20 });

	return gsap.to(chars, {
		opacity: 1,
		y: 0,
		duration,
		stagger,
		ease,
		scrollTrigger: {
			trigger: element,
			start: 'top 85%',
			once: true
		}
	});
}

// Counter animation
export function createCounter(
	element: HTMLElement,
	endValue: number,
	options: {
		duration?: number;
		ease?: string;
		prefix?: string;
		suffix?: string;
	} = {}
) {
	const { duration = 2, ease = 'power2.out', prefix = '', suffix = '' } = options;

	const counter = { value: 0 };

	return gsap.to(counter, {
		value: endValue,
		duration,
		ease,
		scrollTrigger: {
			trigger: element,
			start: 'top 85%',
			once: true
		},
		onUpdate: () => {
			element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
		}
	});
}

// Horizontal scroll section
export function createHorizontalScroll(
	container: HTMLElement,
	sections: HTMLElement,
	options: {
		ease?: string;
		pin?: boolean;
	} = {}
) {
	const { ease = 'none', pin = true } = options;

	const scrollWidth = sections.scrollWidth - window.innerWidth;

	return gsap.to(sections, {
		x: -scrollWidth,
		ease,
		scrollTrigger: {
			trigger: container,
			start: 'top top',
			end: `+=${scrollWidth}`,
			scrub: 1,
			pin,
			anticipatePin: 1
		}
	});
}

// Magnetic effect for buttons/links
export function createMagneticEffect(element: HTMLElement, strength: number = 0.3) {
	const handleMouseMove = (e: MouseEvent) => {
		const rect = element.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;

		gsap.to(element, {
			x: deltaX,
			y: deltaY,
			duration: 0.3,
			ease: 'power2.out'
		});
	};

	const handleMouseLeave = () => {
		gsap.to(element, {
			x: 0,
			y: 0,
			duration: 0.5,
			ease: 'elastic.out(1, 0.3)'
		});
	};

	element.addEventListener('mousemove', handleMouseMove);
	element.addEventListener('mouseleave', handleMouseLeave);

	return () => {
		element.removeEventListener('mousemove', handleMouseMove);
		element.removeEventListener('mouseleave', handleMouseLeave);
	};
}

// Export GSAP and ScrollTrigger for direct use
export { gsap, ScrollTrigger };
