<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { OrbitControls, Float } from '@threlte/extras';
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	// Configuration
	const NODE_COUNT = 80;
	const CONNECTION_DISTANCE = 2.5;
	const SPHERE_RADIUS = 4;

	// Generate random positions on a sphere surface with some depth variance
	function generateNodes(count: number): THREE.Vector3[] {
		const nodes: THREE.Vector3[] = [];
		for (let i = 0; i < count; i++) {
			const phi = Math.acos(-1 + (2 * i) / count);
			const theta = Math.sqrt(count * Math.PI) * phi;
			const radius = SPHERE_RADIUS * (0.7 + Math.random() * 0.6);

			const x = radius * Math.cos(theta) * Math.sin(phi);
			const y = radius * Math.sin(theta) * Math.sin(phi);
			const z = radius * Math.cos(phi);

			nodes.push(new THREE.Vector3(x, y, z));
		}
		return nodes;
	}

	// Generate connections between nearby nodes
	function generateConnections(nodes: THREE.Vector3[]): [number, number][] {
		const connections: [number, number][] = [];
		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				const distance = nodes[i].distanceTo(nodes[j]);
				if (distance < CONNECTION_DISTANCE && Math.random() > 0.3) {
					connections.push([i, j]);
				}
			}
		}
		return connections;
	}

	const nodes = generateNodes(NODE_COUNT);
	const connections = generateConnections(nodes);

	// Create line geometry for connections
	function createLineGeometry(): THREE.BufferGeometry {
		const positions: number[] = [];
		connections.forEach(([i, j]) => {
			positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
			positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
		});

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		return geometry;
	}

	// Create points geometry for nodes
	function createPointsGeometry(): THREE.BufferGeometry {
		const positions: number[] = [];
		const sizes: number[] = [];

		nodes.forEach((node) => {
			positions.push(node.x, node.y, node.z);
			sizes.push(Math.random() * 0.5 + 0.3);
		});

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
		return geometry;
	}

	const lineGeometry = createLineGeometry();
	const pointsGeometry = createPointsGeometry();

	// Custom shader for glowing points
	const pointsVertexShader = `
		attribute float size;
		varying float vSize;
		void main() {
			vSize = size;
			vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
			gl_PointSize = size * (200.0 / -mvPosition.z);
			gl_Position = projectionMatrix * mvPosition;
		}
	`;

	const pointsFragmentShader = `
		uniform vec3 color;
		varying float vSize;
		void main() {
			float d = length(gl_PointCoord - vec2(0.5));
			if (d > 0.5) discard;
			float alpha = 1.0 - smoothstep(0.0, 0.5, d);
			gl_FragColor = vec4(color, alpha * 0.9);
		}
	`;

	const pointsMaterial = new THREE.ShaderMaterial({
		uniforms: {
			color: { value: new THREE.Color('#14b8a6') }
		},
		vertexShader: pointsVertexShader,
		fragmentShader: pointsFragmentShader,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});

	const lineMaterial = new THREE.LineBasicMaterial({
		color: '#0d7377',
		transparent: true,
		opacity: 0.3,
		blending: THREE.AdditiveBlending
	});

	// Animation state
	let groupRef: THREE.Group | undefined = $state();
	let time = 0;
	let mouseX = 0;
	let mouseY = 0;

	// Track mouse position
	function handleMouseMove(event: MouseEvent) {
		mouseX = (event.clientX / window.innerWidth) * 2 - 1;
		mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});

	// Animation loop
	useTask((delta) => {
		if (!groupRef) return;
		time += delta;

		// Slow rotation
		groupRef.rotation.y = time * 0.1 + mouseX * 0.3;
		groupRef.rotation.x = Math.sin(time * 0.05) * 0.1 + mouseY * 0.2;

		// Pulse effect on line opacity
		lineMaterial.opacity = 0.2 + Math.sin(time * 2) * 0.1;
	});

	// Highlight nodes - pulsing glow effect
	const glowNodes = nodes.slice(0, 8).map((node, i) => ({
		position: node,
		delay: i * 0.5,
		scale: 0.15 + Math.random() * 0.1
	}));
</script>

<!-- Camera -->
<T.PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50}>
	<OrbitControls
		enableZoom={false}
		enablePan={false}
		autoRotate
		autoRotateSpeed={0.5}
		maxPolarAngle={Math.PI / 1.5}
		minPolarAngle={Math.PI / 3}
	/>
</T.PerspectiveCamera>

<!-- Ambient light -->
<T.AmbientLight intensity={0.5} />

<!-- Directional lights -->
<T.DirectionalLight position={[10, 10, 5]} intensity={1} color="#14b8a6" />
<T.DirectionalLight position={[-10, -10, -5]} intensity={0.5} color="#0d7377" />

<!-- Main neural network group -->
<T.Group bind:ref={groupRef}>
	<!-- Connection lines -->
	<T.LineSegments geometry={lineGeometry} material={lineMaterial} />

	<!-- Node points -->
	<T.Points geometry={pointsGeometry} material={pointsMaterial} />

	<!-- Glowing highlight nodes -->
	{#each glowNodes as glow, i}
		<Float speed={2} floatIntensity={0.5} rotationIntensity={0}>
			<T.Mesh position={[glow.position.x, glow.position.y, glow.position.z]}>
				<T.SphereGeometry args={[glow.scale, 16, 16]} />
				<T.MeshStandardMaterial
					color="#14b8a6"
					emissive="#14b8a6"
					emissiveIntensity={1.5}
					transparent
					opacity={0.8}
				/>
			</T.Mesh>
		</Float>
	{/each}

	<!-- Center core -->
	<Float speed={1.5} floatIntensity={0.3}>
		<T.Mesh>
			<T.IcosahedronGeometry args={[0.8, 2]} />
			<T.MeshStandardMaterial
				color="#0d7377"
				emissive="#14b8a6"
				emissiveIntensity={0.8}
				wireframe
				transparent
				opacity={0.6}
			/>
		</T.Mesh>
	</Float>
</T.Group>

<!-- Particle fog effect -->
<T.Fog attach="fog" args={['#030712', 10, 25]} />
