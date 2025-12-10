<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	// Amber Color Palette for Light Theme
	const AMBER_BRIGHT = '#fbbf24';
	const AMBER_PRIMARY = '#f59e0b';
	const AMBER_DARK = '#d97706';
	// Very subtle traces for clean white background
	const TRACE_COLOR = '#e7e5e4';
	const TRACE_HIGHLIGHT = '#d6d3d1';

	// Configuration - larger board to fill screen
	const BOARD_WIDTH = 100;
	const BOARD_HEIGHT = 80;

	// Circuit trace definition
	interface CircuitTrace {
		points: THREE.Vector3[];
		width: number;
	}

	interface LightPulse {
		traceIndex: number;
		progress: number;
		speed: number;
		tailLength: number; // Length of the light trail
		color: THREE.Color;
		intensity: number;
	}

	// Generate structured circuit traces (PCB-style)
	function generateCircuitTraces(): CircuitTrace[] {
		const traces: CircuitTrace[] = [];
		const halfW = BOARD_WIDTH / 2;
		const halfH = BOARD_HEIGHT / 2;

		// Main horizontal bus lines
		for (let i = 0; i < 12; i++) {
			const y = -halfH + (i + 1) * (BOARD_HEIGHT / 13);
			const startX = -halfW + Math.random() * 5;
			const endX = halfW - Math.random() * 5;
			traces.push({
				points: [
					new THREE.Vector3(startX, 0, y),
					new THREE.Vector3(endX, 0, y)
				],
				width: 0.08 + Math.random() * 0.04
			});
		}

		// Main vertical bus lines
		for (let i = 0; i < 18; i++) {
			const x = -halfW + (i + 1) * (BOARD_WIDTH / 19);
			const startY = -halfH + Math.random() * 3;
			const endY = halfH - Math.random() * 3;
			traces.push({
				points: [
					new THREE.Vector3(x, 0, startY),
					new THREE.Vector3(x, 0, endY)
				],
				width: 0.08 + Math.random() * 0.04
			});
		}

		// Complex traces with 90-degree bends (signal traces)
		for (let i = 0; i < 40; i++) {
			const points: THREE.Vector3[] = [];
			let x = (Math.random() - 0.5) * BOARD_WIDTH * 0.9;
			let z = (Math.random() - 0.5) * BOARD_HEIGHT * 0.9;
			points.push(new THREE.Vector3(x, 0, z));

			const segments = 3 + Math.floor(Math.random() * 5);
			let horizontal = Math.random() > 0.5;

			for (let j = 0; j < segments; j++) {
				const length = 4 + Math.random() * 12;
				if (horizontal) {
					x += (Math.random() > 0.5 ? 1 : -1) * length;
					x = Math.max(-halfW + 2, Math.min(halfW - 2, x));
				} else {
					z += (Math.random() > 0.5 ? 1 : -1) * length;
					z = Math.max(-halfH + 2, Math.min(halfH - 2, z));
				}
				points.push(new THREE.Vector3(x, 0, z));
				horizontal = !horizontal;
			}

			traces.push({
				points,
				width: 0.05 + Math.random() * 0.03
			});
		}

		return traces;
	}

	// Generate component pads (connection points)
	interface ComponentPad {
		position: THREE.Vector3;
		size: number;
		isActive: boolean;
	}

	function generatePads(traces: CircuitTrace[]): ComponentPad[] {
		const pads: ComponentPad[] = [];
		const usedPositions = new Set<string>();

		// Add pads at trace endpoints and corners
		traces.forEach((trace) => {
			trace.points.forEach((point) => {
				const key = `${Math.round(point.x * 2)},${Math.round(point.z * 2)}`;
				if (!usedPositions.has(key) && Math.random() > 0.7) {
					usedPositions.add(key);
					pads.push({
						position: point.clone(),
						size: 0.2 + Math.random() * 0.15,
						isActive: Math.random() > 0.6
					});
				}
			});
		});

		return pads.slice(0, 60);
	}

	// Generate light pulses that travel along traces - like electrical signals
	function generateLightPulses(traceCount: number): LightPulse[] {
		const pulses: LightPulse[] = [];
		for (let i = 0; i < 45; i++) {
			const colorChoice = Math.random();
			pulses.push({
				traceIndex: Math.floor(Math.random() * traceCount),
				progress: Math.random(),
				// Previous speed (slower): 0.05 + Math.random() * 0.12
				speed: 0.25 + Math.random() * 0.35, // Fast light-like movement
				tailLength: 0.15 + Math.random() * 0.2, // Longer light trail for visibility
				color: new THREE.Color(
					colorChoice > 0.5 ? AMBER_BRIGHT : AMBER_PRIMARY
				),
				intensity: 0.9 + Math.random() * 0.1 // Higher intensity for light theme
			});
		}
		return pulses;
	}

	const traces = generateCircuitTraces();
	const pads = generatePads(traces);
	let pulses = $state(generateLightPulses(traces.length));

	// Create geometry for a single trace
	function createTraceGeometry(trace: CircuitTrace): THREE.BufferGeometry {
		const allPositions: number[] = [];

		for (let i = 0; i < trace.points.length - 1; i++) {
			const start = trace.points[i];
			const end = trace.points[i + 1];
			allPositions.push(start.x, start.y, start.z);
			allPositions.push(end.x, end.y, end.z);
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3));
		return geometry;
	}

	// Get total length of a trace
	function getTraceLength(trace: CircuitTrace): number {
		let length = 0;
		for (let i = 1; i < trace.points.length; i++) {
			length += trace.points[i].distanceTo(trace.points[i - 1]);
		}
		return length;
	}

	// Get position along trace at given progress (0-1)
	function getPositionOnTrace(trace: CircuitTrace, progress: number): THREE.Vector3 {
		const totalLength = getTraceLength(trace);
		let targetDist = progress * totalLength;
		let currentDist = 0;

		for (let i = 1; i < trace.points.length; i++) {
			const segmentLength = trace.points[i].distanceTo(trace.points[i - 1]);
			if (currentDist + segmentLength >= targetDist) {
				const t = (targetDist - currentDist) / segmentLength;
				return new THREE.Vector3().lerpVectors(trace.points[i - 1], trace.points[i], t);
			}
			currentDist += segmentLength;
		}

		return trace.points[trace.points.length - 1].clone();
	}

	// Get all points along the trace between two progress values (following the path)
	function getTrailPoints(trace: CircuitTrace, tailProgress: number, headProgress: number): THREE.Vector3[] {
		const totalLength = getTraceLength(trace);
		const tailDist = tailProgress * totalLength;
		const headDist = headProgress * totalLength;
		
		const points: THREE.Vector3[] = [];
		let currentDist = 0;
		
		// Add the tail point (starting point of the light)
		points.push(getPositionOnTrace(trace, tailProgress));
		
		// Add all corner points between tail and head
		for (let i = 1; i < trace.points.length; i++) {
			const prevDist = currentDist;
			const segmentLength = trace.points[i].distanceTo(trace.points[i - 1]);
			currentDist += segmentLength;
			
			// If this corner point is between tail and head, include it
			if (currentDist > tailDist && prevDist < headDist) {
				// Only add the corner point if it's within our range
				if (currentDist <= headDist && currentDist >= tailDist) {
					points.push(trace.points[i].clone());
				}
			}
		}
		
		// Add the head point (end point of the light)
		points.push(getPositionOnTrace(trace, headProgress));
		
		return points;
	}

	// Animation state
	let boardGroup: THREE.Group | undefined = $state();
	let time = 0;
	let mouseX = 0;
	let mouseY = 0;
	let lightTrailRefs: (THREE.Line | undefined)[] = $state(new Array(45).fill(undefined));
	let padRefs: (THREE.Mesh | undefined)[] = $state(new Array(pads.length).fill(undefined));

	// Track mouse for subtle parallax
	function handleMouseMove(event: MouseEvent) {
		mouseX = (event.clientX / window.innerWidth) * 2 - 1;
		mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	let prefersReducedMotion = $state(false);

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!prefersReducedMotion) {
			window.addEventListener('mousemove', handleMouseMove);
			return () => window.removeEventListener('mousemove', handleMouseMove);
		}
	});

	// Animation loop
	useTask((delta) => {
		if (!boardGroup || prefersReducedMotion) return;
		time += delta;

		// Very subtle parallax - board is mostly flat with slight tilt
		boardGroup.rotation.x = mouseY * 0.02;
		boardGroup.rotation.y = mouseX * 0.02;

		// Animate light pulses along traces (update in place to avoid GC)
		for (let i = 0; i < pulses.length; i++) {
			const pulse = pulses[i];
			pulse.progress = (pulse.progress + delta * pulse.speed) % 1;

			if (lightTrailRefs[i] && traces[pulse.traceIndex]) {
				const tailProgress = Math.max(0, pulse.progress - pulse.tailLength);
				const trailPoints = getTrailPoints(traces[pulse.traceIndex], tailProgress, pulse.progress);
				
				// Update pre-allocated buffer instead of creating new one
				const buffer = lightTrailBuffers[i];
				const pointCount = Math.min(trailPoints.length, MAX_TRAIL_POINTS);
				
				for (let j = 0; j < pointCount; j++) {
					buffer[j * 3] = trailPoints[j].x;
					buffer[j * 3 + 1] = 0.03;
					buffer[j * 3 + 2] = trailPoints[j].z;
				}
				
				// Update geometry draw range and mark for update
				const geometry = lightTrailRefs[i]!.geometry;
				geometry.setDrawRange(0, pointCount);
				geometry.attributes.position.needsUpdate = true;

				// Subtle brightness variation
				const brightness = pulse.intensity * (0.9 + Math.sin(time * 2 + i) * 0.1);
				(lightTrailRefs[i]!.material as THREE.LineBasicMaterial).opacity = brightness;
			}
		}

		// Animate active pads with subtle glow
		padRefs.forEach((ref, i) => {
			if (ref && pads[i].isActive) {
				const glow = 0.6 + Math.sin(time * 2 + i * 0.3) * 0.25;
				(ref.material as THREE.MeshBasicMaterial).opacity = glow;
			}
		});
	});

	// Materials - subtle and elegant for white theme
	const traceMaterial = new THREE.LineBasicMaterial({
		color: TRACE_HIGHLIGHT,
		transparent: true,
		opacity: 0.5
	});

	const traceGeometries = traces.map(createTraceGeometry);

	// Pre-allocate buffers for light trails to avoid GC during animation
	// Max 10 points per trail (should be enough for most trace segments)
	const MAX_TRAIL_POINTS = 10;
	const lightTrailBuffers: Float32Array[] = [];
	
	function createLightTrailGeometry(index: number): THREE.BufferGeometry {
		const geometry = new THREE.BufferGeometry();
		// Pre-allocate buffer with max size
		const positions = new Float32Array(MAX_TRAIL_POINTS * 3);
		lightTrailBuffers[index] = positions;
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setDrawRange(0, 0); // Start with nothing visible
		return geometry;
	}
</script>

<!-- Transparent background - inherits from page -->

<!-- Camera - nearly top-down view filling the entire screen -->
<T.PerspectiveCamera 
	makeDefault 
	position={[0, 45, 0]} 
	fov={75}
	rotation.x={-Math.PI / 2}
/>

<!-- Lighting - adjusted for light theme -->
<T.AmbientLight intensity={0.5} color="#ffffff" />
<T.DirectionalLight position={[20, 40, 15]} intensity={0.6} color={AMBER_PRIMARY} />
<T.DirectionalLight position={[-20, 35, -15]} intensity={0.3} color={AMBER_DARK} />
<T.PointLight position={[0, 20, 0]} intensity={0.4} color={AMBER_BRIGHT} distance={80} />

<!-- Circuit Board Group - flat, viewed from above -->
<T.Group bind:ref={boardGroup}>
	<!-- Board base (very subtle, nearly transparent) -->
	<T.Mesh position={[0, -0.1, 0]} rotation.x={-Math.PI / 2}>
		<T.PlaneGeometry args={[BOARD_WIDTH + 10, BOARD_HEIGHT + 10]} />
		<T.MeshBasicMaterial
			color="#ffffff"
			transparent
			opacity={0.3}
		/>
	</T.Mesh>

	<!-- Circuit traces -->
	{#each traces as trace, i}
		<T.LineSegments geometry={traceGeometries[i]} material={traceMaterial} />
	{/each}

	<!-- Component pads -->
	{#each pads as pad, i}
		<T.Mesh
			bind:ref={padRefs[i]}
			position={[pad.position.x, 0.01, pad.position.z]}
			rotation.x={-Math.PI / 2}
		>
			<T.CircleGeometry args={[pad.size, 16]} />
			<T.MeshBasicMaterial
				color={pad.isActive ? AMBER_PRIMARY : TRACE_COLOR}
				transparent
				opacity={pad.isActive ? 0.8 : 0.4}
			/>
		</T.Mesh>
		<!-- Pad ring -->
		{#if pad.isActive}
			<T.Mesh
				position={[pad.position.x, 0.005, pad.position.z]}
				rotation.x={-Math.PI / 2}
			>
				<T.RingGeometry args={[pad.size, pad.size + 0.08, 16]} />
				<T.MeshBasicMaterial
					color={AMBER_DARK}
					transparent
					opacity={0.4}
				/>
			</T.Mesh>
		{/if}
	{/each}

	<!-- Light pulses traveling along traces -->
	{#each pulses as pulse, i}
		<T.Line
			bind:ref={lightTrailRefs[i]}
			geometry={createLightTrailGeometry(i)}
		>
			<T.LineBasicMaterial
				color={pulse.color}
				transparent
				opacity={pulse.intensity * 1.1}
				linewidth={3}
			/>
		</T.Line>
	{/each}
</T.Group>

<!-- Fog for depth fade - pure white -->
<T.Fog attach="fog" args={['#ffffff', 30, 75]} />
