import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Move3d, 
  ChevronDown,
  Compass,
  CheckCircle2,
  ArrowDown,
  Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Building3DModelProps {
  onOpenConsultation: () => void;
}

interface CameraKeyframe {
  camX: number;
  camY: number;
  camZ: number;
  targetY: number;
  rotY: number;
  badge: string;
  title: string;
  desc: string;
  focusPoint: string;
}

export const Building3DModel: React.FC<Building3DModelProps> = ({ onOpenConsultation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [isTourCompleted, setIsTourCompleted] = useState<boolean>(false);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const isAutoRotatingRef = useRef<boolean>(isAutoRotating);
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);
  const { t } = useLanguage();

  // 5 Choreographed Architectural Tour Phases (Adjusted for grand majestic framing)
  const rawKeyframes = [
    { camX: 25, camY: 16.5, camZ: 25, targetY: 3.2, rotY: 0.15 },
    { camX: 12, camY: 5.2, camZ: 14, targetY: 2.8, rotY: 0.95 },
    { camX: 13, camY: 14.8, camZ: 11, targetY: 7.5, rotY: 2.10 },
    { camX: 12, camY: 4.5, camZ: 16, targetY: 2.4, rotY: 3.14 },
    { camX: 21, camY: 12.0, camZ: 21, targetY: 3.5, rotY: 3.65 },
  ];

  const phases: CameraKeyframe[] = rawKeyframes.map((kf, i) => ({
    ...kf,
    badge: t.model3d.phases[i]?.badge || '',
    title: t.model3d.phases[i]?.title || '',
    desc: t.model3d.phases[i]?.desc || '',
    focusPoint: t.model3d.phases[i]?.focusPoint || '',
  }));

  // References to keep animation loop in sync with scroll
  const scrollProgressRef = useRef<number>(0);
  const targetRotationRef = useRef<number>(phases[0].rotY);
  const currentRotationRef = useRef<number>(phases[0].rotY);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(phases[0].camX, phases[0].camY, phases[0].camZ));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, phases[0].targetY, 0));

  useEffect(() => {
    if (!canvasRef.current || !canvasWrapperRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080d15); // Deep luxury graphite night sky
    scene.fog = new THREE.FogExp2(0x080d15, 0.012);

    const width = canvasWrapperRef.current.clientWidth || 1000;
    const height = canvasWrapperRef.current.clientHeight || 650;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 200);
    camera.position.set(phases[0].camX, phases[0].camY, phases[0].camZ);
    camera.lookAt(0, phases[0].targetY, 0);

    const isMobileDevice = typeof window !== 'undefined' && (
      window.innerWidth < 1024 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      ('ontouchstart' in window && window.innerWidth < 1200)
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobileDevice, // Antialias off on mobile gives massive FPS boost
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobileDevice ? 1.0 : Math.min(window.devicePixelRatio, 2.0));
    renderer.shadowMap.enabled = !isMobileDevice;
    if (!isMobileDevice) {
      renderer.shadowMap.type = THREE.PCFShadowMap;
    }

    // --- Atmospheric Luxury Lighting ---
    // Soft sky ambient light
    const ambientLight = new THREE.AmbientLight(0x94a3b8, isMobileDevice ? 1.5 : 1.2);
    scene.add(ambientLight);

    // Warm Sun Directional Light
    const sunLight = new THREE.DirectionalLight(0xfff6e8, 2.9);
    sunLight.position.set(24, 38, 22);
    if (!isMobileDevice) {
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      sunLight.shadow.camera.near = 1;
      sunLight.shadow.camera.far = 100;
      sunLight.shadow.camera.left = -26;
      sunLight.shadow.camera.right = 26;
      sunLight.shadow.camera.top = 26;
      sunLight.shadow.camera.bottom = -26;
      sunLight.shadow.bias = -0.0004;
    }
    scene.add(sunLight);

    // Natural Sky Soft Rim Light
    const skyRimLight = new THREE.DirectionalLight(0x94a3b8, 0.7);
    skyRimLight.position.set(-25, 20, -25);
    scene.add(skyRimLight);

    // Ground Warm Bounce Light
    const groundBounceLight = new THREE.DirectionalLight(0xd97706, 0.45);
    groundBounceLight.position.set(0, -10, 15);
    scene.add(groundBounceLight);

    // Entrance Warm Glow Point Light
    const entranceLight = new THREE.PointLight(0xffedd5, 3.2, 12, 1.5);
    entranceLight.position.set(0, 1.8, 4.2);
    scene.add(entranceLight);

    // Pier Warm Evening Lantern Light
    const pierLight = new THREE.PointLight(0xffedd5, 2.2, 10, 1.5);
    pierLight.position.set(0, 1.0, 7.8);
    scene.add(pierLight);

    // --- High-End Architectural Materials ---
    // 1. Premium Limestone/Travertine Facade (Warm cream texture)
    const facadeMat = new THREE.MeshStandardMaterial({
      color: 0xf3eee6,
      roughness: 0.38,
      metalness: 0.05,
    });

    // 2. Dark Slate & Bronze Facade Panels (Ground base, cornices, mullions)
    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x1c222c,
      roughness: 0.32,
      metalness: 0.4,
    });

    // 3. Thermo-Wood Architectural Accent (Entrance portal, pergolas, pier)
    const warmWoodMat = new THREE.MeshStandardMaterial({
      color: 0xb87a4a,
      roughness: 0.55,
      metalness: 0.1,
    });

    // 4. Tinted Architectural Glass (Windows & Balconies)
    const glassMat = isMobileDevice
      ? new THREE.MeshStandardMaterial({
          color: 0x6ba4c8,
          transparent: true,
          opacity: 0.72,
          roughness: 0.1,
          metalness: 0.4,
        })
      : new THREE.MeshPhysicalMaterial({
          color: 0x6ba4c8,
          transmission: 0.72,
          opacity: 0.88,
          transparent: true,
          roughness: 0.08,
          metalness: 0.35,
          ior: 1.52,
        });

    // 5. Warm Glowing Interior Rooms
    const glowingInteriorMat = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
    });

    // 6. Natural Lake Water (Vivid Mediterranean Azure Blue with Crystalline Shimmer)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.08,
      metalness: 0.25,
      transparent: true,
      opacity: 0.88,
    });
    const waterDepthMat = new THREE.MeshStandardMaterial({
      color: 0x034a75,
      roughness: 0.15,
      metalness: 0.3,
    });

    // 7. Manicured Emerald Lawn
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x1d4731,
      roughness: 0.75,
      metalness: 0.02,
    });

    // 8. Pedestrian Stone Pavers / Walkways
    const walkwayMat = new THREE.MeshStandardMaterial({
      color: 0x9ca3af,
      roughness: 0.6,
      metalness: 0.05,
    });

    // 9. Granite Curbs / Borders
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.2,
    });

    // 10. Volumetric Foliage Materials (Rich natural greenery variations)
    const foliageDeepMat = new THREE.MeshStandardMaterial({
      color: 0x1b4332,
      roughness: 0.82,
      metalness: 0.02,
      flatShading: true,
    });
    const foliageMidMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.8,
      metalness: 0.02,
      flatShading: true,
    });
    const foliageSunlitMat = new THREE.MeshStandardMaterial({
      color: 0x40916c,
      roughness: 0.78,
      metalness: 0.02,
      flatShading: true,
    });
    const foliageLimeMat = new THREE.MeshStandardMaterial({
      color: 0x52b788,
      roughness: 0.75,
      metalness: 0.02,
      flatShading: true,
    });
    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x3b2a1a,
      roughness: 0.9,
      metalness: 0.05,
    });

    // 11. Subtle Blueprint Crisp Edges
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x475569,
      linewidth: 1,
      transparent: true,
      opacity: 0.4,
    });

    // 12. Executive 3D Parking Lot & Vehicles
    const asphaltMat = new THREE.MeshStandardMaterial({
      color: 0x1b2028,
      roughness: 0.88,
      metalness: 0.05,
    });
    const roadPaintMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const carWheelMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.85,
    });
    const carRimMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.18,
    });
    const carLightFront = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const carLightRear = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    // 13. Rooftop Furniture, Cushions & Candle Materials
    const cushionCreamMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.8,
      metalness: 0.05,
    });
    const cushionAccentMat = new THREE.MeshStandardMaterial({
      color: 0xc2410c,
      roughness: 0.85,
      metalness: 0.02,
    });
    const candleGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
    });
    const candleLights: THREE.PointLight[] = [];

    // 14. Children's Playground & Recreation Materials
    const playTurfMat = new THREE.MeshStandardMaterial({
      color: 0xc2410c, // Terracotta rubber safety surface
      roughness: 0.9,
      metalness: 0.02,
    });
    const playWoodMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Natural treated playground wood
      roughness: 0.65,
      metalness: 0.05,
    });
    const playSlideMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vibrant sky blue slide
      roughness: 0.25,
      metalness: 0.5,
    });
    const playYellowMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24, // Sunny yellow canopy
      roughness: 0.4,
      metalness: 0.1,
    });

    // 15. Modern Park Streetlight / Lantern Materials
    const lanternPoleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.6,
    });
    const lanternGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffedd5, // Warm 2700K glowing diffuser lens
    });

    // 16. Blooming Park Flowers & Ornamental Plants
    const flowerRoseMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.8,
      flatShading: true,
    });
    const flowerLilacMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.8,
      flatShading: true,
    });

    // Helper to create an architectural box with subtle edge lines
    const createOutlinedBox = (
      w: number, 
      h: number, 
      d: number, 
      meshMat: THREE.Material, 
      customLineMat?: THREE.Material
    ) => {
      const group = new THREE.Group();
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, meshMat);
      if (!isMobileDevice) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
      group.add(mesh);

      if (!isMobileDevice && customLineMat) {
        const edgesGeo = new THREE.EdgesGeometry(geo);
        const wireframe = new THREE.LineSegments(edgesGeo, customLineMat);
        group.add(wireframe);
      }

      return { group, mesh, geo };
    };

    // --- Complex Master Hierarchy Group ---
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // --- 1. Master Landscape Podium & Park Environment ---
    // Main terrain base
    const basePodium = createOutlinedBox(26, 0.4, 26, darkAccentMat);
    basePodium.group.position.y = -0.2;
    basePodium.mesh.receiveShadow = true;
    buildingGroup.add(basePodium.group);

    // Manicured Grass Lawns (Left, Right, Perimeter)
    const leftLawn = createOutlinedBox(8.5, 0.08, 12, lawnMat);
    leftLawn.group.position.set(-7.5, 0.04, 3.5);
    buildingGroup.add(leftLawn.group);

    const rightLawn = createOutlinedBox(8.5, 0.08, 12, lawnMat);
    rightLawn.group.position.set(7.5, 0.04, 3.5);
    buildingGroup.add(rightLawn.group);

    const backLawn = createOutlinedBox(24, 0.08, 6.5, lawnMat);
    backLawn.group.position.set(0, 0.04, -8.5);
    buildingGroup.add(backLawn.group);

    // Grand Open Central Entrance Promenade (Wide, illuminated European arrival avenue)
    const centralWalkway = createOutlinedBox(4.6, 0.08, 10.5, walkwayMat);
    centralWalkway.group.position.set(0, 0.06, 6.0);
    buildingGroup.add(centralWalkway.group);

    // Stone Curbs along Central Promenade
    const leftCurb = createOutlinedBox(0.18, 0.16, 10.5, curbMat);
    leftCurb.group.position.set(-2.38, 0.09, 6.0);
    buildingGroup.add(leftCurb.group);

    const rightCurb = createOutlinedBox(0.18, 0.16, 10.5, curbMat);
    rightCurb.group.position.set(2.38, 0.09, 6.0);
    buildingGroup.add(rightCurb.group);

    // Connecting Walkways (West towards playground & parking, East towards scenic lake)
    const westPath = createOutlinedBox(1.6, 0.08, 4.4, walkwayMat);
    westPath.group.position.set(-4.2, 0.06, 3.8);
    westPath.group.rotation.y = -0.55;
    buildingGroup.add(westPath.group);

    const eastPath = createOutlinedBox(1.8, 0.08, 4.2, walkwayMat);
    eastPath.group.position.set(4.2, 0.06, 5.8);
    buildingGroup.add(eastPath.group);

    // Side Walkways leading along residential wings
    const courtyardWestPath = createOutlinedBox(1.4, 0.08, 6.5, walkwayMat);
    courtyardWestPath.group.position.set(-8.2, 0.06, -1.5);
    buildingGroup.add(courtyardWestPath.group);

    const courtyardEastPath = createOutlinedBox(1.4, 0.08, 6.5, walkwayMat);
    courtyardEastPath.group.position.set(8.2, 0.06, -1.5);
    buildingGroup.add(courtyardEastPath.group);

    // Organic Stepping Stones on Lawns
    const steppingStonePositions = [
      [-3.0, 6.5], [-3.8, 7.2], [-4.6, 7.8],
      [3.0, 6.5], [3.8, 7.2], [4.6, 7.8],
    ];
    steppingStonePositions.forEach(([sx, sz]) => {
      const stoneGeo = new THREE.CylinderGeometry(0.32, 0.35, 0.05, 12);
      const stoneMesh = new THREE.Mesh(stoneGeo, curbMat);
      stoneMesh.position.set(sx, 0.07, sz);
      stoneMesh.receiveShadow = true;
      buildingGroup.add(stoneMesh);
    });

    // --- Children's Play Zone on West Lawn ---
    const playgroundGroup = new THREE.Group();
    playgroundGroup.position.set(-7.2, 0, 4.2);

    // Safety EPDM Rubber Turf Surface
    const playTurf = createOutlinedBox(5.2, 0.06, 5.0, playTurfMat);
    playTurf.group.position.set(0, 0.06, 0);
    playgroundGroup.add(playTurf.group);

    // Play Border Curb
    const playBorder = createOutlinedBox(5.4, 0.12, 5.2, curbMat);
    playBorder.group.position.set(0, 0.05, 0);
    playgroundGroup.add(playBorder.group);

    // Play Adventure Tower
    const towerGroup = new THREE.Group();
    towerGroup.position.set(-1.0, 0, -0.8);

    const postCoords = [
      [-0.6, -0.6], [0.6, -0.6],
      [-0.6, 0.6], [0.6, 0.6]
    ];
    postCoords.forEach(([px, pz]) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8), playWoodMat);
      post.position.set(px, 0.9, pz);
      post.castShadow = true;
      towerGroup.add(post);
    });

    const platform = createOutlinedBox(1.4, 0.1, 1.4, playWoodMat);
    platform.group.position.set(0, 0.9, 0);
    towerGroup.add(platform.group);

    const roofGeo = new THREE.ConeGeometry(1.15, 0.65, 4);
    const roofMesh = new THREE.Mesh(roofGeo, playYellowMat);
    roofMesh.rotation.y = Math.PI / 4;
    roofMesh.position.set(0, 2.05, 0);
    roofMesh.castShadow = true;
    towerGroup.add(roofMesh);

    const rail1 = createOutlinedBox(1.3, 0.35, 0.04, playWoodMat);
    rail1.group.position.set(0, 1.2, 0.65);
    towerGroup.add(rail1.group);

    const rail2 = createOutlinedBox(0.04, 0.35, 1.3, playWoodMat);
    rail2.group.position.set(-0.65, 1.2, 0);
    towerGroup.add(rail2.group);

    // Slide (vibrant sky blue chute)
    const slideGeo = new THREE.BoxGeometry(0.5, 0.06, 1.8);
    const slideMesh = new THREE.Mesh(slideGeo, playSlideMat);
    slideMesh.position.set(0, 0.5, 1.25);
    slideMesh.rotation.x = 0.55;
    slideMesh.castShadow = true;
    towerGroup.add(slideMesh);

    // Ladder steps on the back
    for (let step = 0.25; step <= 0.85; step += 0.2) {
      const rung = createOutlinedBox(0.8, 0.04, 0.04, playWoodMat);
      rung.group.position.set(0, step, -0.65);
      towerGroup.add(rung.group);
    }
    playgroundGroup.add(towerGroup);

    // Double Swing Set
    const swingGroup = new THREE.Group();
    swingGroup.position.set(1.1, 0, 0.5);

    const leftA1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8), playWoodMat);
    leftA1.position.set(-0.9, 0.75, -0.3);
    leftA1.rotation.x = -0.25;
    swingGroup.add(leftA1);

    const leftA2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8), playWoodMat);
    leftA2.position.set(-0.9, 0.75, 0.3);
    leftA2.rotation.x = 0.25;
    swingGroup.add(leftA2);

    const rightA1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8), playWoodMat);
    rightA1.position.set(0.9, 0.75, -0.3);
    rightA1.rotation.x = -0.25;
    swingGroup.add(rightA1);

    const rightA2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8), playWoodMat);
    rightA2.position.set(0.9, 0.75, 0.3);
    rightA2.rotation.x = 0.25;
    swingGroup.add(rightA2);

    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.0, 8), playWoodMat);
    crossbar.position.set(0, 1.48, 0);
    crossbar.rotation.z = Math.PI / 2;
    swingGroup.add(crossbar);

    [-0.4, 0.4].forEach((sx) => {
      const seat = createOutlinedBox(0.35, 0.04, 0.2, playYellowMat);
      seat.group.position.set(sx, 0.35, 0);
      swingGroup.add(seat.group);

      const rope1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.1, 4), darkAccentMat);
      rope1.position.set(sx - 0.14, 0.92, 0);
      swingGroup.add(rope1);

      const rope2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.1, 4), darkAccentMat);
      rope2.position.set(sx + 0.14, 0.92, 0);
      swingGroup.add(rope2);
    });
    playgroundGroup.add(swingGroup);

    // Stepping balancing stumps
    const steppingDisks = [
      [-0.3, 1.5, 0.22],
      [0.2, 1.8, 0.28],
      [0.7, 1.6, 0.2],
    ];
    steppingDisks.forEach(([dx, dz, dh]) => {
      const diskGeo = new THREE.CylinderGeometry(0.22, 0.24, dh, 12);
      const diskMesh = new THREE.Mesh(diskGeo, playWoodMat);
      diskMesh.position.set(dx, dh / 2 + 0.06, dz);
      diskMesh.castShadow = true;
      playgroundGroup.add(diskMesh);
    });

    // Parent rest bench facing playground
    const benchGroup = new THREE.Group();
    benchGroup.position.set(0, 0.06, -2.1);
    const benchSeat = createOutlinedBox(1.5, 0.06, 0.4, warmWoodMat);
    benchSeat.group.position.set(0, 0.35, 0);
    benchGroup.add(benchSeat.group);

    const benchBack = createOutlinedBox(1.5, 0.35, 0.05, warmWoodMat);
    benchBack.group.position.set(0, 0.6, -0.18);
    benchGroup.add(benchBack.group);

    const benchLegLeft = createOutlinedBox(0.06, 0.35, 0.4, darkAccentMat);
    benchLegLeft.group.position.set(-0.65, 0.18, 0);
    benchGroup.add(benchLegLeft.group);

    const benchLegRight = createOutlinedBox(0.06, 0.35, 0.4, darkAccentMat);
    benchLegRight.group.position.set(0.65, 0.18, 0);
    benchGroup.add(benchLegRight.group);

    playgroundGroup.add(benchGroup);
    buildingGroup.add(playgroundGroup);

    // --- Modern Park Streetlights / Lanterns ---
    const createParkLantern = (lx: number, lz: number, rotY: number = 0, withLight: boolean = false) => {
      const lanternGroup = new THREE.Group();
      lanternGroup.position.set(lx, 0, lz);
      lanternGroup.rotation.y = rotY;

      // Slender architectural steel pole (height 2.2m)
      const poleGeo = new THREE.CylinderGeometry(0.045, 0.065, 2.2, 8);
      const poleMesh = new THREE.Mesh(poleGeo, lanternPoleMat);
      poleMesh.position.y = 1.1;
      poleMesh.castShadow = true;
      lanternGroup.add(poleMesh);

      // Horizontal cantilever bracket arm
      const armGeo = new THREE.BoxGeometry(0.42, 0.045, 0.05);
      const armMesh = new THREE.Mesh(armGeo, lanternPoleMat);
      armMesh.position.set(0.18, 2.18, 0);
      lanternGroup.add(armMesh);

      // Downward luminaire fixture
      const headGeo = new THREE.BoxGeometry(0.26, 0.07, 0.14);
      const headMesh = new THREE.Mesh(headGeo, lanternPoleMat);
      headMesh.position.set(0.35, 2.14, 0);
      lanternGroup.add(headMesh);

      // Glowing warm diffuser lens
      const lensGeo = new THREE.BoxGeometry(0.22, 0.025, 0.12);
      const lensMesh = new THREE.Mesh(lensGeo, lanternGlowMat);
      lensMesh.position.set(0.35, 2.09, 0);
      lanternGroup.add(lensMesh);

      // Warm illumination point light
      if (withLight) {
        const pl = new THREE.PointLight(0xffedd5, 1.2, 6.5, 1.6);
        pl.position.set(0.35, 2.0, 0);
        lanternGroup.add(pl);
      }

      buildingGroup.add(lanternGroup);
    };

    // Place Lanterns along Walkways, Grand Promenade & Lake Deck
    createParkLantern(-2.7, 2.4, Math.PI / 2, true);
    createParkLantern(2.7, 2.4, -Math.PI / 2, true);
    createParkLantern(-2.7, 5.5, Math.PI / 2, true);
    createParkLantern(2.7, 5.5, -Math.PI / 2, true);
    createParkLantern(-2.7, 8.8, Math.PI / 2, true);
    createParkLantern(2.7, 8.8, -Math.PI / 2, true);
    createParkLantern(-2.7, 10.8, Math.PI / 2, true);
    createParkLantern(2.7, 10.8, -Math.PI / 2, true);
    createParkLantern(4.5, 7.8, -Math.PI / 4, true);
    createParkLantern(10.5, 8.5, -Math.PI / 2, true);
    createParkLantern(-5.2, 2.2, 0, false);
    createParkLantern(4.5, 2.2, 0, false);

    // --- 2A. Central Grand Architectural Cascade Fountain ---
    // Outer Granite Basin
    const fountainBasinGeo = new THREE.CylinderGeometry(2.3, 2.45, 0.35, 32);
    const fountainBasinMesh = new THREE.Mesh(fountainBasinGeo, curbMat);
    fountainBasinMesh.position.set(0, 0.18, 6.8);
    fountainBasinMesh.castShadow = true;
    fountainBasinMesh.receiveShadow = true;
    buildingGroup.add(fountainBasinMesh);

    // Basin Water Surface (Vivid turquoise/azure crystal water)
    const fountainWaterGeo = new THREE.CylinderGeometry(2.15, 2.15, 0.28, 32);
    const fountainWaterMesh = new THREE.Mesh(fountainWaterGeo, waterMat);
    fountainWaterMesh.position.set(0, 0.22, 6.8);
    buildingGroup.add(fountainWaterMesh);

    // Fountain Pedestal & Middle Tier
    const fountainTierGeo = new THREE.CylinderGeometry(1.15, 1.25, 0.32, 24);
    const fountainTierMesh = new THREE.Mesh(fountainTierGeo, darkAccentMat);
    fountainTierMesh.position.set(0, 0.42, 6.8);
    fountainTierMesh.castShadow = true;
    buildingGroup.add(fountainTierMesh);

    const fountainMidWaterGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.12, 24);
    const fountainMidWaterMesh = new THREE.Mesh(fountainMidWaterGeo, waterMat);
    fountainMidWaterMesh.position.set(0, 0.52, 6.8);
    buildingGroup.add(fountainMidWaterMesh);

    // Top Fountain Jet Spire & Water Spray
    const nozzleGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.5, 12);
    const nozzleMesh = new THREE.Mesh(nozzleGeo, warmWoodMat);
    nozzleMesh.position.set(0, 0.75, 6.8);
    buildingGroup.add(nozzleMesh);

    const sprayGeo = new THREE.SphereGeometry(0.35, 16, 12);
    const sprayMesh = new THREE.Mesh(sprayGeo, glassMat);
    sprayMesh.position.set(0, 1.02, 6.8);
    sprayMesh.scale.set(1.0, 1.4, 1.0);
    buildingGroup.add(sprayMesh);

    // Glowing underwater LED illumination
    if (!isMobileDevice) {
      const fountainLight = new THREE.PointLight(0x38bdf8, 2.6, 7.5, 1.6);
      fountainLight.position.set(0, 0.65, 6.8);
      buildingGroup.add(fountainLight);
    }

    // --- 2B. Scenic Natural Lake & Promenade Pier on the Right Side (East Park) ---
    // Circular Natural Lake Basin situated on the east lawn
    const lakeBasinGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.25, 48);
    const lakeMesh = new THREE.Mesh(lakeBasinGeo, waterMat);
    lakeMesh.position.set(7.6, 0.06, 5.8);
    lakeMesh.receiveShadow = true;
    buildingGroup.add(lakeMesh);

    const lakeDepthGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.22, 32);
    const lakeDepthMesh = new THREE.Mesh(lakeDepthGeo, waterDepthMat);
    lakeDepthMesh.position.set(7.6, 0.04, 5.8);
    buildingGroup.add(lakeDepthMesh);

    // Lake Stone Border Embankment Ring
    const lakeRingGeo = new THREE.TorusGeometry(3.6, 0.2, 12, 48);
    const lakeRingMesh = new THREE.Mesh(lakeRingGeo, curbMat);
    lakeRingMesh.rotation.x = Math.PI / 2;
    lakeRingMesh.position.set(7.6, 0.14, 5.8);
    buildingGroup.add(lakeRingMesh);

    // Underwater Lake Glow
    if (!isMobileDevice) {
      const lakeUnderwaterLight = new THREE.PointLight(0x0ea5e9, 1.8, 6.5, 1.5);
      lakeUnderwaterLight.position.set(7.6, 0.4, 5.8);
      buildingGroup.add(lakeUnderwaterLight);
    }

    // Wooden Pier / Viewing Deck reaching into the lake from the pathway
    const pierObj = createOutlinedBox(3.4, 0.16, 1.6, warmWoodMat);
    pierObj.group.position.set(5.8, 0.22, 5.8);
    buildingGroup.add(pierObj.group);

    // Pier Submerged Wood Pilings / Stilts
    const pilingCoords = [
      [5.0, 5.2], [5.0, 6.4],
      [6.6, 5.2], [6.6, 6.4],
      [7.2, 5.2], [7.2, 6.4]
    ];
    pilingCoords.forEach(([px, pz]) => {
      const pilingGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.45, 8);
      const pilingMesh = new THREE.Mesh(pilingGeo, barkMat);
      pilingMesh.position.set(px, 0.05, pz);
      buildingGroup.add(pilingMesh);
    });

    // Pier Glass & Wood Railings
    const northPierRail = createOutlinedBox(3.2, 0.45, 0.05, glassMat);
    northPierRail.group.position.set(5.8, 0.5, 5.0);
    buildingGroup.add(northPierRail.group);

    const southPierRail = createOutlinedBox(3.2, 0.45, 0.05, glassMat);
    southPierRail.group.position.set(5.8, 0.5, 6.6);
    buildingGroup.add(southPierRail.group);

    // Pier Viewing Bench Lounger overlooking water
    const pierBench = createOutlinedBox(1.4, 0.08, 0.4, warmWoodMat);
    pierBench.group.position.set(6.8, 0.35, 5.8);
    buildingGroup.add(pierBench.group);

    // Decorative floating water lily pads on the lake
    const lilyPadCoords = [
      [7.2, 4.2], [8.5, 6.5], [6.8, 7.2], [8.8, 4.8]
    ];
    lilyPadCoords.forEach(([lx, lz]) => {
      const lilyGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.02, 12);
      const lilyMesh = new THREE.Mesh(lilyGeo, foliageLimeMat);
      lilyMesh.position.set(lx, 0.08, lz);
      buildingGroup.add(lilyMesh);

      // Blossom
      const blossomGeo = new THREE.DodecahedronGeometry(0.08, 0);
      const blossomMesh = new THREE.Mesh(blossomGeo, flowerRoseMat);
      blossomMesh.position.set(lx, 0.11, lz);
      buildingGroup.add(blossomMesh);
    });

    // --- 3. Central Residential Tower (8 floors, ~11m high) ---
    const mainBlockObj = createOutlinedBox(9.2, 9.6, 6.8, facadeMat, lineMat);
    mainBlockObj.group.position.set(0, 4.8, -0.2);
    buildingGroup.add(mainBlockObj.group);

    // Dark Granite Ground Colonnade & High-Ceiling Commercial/Lobby Base
    const baseColonnadeObj = createOutlinedBox(9.6, 1.5, 7.2, darkAccentMat, lineMat);
    baseColonnadeObj.group.position.set(0, 0.75, -0.2);
    buildingGroup.add(baseColonnadeObj.group);

    // Double-Height Grand Entrance Glass Lobby (clean transparent crystal glass)
    const lobbyGlassObj = createOutlinedBox(3.8, 1.4, 0.2, glassMat);
    lobbyGlassObj.group.position.set(0, 0.75, 3.42);
    buildingGroup.add(lobbyGlassObj.group);

    // Illuminated Lobby Reception Interior Wall
    const lobbyInterior = createOutlinedBox(3.4, 1.2, 0.1, glowingInteriorMat);
    lobbyInterior.group.position.set(0, 0.75, 3.25);
    buildingGroup.add(lobbyInterior.group);

    // Architectural Thermo-Wood Entrance Canopy (Floating cantilever with warm underglow)
    const portalObj = createOutlinedBox(4.4, 0.25, 1.6, warmWoodMat);
    portalObj.group.position.set(0, 1.65, 4.1);
    buildingGroup.add(portalObj.group);

    // Bereke Park Entrance Pylon Sign with Glowing Letters
    const pylonSign = createOutlinedBox(0.3, 1.2, 0.8, darkAccentMat);
    pylonSign.group.position.set(-2.5, 0.6, 4.2);
    buildingGroup.add(pylonSign.group);

    const pylonPlaque = createOutlinedBox(0.05, 0.6, 0.6, warmWoodMat);
    pylonPlaque.group.position.set(-2.33, 0.7, 4.2);
    buildingGroup.add(pylonPlaque.group);

    // --- 4. Stepped West & East Residential Wings (6 floors) ---
    // West Wing (Left)
    const westWingObj = createOutlinedBox(5.6, 7.2, 5.8, facadeMat, lineMat);
    westWingObj.group.position.set(-6.6, 3.6, -0.7);
    buildingGroup.add(westWingObj.group);

    const westWingBase = createOutlinedBox(5.8, 1.5, 6.0, darkAccentMat);
    westWingBase.group.position.set(-6.6, 0.75, -0.7);
    buildingGroup.add(westWingBase.group);

    // East Wing (Right)
    const eastWingObj = createOutlinedBox(5.6, 7.2, 5.8, facadeMat, lineMat);
    eastWingObj.group.position.set(6.6, 3.6, -0.7);
    buildingGroup.add(eastWingObj.group);

    const eastWingBase = createOutlinedBox(5.8, 1.5, 6.0, darkAccentMat);
    eastWingBase.group.position.set(6.6, 0.75, -0.7);
    buildingGroup.add(eastWingBase.group);

    // --- 5. Penthouses & Rooftop Open-Air Pergolas with Realistic Wooden Slats ---
    // Central Tower Penthouse Mansard
    const penthouseObj = createOutlinedBox(7.6, 2.1, 5.4, darkAccentMat, lineMat);
    penthouseObj.group.position.set(0, 10.6, -0.5);
    buildingGroup.add(penthouseObj.group);

    // Penthouse Front Panoramic Windows & Warm Glowing Interior
    const penthouseWin = createOutlinedBox(7.2, 1.5, 0.1, glassMat);
    penthouseWin.group.position.set(0, 10.6, 2.22);
    buildingGroup.add(penthouseWin.group);

    const penthouseGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(7.0, 1.4),
      glowingInteriorMat
    );
    penthouseGlow.position.set(0, 10.6, 2.15);
    buildingGroup.add(penthouseGlow);

    // Rooftop Terrace Wooden Decking
    const roofDeck = createOutlinedBox(8.4, 0.12, 6.0, warmWoodMat);
    roofDeck.group.position.set(0, 11.66, -0.5);
    buildingGroup.add(roofDeck.group);

    // Rooftop Terrace Luxury Dining Sets, Chairs, Candles & Lounge Furniture
    const createRoofDiningSet = (tx: number, ty: number, tz: number) => {
      const diningGroup = new THREE.Group();
      diningGroup.position.set(tx, ty, tz);

      // Round Designer Dining Table
      const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.05, 16), warmWoodMat);
      tableTop.position.y = 0.52;
      tableTop.castShadow = true;
      diningGroup.add(tableTop);

      const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.52, 8), darkAccentMat);
      tableLeg.position.y = 0.26;
      diningGroup.add(tableLeg);

      const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.02, 12), darkAccentMat);
      tableBase.position.y = 0.01;
      diningGroup.add(tableBase);

      // 4 Modern Designer Dining Chairs with Cream Cushions
      const chairOffsets = [
        [0, 0.52, 0],
        [0, -0.52, Math.PI],
        [-0.52, 0, Math.PI / 2],
        [0.52, 0, -Math.PI / 2]
      ];
      chairOffsets.forEach(([cx, cz, crot]) => {
        const chair = new THREE.Group();
        chair.position.set(cx, 0, cz);
        chair.rotation.y = crot;

        const seat = createOutlinedBox(0.36, 0.04, 0.36, cushionCreamMat);
        seat.group.position.y = 0.32;
        chair.add(seat.group);

        const back = createOutlinedBox(0.36, 0.26, 0.04, darkAccentMat);
        back.group.position.set(0, 0.46, -0.16);
        chair.add(back.group);

        const legGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.32, 6);
        [[-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]].forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(legGeo, darkAccentMat);
          leg.position.set(lx, 0.16, lz);
          chair.add(leg);
        });

        diningGroup.add(chair);
      });

      // Glass Hurricane Candle Lantern on table center
      const lanternGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.16, 12), glassMat);
      lanternGlass.position.set(0, 0.62, 0);
      diningGroup.add(lanternGlass);

      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), candleGlowMat);
      flame.position.set(0, 0.62, 0);
      diningGroup.add(flame);

      if (!isMobileDevice) {
        const candleLight = new THREE.PointLight(0xffa238, 1.2, 4.2, 1.8);
        candleLight.position.set(0, 0.66, 0);
        diningGroup.add(candleLight);
        candleLights.push(candleLight);
      }

      buildingGroup.add(diningGroup);
    };

    // Central Penthouse Dining Tables (Left & Right under pergola)
    createRoofDiningSet(-2.4, 11.66, -0.6);
    createRoofDiningSet(2.4, 11.66, -0.6);

    // Central Penthouse L-Shaped Executive Lounge Sofa & Coffee Table
    const createRoofLounge = (lx: number, ly: number, lz: number) => {
      const loungeGroup = new THREE.Group();
      loungeGroup.position.set(lx, ly, lz);

      const mainBench = createOutlinedBox(2.2, 0.22, 0.72, warmWoodMat);
      mainBench.group.position.set(0, 0.11, 0);
      loungeGroup.add(mainBench.group);

      const mainCushion = createOutlinedBox(2.1, 0.14, 0.68, cushionCreamMat);
      mainCushion.group.position.set(0, 0.28, 0);
      loungeGroup.add(mainCushion.group);

      const backRest = createOutlinedBox(2.2, 0.32, 0.1, warmWoodMat);
      backRest.group.position.set(0, 0.42, -0.31);
      loungeGroup.add(backRest.group);

      // Return L-segment
      const returnBench = createOutlinedBox(0.72, 0.22, 1.1, warmWoodMat);
      returnBench.group.position.set(1.46, 0.11, 0.55);
      loungeGroup.add(returnBench.group);

      const returnCushion = createOutlinedBox(0.68, 0.14, 1.05, cushionCreamMat);
      returnCushion.group.position.set(1.46, 0.28, 0.55);
      loungeGroup.add(returnCushion.group);

      // Pillows
      const pillow1 = createOutlinedBox(0.32, 0.22, 0.08, cushionAccentMat);
      pillow1.group.position.set(-0.65, 0.4, -0.2);
      loungeGroup.add(pillow1.group);

      const pillow2 = createOutlinedBox(0.32, 0.22, 0.08, cushionAccentMat);
      pillow2.group.position.set(0.65, 0.4, -0.2);
      loungeGroup.add(pillow2.group);

      // Low Teak Coffee Table with Twin Candles
      const coffeeTable = createOutlinedBox(1.1, 0.15, 0.55, warmWoodMat);
      coffeeTable.group.position.set(0.2, 0.08, 0.65);
      loungeGroup.add(coffeeTable.group);

      [-0.22, 0.22].forEach((cx) => {
        const cMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.09, 8), candleGlowMat);
        cMesh.position.set(0.2 + cx, 0.2, 0.65);
        loungeGroup.add(cMesh);

        if (!isMobileDevice) {
          const cLight = new THREE.PointLight(0xffa238, 0.85, 3.2, 1.8);
          cLight.position.set(0.2 + cx, 0.25, 0.65);
          loungeGroup.add(cLight);
          candleLights.push(cLight);
        }
      });

      buildingGroup.add(loungeGroup);
    };
    createRoofLounge(0, 11.66, 1.0);

    // Rooftop Terrace Luxury Sun Loungers
    const createSunLounger = (lx: number, lz: number, rotY: number) => {
      const lounger = new THREE.Group();
      lounger.position.set(lx, 11.72, lz);
      lounger.rotation.y = rotY;

      const base = createOutlinedBox(0.7, 0.08, 1.8, warmWoodMat);
      base.group.position.y = 0.04;
      lounger.add(base.group);

      const back = createOutlinedBox(0.66, 0.06, 0.75, warmWoodMat);
      back.group.position.set(0, 0.22, -0.5);
      back.group.rotation.x = -0.45;
      lounger.add(back.group);

      buildingGroup.add(lounger);
    };
    createSunLounger(-3.2, -1.8, 0.2);
    createSunLounger(3.2, -1.8, -0.2);

    // West Wing Rooftop Terrace Dining Table & Candles
    createRoofDiningSet(-6.6, 7.9, -0.7);

    // East Wing Rooftop Terrace Dining Table & Candles
    createRoofDiningSet(6.6, 7.9, -0.7);

    // Rooftop Green Planter Boxes along terrace balustrade
    [-2.8, 0, 2.8].forEach((px) => {
      const planter = createOutlinedBox(2.2, 0.32, 0.35, darkAccentMat);
      planter.group.position.set(px, 11.82, 2.2);
      buildingGroup.add(planter.group);

      // Miniature manicured boxwood hedge inside planter
      const hedge = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.25, 0.3),
        foliageSunlitMat
      );
      hedge.position.set(px, 12.05, 2.2);
      buildingGroup.add(hedge);
    });

    // Rooftop Glass Parapet Balustrade
    const roofGlassFront = createOutlinedBox(8.2, 0.65, 0.05, glassMat);
    roofGlassFront.group.position.set(0, 12.0, 2.45);
    buildingGroup.add(roofGlassFront.group);

    // Luxury Wooden Louver Pergola
    const pergolaMainFrame = createOutlinedBox(8.2, 0.18, 5.8, darkAccentMat);
    pergolaMainFrame.group.position.set(0, 12.8, -0.5);
    buildingGroup.add(pergolaMainFrame.group);

    // Warm ambient point light under the pergola canopy
    const pergolaLight = new THREE.PointLight(0xffedd5, 1.6, 8.0, 1.8);
    pergolaLight.position.set(0, 12.4, -0.5);
    buildingGroup.add(pergolaLight);

    for (let slat = -3.4; slat <= 3.4; slat += 0.65) {
      const slatObj = createOutlinedBox(0.12, 0.12, 5.6, warmWoodMat);
      slatObj.group.position.set(slat, 12.75, -0.5);
      buildingGroup.add(slatObj.group);
    }

    // Pergola Support Columns
    const pergolaColumns = [
      [-3.8, 12.2, 2.2],
      [3.8, 12.2, 2.2],
      [-3.8, 12.2, -3.2],
      [3.8, 12.2, -3.2],
    ];
    pergolaColumns.forEach(([cx, cy, cz]) => {
      const col = createOutlinedBox(0.2, 1.2, 0.2, darkAccentMat);
      col.group.position.set(cx, cy, cz);
      buildingGroup.add(col.group);
    });

    // West Wing Rooftop Terrace & Pergola
    const westPergola = createOutlinedBox(4.8, 0.15, 4.6, warmWoodMat);
    westPergola.group.position.set(-6.6, 7.9, -0.7);
    buildingGroup.add(westPergola.group);

    // East Wing Rooftop Terrace & Pergola
    const eastPergola = createOutlinedBox(4.8, 0.15, 4.6, warmWoodMat);
    eastPergola.group.position.set(6.6, 7.9, -0.7);
    buildingGroup.add(eastPergola.group);

    // --- 6. Floors, Windows, Cantilevered Balconies & Cozy Interior Lights ---
    for (let floor = 1; floor <= 7; floor++) {
      const y = floor * 1.32 + 0.45;

      // Horizontal Architectural Cornice Band
      const cornice = createOutlinedBox(9.4, 0.1, 7.0, darkAccentMat);
      cornice.group.position.set(0, y - 0.58, -0.2);
      buildingGroup.add(cornice.group);

      // Floor-to-Ceiling Front Glass Windows (Main Tower - clean crystal glass)
      const winFront = createOutlinedBox(7.8, 0.98, 0.12, glassMat);
      winFront.group.position.set(0, y, 3.22);
      buildingGroup.add(winFront.group);

      // Window Vertical Dark Mullion Strips
      for (let mx = -2.6; mx <= 2.6; mx += 1.3) {
        const mullion = createOutlinedBox(0.08, 0.98, 0.14, darkAccentMat);
        mullion.group.position.set(mx, y, 3.22);
        buildingGroup.add(mullion.group);
      }

      // Warm Interior Ambient Room Planes (Realistic residential evening lights)
      if (floor % 2 === 1 || floor === 2 || floor === 4 || floor === 6) {
        const interior = new THREE.Mesh(
          new THREE.PlaneGeometry(floor % 2 === 0 ? 5.2 : 7.4, 0.88),
          glowingInteriorMat
        );
        interior.position.set(floor % 2 === 0 ? 0.8 : 0, y, 3.12);
        buildingGroup.add(interior);
      }

      // Back Panoramic Windows
      const winBack = createOutlinedBox(7.8, 0.98, 0.12, glassMat);
      winBack.group.position.set(0, y, -3.62);
      buildingGroup.add(winBack.group);

      // Cantilevered Staggered Glass Balconies (Floors 2, 4, 6)
      if (floor === 2 || floor === 4 || floor === 6) {
        const balconySlab = createOutlinedBox(5.6, 0.18, 1.5, darkAccentMat);
        balconySlab.group.position.set(0, y - 0.48, 3.9);
        buildingGroup.add(balconySlab.group);

        const balconyGlass = createOutlinedBox(5.6, 0.65, 0.05, glassMat);
        balconyGlass.group.position.set(0, y - 0.15, 4.62);
        buildingGroup.add(balconyGlass.group);

        // Balcony Handrail
        const handrail = createOutlinedBox(5.64, 0.06, 0.08, darkAccentMat);
        handrail.group.position.set(0, y + 0.18, 4.62);
        buildingGroup.add(handrail.group);

        // Balcony Timber Privacy Side Panels
        const leftScreen = createOutlinedBox(0.08, 0.7, 1.45, warmWoodMat);
        leftScreen.group.position.set(-2.8, y - 0.12, 3.9);
        buildingGroup.add(leftScreen.group);

        const rightScreen = createOutlinedBox(0.08, 0.7, 1.45, warmWoodMat);
        rightScreen.group.position.set(2.8, y - 0.12, 3.9);
        buildingGroup.add(rightScreen.group);
      }

      // Side Wings Windows & Balconies (Floors 1 to 5)
      if (floor <= 5) {
        // West Wing Front Windows & Warm Lights
        const westWin = createOutlinedBox(4.4, 0.92, 0.1, glassMat);
        westWin.group.position.set(-6.6, y, 2.22);
        buildingGroup.add(westWin.group);

        if (floor % 2 === 1 || floor === 4) {
          const westGlow = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 0.82), glowingInteriorMat);
          westGlow.position.set(-6.6, y, 2.14);
          buildingGroup.add(westGlow);
        }

        // East Wing Front Windows & Warm Lights
        const eastWin = createOutlinedBox(4.4, 0.92, 0.1, glassMat);
        eastWin.group.position.set(6.6, y, 2.22);
        buildingGroup.add(eastWin.group);

        if (floor % 2 === 0 || floor === 5) {
          const eastGlow = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 0.82), glowingInteriorMat);
          eastGlow.position.set(6.6, y, 2.14);
          buildingGroup.add(eastGlow);
        }

        // Side Balconies on alternate floors
        if (floor % 2 === 0) {
          const westBalconySlab = createOutlinedBox(1.2, 0.16, 3.2, darkAccentMat);
          westBalconySlab.group.position.set(-9.8, y - 0.48, -0.7);
          buildingGroup.add(westBalconySlab.group);

          const westBalconyGlass = createOutlinedBox(0.05, 0.6, 3.2, glassMat);
          westBalconyGlass.group.position.set(-10.38, y - 0.15, -0.7);
          buildingGroup.add(westBalconyGlass.group);

          const eastBalconySlab = createOutlinedBox(1.2, 0.16, 3.2, darkAccentMat);
          eastBalconySlab.group.position.set(9.8, y - 0.48, -0.7);
          buildingGroup.add(eastBalconySlab.group);

          const eastBalconyGlass = createOutlinedBox(0.05, 0.6, 3.2, glassMat);
          eastBalconyGlass.group.position.set(10.38, y - 0.15, -0.7);
          buildingGroup.add(eastBalconyGlass.group);
        }
      }
    }

    // --- 7. Lush Volumetric Real 3D Trees & Landscaping ---
    // Procedural organic tree generator with multi-cluster fluffy volumetric crowns
    const treesList: THREE.Group[] = [];

    const createLushVolumetricTree = (
      tx: number, 
      tz: number, 
      scale: number = 1.0, 
      treeType: 'oak' | 'pine' | 'cypress' = 'oak'
    ) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0, tz);

      if (treeType === 'oak') {
        // Tapered organic trunk with subtle lean
        const trunkGeo = new THREE.CylinderGeometry(0.12 * scale, 0.18 * scale, 1.4 * scale, 8);
        const trunkMesh = new THREE.Mesh(trunkGeo, barkMat);
        trunkMesh.position.y = 0.7 * scale;
        if (!isMobileDevice) {
          trunkMesh.castShadow = true;
          trunkMesh.receiveShadow = true;
        }
        treeGroup.add(trunkMesh);

        // Branching offshoots (desktop only)
        if (!isMobileDevice) {
          const branchGeo = new THREE.CylinderGeometry(0.06 * scale, 0.09 * scale, 0.7 * scale, 6);
          const branch1 = new THREE.Mesh(branchGeo, barkMat);
          branch1.position.set(-0.2 * scale, 1.2 * scale, 0.1 * scale);
          branch1.rotation.z = Math.PI / 4;
          treeGroup.add(branch1);

          const branch2 = new THREE.Mesh(branchGeo, barkMat);
          branch2.position.set(0.2 * scale, 1.3 * scale, -0.1 * scale);
          branch2.rotation.z = -Math.PI / 4;
          treeGroup.add(branch2);
        }

        // Overlapping Volumetric Foliage (Compact 2 clusters on mobile, 7 on desktop)
        const clusters = isMobileDevice
          ? [
              { x: 0.0, y: 1.8 * scale, z: 0.0, r: 1.25 * scale, mat: foliageMidMat },
              { x: 0.15 * scale, y: 2.3 * scale, z: 0.1 * scale, r: 0.85 * scale, mat: foliageLimeMat },
            ]
          : [
              { x: 0.0, y: 1.8 * scale, z: 0.0, r: 1.1 * scale, mat: foliageMidMat },
              { x: -0.55 * scale, y: 1.5 * scale, z: 0.35 * scale, r: 0.85 * scale, mat: foliageDeepMat },
              { x: 0.55 * scale, y: 1.6 * scale, z: -0.35 * scale, r: 0.9 * scale, mat: foliageSunlitMat },
              { x: 0.35 * scale, y: 1.5 * scale, z: 0.55 * scale, r: 0.85 * scale, mat: foliageMidMat },
              { x: -0.4 * scale, y: 1.7 * scale, z: -0.45 * scale, r: 0.8 * scale, mat: foliageDeepMat },
              { x: 0.0, y: 2.35 * scale, z: 0.0, r: 0.95 * scale, mat: foliageLimeMat },
              { x: 0.2 * scale, y: 2.65 * scale, z: 0.1 * scale, r: 0.65 * scale, mat: foliageSunlitMat },
            ];

        clusters.forEach((c) => {
          const sphereGeo = new THREE.DodecahedronGeometry(c.r, 1);
          const sphereMesh = new THREE.Mesh(sphereGeo, c.mat);
          sphereMesh.position.set(c.x, c.y, c.z);
          if (!isMobileDevice) {
            sphereMesh.castShadow = true;
            sphereMesh.receiveShadow = true;
          }
          treeGroup.add(sphereMesh);
        });
      } else if (treeType === 'cypress') {
        // Slender architectural columnar cypress
        const trunkGeo = new THREE.CylinderGeometry(0.08 * scale, 0.12 * scale, 0.8 * scale, 6);
        const trunkMesh = new THREE.Mesh(trunkGeo, barkMat);
        trunkMesh.position.y = 0.4 * scale;
        treeGroup.add(trunkMesh);

        const tiers = [
          { y: 1.0 * scale, r: 0.65 * scale, h: 1.2 * scale, mat: foliageDeepMat },
          { y: 1.8 * scale, r: 0.52 * scale, h: 1.2 * scale, mat: foliageMidMat },
          { y: 2.5 * scale, r: 0.38 * scale, h: 1.1 * scale, mat: foliageSunlitMat },
          { y: 3.1 * scale, r: 0.22 * scale, h: 0.9 * scale, mat: foliageLimeMat },
        ];

        tiers.forEach((t) => {
          const coneGeo = new THREE.ConeGeometry(t.r, t.h, 7);
          const coneMesh = new THREE.Mesh(coneGeo, t.mat);
          coneMesh.position.y = t.y;
          coneMesh.castShadow = true;
          coneMesh.receiveShadow = true;
          treeGroup.add(coneMesh);
        });
      }

      buildingGroup.add(treeGroup);
      treesList.push(treeGroup);
      return treeGroup;
    };

    // Place Rich Volumetric Park Trees (Framing perimeter & lake, keeping entrance avenue totally clear)
    // Left (West) Park & Playground Trees
    createLushVolumetricTree(-7.5, 9.5, 1.25, 'oak');
    createLushVolumetricTree(-9.5, 7.8, 1.2, 'oak');
    createLushVolumetricTree(-10.2, 5.5, 1.25, 'oak');
    createLushVolumetricTree(-8.8, 8.2, 1.15, 'oak');
    createLushVolumetricTree(-10.5, 1.0, 1.2, 'oak');
    createLushVolumetricTree(-11.0, -4.5, 1.35, 'oak');
    createLushVolumetricTree(-8.5, -8.0, 1.1, 'oak');

    // Right (East) Lake Parkland & Garden Trees
    createLushVolumetricTree(6.8, 10.5, 1.25, 'oak');
    createLushVolumetricTree(9.8, 9.5, 1.2, 'oak');
    createLushVolumetricTree(10.5, 6.2, 1.3, 'oak');
    createLushVolumetricTree(11.2, 3.5, 1.15, 'oak');
    createLushVolumetricTree(10.5, 1.0, 1.2, 'oak');
    createLushVolumetricTree(10.8, -4.5, 1.35, 'oak');
    createLushVolumetricTree(8.5, -8.0, 1.1, 'oak');
    createLushVolumetricTree(0, -9.0, 1.4, 'oak');

    // Flanking Columnar Cypress Trees (Framing entrance avenue neatly without blocking)
    createLushVolumetricTree(-3.4, 2.5, 0.95, 'cypress');
    createLushVolumetricTree(3.4, 2.5, 0.95, 'cypress');
    createLushVolumetricTree(-3.4, 5.0, 0.95, 'cypress');
    createLushVolumetricTree(3.4, 5.0, 0.95, 'cypress');
    createLushVolumetricTree(-6.8, 1.8, 1.05, 'cypress');
    createLushVolumetricTree(6.8, 2.8, 1.05, 'cypress');

    // Rounded Greenery Dome Shrubs / Low Hedges along Curbs
    const shrubPositions = [
      [-3.4, 1.8], [3.4, 1.8],
      [-4.0, 3.8], [4.0, 3.8],
      [-5.8, 4.2], [5.8, 4.2],
      [-3.4, 7.5], [3.4, 7.5],
      [-3.4, 9.8], [3.4, 9.8],
      [-4.8, 6.2], [4.8, 6.2],
      [9.5, 5.5], [9.5, 7.5],
    ];
    shrubPositions.forEach(([sx, sz]) => {
      const shrubGeo = new THREE.DodecahedronGeometry(0.42, 1);
      const shrubMesh = new THREE.Mesh(shrubGeo, foliageSunlitMat);
      shrubMesh.position.set(sx, 0.22, sz);
      shrubMesh.scale.set(1.2, 0.7, 1.2);
      shrubMesh.castShadow = true;
      buildingGroup.add(shrubMesh);
    });

    // Blooming Flowering Hydrangea & Lavender Bushes
    const flowerClusters = [
      { x: -3.8, z: 5.6, mat: flowerRoseMat },
      { x: 3.8, z: 5.6, mat: flowerLilacMat },
      { x: -5.2, z: 3.2, mat: flowerLilacMat },
      { x: 5.2, z: 3.2, mat: flowerRoseMat },
      { x: -3.8, z: 8.5, mat: flowerRoseMat },
      { x: 3.8, z: 8.5, mat: flowerLilacMat },
      { x: 6.8, z: 8.5, mat: flowerRoseMat },
      { x: 9.2, z: 3.8, mat: flowerLilacMat },
    ];
    flowerClusters.forEach((fc) => {
      const flowerGeo = new THREE.DodecahedronGeometry(0.32, 1);
      const flowerMesh = new THREE.Mesh(flowerGeo, fc.mat);
      flowerMesh.position.set(fc.x, 0.18, fc.z);
      flowerMesh.scale.set(1.1, 0.8, 1.1);
      flowerMesh.castShadow = true;
      buildingGroup.add(flowerMesh);
    });

    // Park Pathway Bollard Lights (Flanking the grand promenade)
    const bollardCoords = [
      [-2.6, 2.2], [2.6, 2.2],
      [-2.6, 4.5], [2.6, 4.5],
      [-2.6, 7.0], [2.6, 7.0],
      [-2.6, 9.5], [2.6, 9.5],
      [4.2, 6.8], [6.2, 4.5],
    ];
    const bollardMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
    const bollardGlowMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });

    bollardCoords.forEach(([bx, bz]) => {
      const bPost = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.45, 8), bollardMat);
      bPost.position.set(bx, 0.25, bz);
      buildingGroup.add(bPost);

      const bHead = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.1, 8), bollardGlowMat);
      bHead.position.set(bx, 0.48, bz);
      buildingGroup.add(bHead);
    });

    // --- 8. High-Quality 3D Executive Parking Lot & Luxury 3D Vehicles ---
    const parkingGroup = new THREE.Group();
    parkingGroup.position.set(-8.8, 0, -2.8);

    // Dark Executive Asphalt Parking Pad
    const parkingPad = createOutlinedBox(6.8, 0.08, 8.8, asphaltMat);
    parkingPad.group.position.set(0, 0.05, 0);
    parkingGroup.add(parkingPad.group);

    // Concrete Surrounding Curbs
    const pCurbNorth = createOutlinedBox(6.8, 0.14, 0.16, curbMat);
    pCurbNorth.group.position.set(0, 0.1, -4.4);
    parkingGroup.add(pCurbNorth.group);

    const pCurbSouth = createOutlinedBox(6.8, 0.14, 0.16, curbMat);
    pCurbSouth.group.position.set(0, 0.1, 4.4);
    parkingGroup.add(pCurbSouth.group);

    const pCurbWest = createOutlinedBox(0.16, 0.14, 8.8, curbMat);
    pCurbWest.group.position.set(-3.4, 0.1, 0);
    parkingGroup.add(pCurbWest.group);

    // 4 Painted Parking Bay Markings & Concrete Wheel Stops
    const bayZCoords = [-3.0, -1.0, 1.0, 3.0];
    bayZCoords.forEach((bz) => {
      // White Line Divider
      const pLine = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.015, 0.08), roadPaintMat);
      pLine.position.set(0.6, 0.1, bz - 1.0);
      parkingGroup.add(pLine);

      // Wheel Stop Block
      const wheelStop = createOutlinedBox(0.14, 0.1, 1.6, curbMat);
      wheelStop.group.position.set(-1.0, 0.12, bz);
      wheelStop.group.rotation.y = Math.PI / 2;
      parkingGroup.add(wheelStop.group);
    });
    // End line
    const lastPLine = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.015, 0.08), roadPaintMat);
    lastPLine.position.set(0.6, 0.1, 4.0);
    parkingGroup.add(lastPLine);

    // Modern High-Tech EV Charging Station
    const evCharger = createOutlinedBox(0.3, 1.3, 0.45, darkAccentMat);
    evCharger.group.position.set(-2.8, 0.65, 3.0);
    parkingGroup.add(evCharger.group);

    const evLedGeo = new THREE.BoxGeometry(0.04, 0.6, 0.08);
    const evLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const evLedMesh = new THREE.Mesh(evLedGeo, evLedMat);
    evLedMesh.position.set(-2.63, 0.75, 3.0);
    parkingGroup.add(evLedMesh);

    // Modern Parking Lot LED Light Poles
    [-3.0, 2.5].forEach((pz) => {
      const pPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.065, 2.8, 8), lanternPoleMat);
      pPole.position.set(-3.2, 1.4, pz);
      parkingGroup.add(pPole);

      const pHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.22), lanternPoleMat);
      pHead.position.set(-2.95, 2.78, pz);
      parkingGroup.add(pHead);

      if (!isMobileDevice) {
        const pLight = new THREE.PointLight(0xfff6e8, 1.6, 7.5, 1.6);
        pLight.position.set(-2.9, 2.65, pz);
        parkingGroup.add(pLight);
      }
    });

    // Executive Parking Pylon Sign
    const parkPylon = createOutlinedBox(0.2, 1.3, 0.5, darkAccentMat);
    parkPylon.group.position.set(3.2, 0.65, 3.8);
    parkingGroup.add(parkPylon.group);

    const pSignGeo = new THREE.BoxGeometry(0.22, 0.35, 0.35);
    const pSignMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const pSignMesh = new THREE.Mesh(pSignGeo, pSignMat);
    pSignMesh.position.set(3.2, 1.05, 3.8);
    parkingGroup.add(pSignMesh);

    // Procedural High-Quality 3D Luxury Vehicles
    const createDetailed3DCar = (
      cz: number,
      paintMat: THREE.Material,
      carStyle: 'sedan' | 'suv' | 'coupe' | 'ev'
    ) => {
      const carGroup = new THREE.Group();
      carGroup.position.set(0.6, 0.15, cz);

      // Chassis & Body
      const bodyLength = carStyle === 'suv' ? 3.4 : 3.6;
      const bodyWidth = 1.65;
      const bodyHeight = carStyle === 'suv' ? 0.6 : 0.45;

      const bodyGeo = new THREE.BoxGeometry(bodyLength, bodyHeight, bodyWidth);
      const bodyMesh = new THREE.Mesh(bodyGeo, paintMat);
      bodyMesh.position.y = bodyHeight / 2 + 0.12;
      bodyMesh.castShadow = true;
      carGroup.add(bodyMesh);

      // Cabin Greenhouse
      const cabinLength = carStyle === 'suv' ? 2.3 : carStyle === 'coupe' ? 1.7 : 2.0;
      const cabinHeight = carStyle === 'suv' ? 0.52 : 0.42;
      const cabinWidth = 1.4;

      const cabinGeo = new THREE.BoxGeometry(cabinLength, cabinHeight, cabinWidth);
      const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
      cabinMesh.position.set(carStyle === 'coupe' ? -0.2 : -0.1, bodyHeight + cabinHeight / 2 + 0.1, 0);
      carGroup.add(cabinMesh);

      // 4 Detailed 3D Wheels with Rubber Tires & Alloy Rims
      const wheelOffsets = [
        [-bodyLength / 2 + 0.7, -bodyWidth / 2 - 0.05],
        [bodyLength / 2 - 0.7, -bodyWidth / 2 - 0.05],
        [-bodyLength / 2 + 0.7, bodyWidth / 2 + 0.05],
        [bodyLength / 2 - 0.7, bodyWidth / 2 + 0.05]
      ];
      wheelOffsets.forEach(([wx, wz]) => {
        const wheel = new THREE.Group();
        wheel.position.set(wx, 0.22, wz);
        wheel.rotation.x = Math.PI / 2;

        const tireGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 16);
        const tireMesh = new THREE.Mesh(tireGeo, carWheelMat);
        wheel.add(tireMesh);

        const rimGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.17, 12);
        const rimMesh = new THREE.Mesh(rimGeo, carRimMat);
        wheel.add(rimMesh);

        carGroup.add(wheel);
      });

      // Front Headlights
      const hlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.28), carLightFront);
      hlLeft.position.set(bodyLength / 2 + 0.01, bodyHeight / 2 + 0.16, -bodyWidth / 2 + 0.26);
      carGroup.add(hlLeft);

      const hlRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.28), carLightFront);
      hlRight.position.set(bodyLength / 2 + 0.01, bodyHeight / 2 + 0.16, bodyWidth / 2 - 0.26);
      carGroup.add(hlRight);

      // Rear Taillights
      const tlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.32), carLightRear);
      tlLeft.position.set(-bodyLength / 2 - 0.01, bodyHeight / 2 + 0.18, -bodyWidth / 2 + 0.26);
      carGroup.add(tlLeft);

      const tlRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.32), carLightRear);
      tlRight.position.set(-bodyLength / 2 - 0.01, bodyHeight / 2 + 0.18, bodyWidth / 2 - 0.26);
      carGroup.add(tlRight);

      // SUV Roof Rails
      if (carStyle === 'suv') {
        const railGeo = new THREE.BoxGeometry(1.9, 0.05, 0.05);
        [-0.55, 0.55].forEach((rz) => {
          const rail = new THREE.Mesh(railGeo, carRimMat);
          rail.position.set(-0.1, bodyHeight + cabinHeight + 0.13, rz);
          carGroup.add(rail);
        });
      }

      parkingGroup.add(carGroup);
    };

    // 4 Distinct Luxury Cars Parked in the Bays
    const carPaintBlack = new THREE.MeshStandardMaterial({ color: 0x0a0f18, roughness: 0.14, metalness: 0.92 });
    const carPaintWhite = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.18, metalness: 0.45 });
    const carPaintGrey = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.18, metalness: 0.88 });
    const carPaintBlue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.18, metalness: 0.88 });

    createDetailed3DCar(-3.0, carPaintBlack, 'sedan');   // Executive Maybach-style Black Sedan
    createDetailed3DCar(-1.0, carPaintWhite, 'suv');     // Luxury Pearl White SUV
    createDetailed3DCar(1.0, carPaintGrey, 'coupe');     // Sports Metallic Grey Coupe
    createDetailed3DCar(3.0, carPaintBlue, 'ev');        // Sapphire Blue Electric Sedan

    buildingGroup.add(parkingGroup);

    // Center Building Group
    buildingGroup.position.set(0, -1.0, 0);

    // Majestic Scaled Presence (Significantly enlarged for impressive screen filling)
    buildingGroup.scale.set(1.26, 1.26, 1.26);

    // --- Drag Rotation Handlers ---
    let isDragging = false;
    let prevMouseX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      setIsUserInteracting(true);
      setIsAutoRotating(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      targetRotationRef.current += deltaX * 0.007;
      prevMouseX = e.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsUserInteracting(false), 600);
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        prevMouseX = touchStartX;
        setIsUserInteracting(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = Math.abs(currentX - touchStartX);
      const diffY = Math.abs(currentY - touchStartY);

      // Only rotate 3D model if user is explicitly dragging horizontally!
      if (diffX > diffY && diffX > 6) {
        isDragging = true;
        const deltaX = currentX - prevMouseX;
        targetRotationRef.current += deltaX * 0.007;
        prevMouseX = currentX;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsUserInteracting(false), 600);
    };

    const canvasElem = canvasRef.current;
    canvasElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // --- Responsive Pinned Scroll Sequence Math ---
    // Smooth scroll interpolation that gracefully unlocks when scrolled through (desktop only)
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (window.innerWidth < 768) {
        // On mobile, never trap or hijack scroll! Let user scroll past naturally
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Distance inside the section before unpinning
      const totalScrollableDistance = rect.height - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const scrolledPastTop = -rect.top;
      const rawProgress = scrolledPastTop / totalScrollableDistance;
      const p = Math.min(Math.max(rawProgress, 0), 1);

      scrollProgressRef.current = p;
      setScrollProgress(p);

      // Tour completed check
      const completed = p >= 0.92;
      setIsTourCompleted(completed);

      // Determine active phase index
      let phaseIdx = 0;
      if (p < 0.22) {
        phaseIdx = 0;
      } else if (p < 0.48) {
        phaseIdx = 1;
      } else if (p < 0.72) {
        phaseIdx = 2;
      } else if (p < 0.92) {
        phaseIdx = 3;
      } else {
        phaseIdx = 4;
      }
      setCurrentPhaseIndex(phaseIdx);

      // Camera Fly-in & Rotation Interpolation along the choreographed phases
      if (!isDragging) {
        const segmentCount = phases.length - 1; // 4 segments
        const segmentProgress = p * segmentCount;
        const currentSegment = Math.min(Math.floor(segmentProgress), segmentCount - 1);
        const t = segmentProgress - currentSegment;

        const kfA = phases[currentSegment];
        const kfB = phases[Math.min(currentSegment + 1, phases.length - 1)];

        // Smooth cubic ease interpolation
        const easeT = t * t * (3 - 2 * t);

        const interpCamX = kfA.camX + (kfB.camX - kfA.camX) * easeT;
        const interpCamY = kfA.camY + (kfB.camY - kfA.camY) * easeT;
        const interpCamZ = kfA.camZ + (kfB.camZ - kfA.camZ) * easeT;
        const interpLookY = kfA.targetY + (kfB.targetY - kfA.targetY) * easeT;
        const interpRotY = kfA.rotY + (kfB.rotY - kfA.rotY) * easeT;

        targetCamPosRef.current.set(interpCamX, interpCamY, interpCamZ);
        targetLookAtRef.current.set(0, interpLookY, 0);
        targetRotationRef.current = interpRotY;

        // Scale smoothly rises from distance (1.25 -> 1.33)
        const scaleVal = 1.25 + 0.08 * Math.min(p * 2, 1);
        buildingGroup.scale.set(scaleVal, scaleVal, scaleVal);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to completely halt rendering loop when 3D model is offscreen
    let isVisible = true;
    let isLoopRunning = false;
    let animId: number = 0;

    const startLoop = () => {
      if (!isLoopRunning && isVisible) {
        isLoopRunning = true;
        animId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (isLoopRunning) {
        isLoopRunning = false;
        cancelAnimationFrame(animId);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // --- Animation Render Loop with Living Environment ---
    const animate = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }
      animId = requestAnimationFrame(animate);

      const elapsedTime = performance.now() * 0.001;
      const isMobileNow = isMobileDevice || window.innerWidth < 768;

      if (!isMobileNow) {
        // Atmospheric rooftop candlelight flicker
        candleLights.forEach((light, i) => {
          light.intensity = 1.0 + Math.sin(elapsedTime * 7.0 + i * 1.7) * 0.22;
        });

        // Continuous subtle wind sway on volumetric tree crowns
        treesList.forEach((tree, idx) => {
          const sway = Math.sin(elapsedTime * 1.6 + idx * 0.8) * 0.012;
          tree.rotation.z = sway;
        });

        // Subtle water shimmer
        waterMat.roughness = 0.08 + Math.sin(elapsedTime * 2.0) * 0.02;
      }

      // Continuous 360-degree rotation on mobile as requested!
      if (isMobileNow) {
        if (!isDragging) {
          targetRotationRef.current += 0.005; // Elegant smooth 360° spin
        }
      } else if (isAutoRotatingRef.current && !isDragging) {
        targetRotationRef.current += 0.003;
      }

      // Smooth damping interpolation for building rotation
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * (isMobileNow ? 0.08 : 0.06);
      buildingGroup.rotation.y = currentRotationRef.current;

      // Smooth damping interpolation for camera position & target
      camera.position.lerp(targetCamPosRef.current, 0.06);
      camera.lookAt(targetLookAtRef.current);

      renderer.render(scene, camera);
    };

    startLoop();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!canvasWrapperRef.current || !renderer) return;
      const newW = canvasWrapperRef.current.clientWidth;
      const newH = canvasWrapperRef.current.clientHeight;

      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup & Complete GPU Memory Disposal ---
    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasElem.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      canvasElem.removeEventListener('touchend', onTouchEnd);

      // Deep dispose scene to prevent mobile WebGL context memory leaks
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m?.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        } else if (obj instanceof THREE.LineSegments) {
          obj.geometry?.dispose();
          if (obj.material) obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []); // Run ONCE on mount! Scene is never rebuilt on user interaction!

  // Jump camera directly to a selected phase
  const handleSelectPhase = (index: number) => {
    setCurrentPhaseIndex(index);
    const kf = phases[index];
    if (kf) {
      targetCamPosRef.current.set(kf.camX, kf.camY, kf.camZ);
      targetLookAtRef.current.set(0, kf.targetY, 0);
      targetRotationRef.current = kf.rotY;
    }
    // Only scroll window on desktop where scroll-driven tour is active
    if (window.innerWidth >= 768 && containerRef.current) {
      const targetP = index / (phases.length - 1);
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const totalScrollableDistance = containerRef.current.clientHeight - window.innerHeight;
      const targetScrollY = scrollTop + rect.top + targetP * totalScrollableDistance;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    }
  };

  // Skip / proceed directly to next section
  const handleScrollToNextSection = () => {
    const nextElem = document.getElementById('concept') || document.getElementById('layouts');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePhase = phases[currentPhaseIndex];

  return (
    <section 
      id="architecture-3d" 
      ref={containerRef}
      className="relative w-full h-[600px] sm:h-[680px] md:h-[220vh] bg-[#080d15] text-white"
    >
      {/* Pinned Sticky Viewport on desktop; natural unblocked section on mobile */}
      <div className="relative md:sticky md:top-0 h-full md:h-[100dvh] w-full flex flex-col justify-between overflow-hidden">
        
        {/* Subtle Architectural Grid Accent Lines in Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.14),rgba(255,255,255,0))] pointer-events-none" />
        <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

        {/* Top Header HUD Bar */}
        <header className="relative z-30 pt-4 sm:pt-6 md:pt-[calc(env(safe-area-inset-top,20px)+68px)] sm:md:pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 sm:backdrop-blur-md border border-slate-700/80 text-sky-400 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mb-1 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.model3d.badge}</span>
            </div>
            <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {t.model3d.title}
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 max-w-xl mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none">
              {t.model3d.subtitle}
            </p>
          </div>

          {/* Phase Indicators Tabs & Skip Button */}
          <div className="flex items-center gap-2 max-w-full overflow-hidden">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/95 sm:backdrop-blur-md border border-slate-800 shadow-xl overflow-x-auto no-scrollbar max-w-full">
              {phases.map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPhase(idx)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                    currentPhaseIndex === idx
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                  <span className="hidden sm:inline">{phase.badge.split('/')[1]?.trim() || phase.badge}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleScrollToNextSection}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors shadow-lg"
              title={t.model3d.btnSkip}
            >
              <span>{t.model3d.btnSkip}</span>
              <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>
        </header>

        {/* Main 3D Canvas Area */}
        <div 
          ref={canvasWrapperRef}
          className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden my-auto"
        >
          {/* WebGL 3D Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing outline-none block"
          />

          {/* Floating HUD: 3D Gesture Hint & Interactive Feedback */}
          <div className={`absolute top-2.5 left-3 sm:top-4 sm:left-8 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full sm:backdrop-blur-md border transition-all duration-300 text-[10px] sm:text-[11px] pointer-events-none max-w-[150px] sm:max-w-none ${
            isUserInteracting 
              ? 'bg-sky-950/95 border-sky-400/80 text-sky-200 shadow-lg shadow-sky-500/25 ring-1 ring-sky-400' 
              : 'bg-slate-900/95 border-slate-700/60 text-slate-300'
          }`}>
            <Move3d className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isUserInteracting ? 'text-sky-300 scale-125' : 'text-sky-400 animate-spin'}`} style={{ animationDuration: '8s' }} />
            <span className="truncate">
              {isUserInteracting ? t.model3d.hintInteracting : (
                <>
                  <span className="sm:hidden">Обзор 360°</span>
                  <span className="hidden sm:inline">{t.model3d.hintGesture}</span>
                </>
              )}
            </span>
          </div>

          {/* Floating HUD: Status of the Tour */}
          <div className="absolute top-2.5 right-3 sm:top-4 sm:right-8 z-20 flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/95 sm:backdrop-blur-md border border-slate-700/60 text-[10px] sm:text-[11px] font-semibold text-slate-200">
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${isTourCompleted ? 'bg-sky-400' : 'bg-emerald-400 animate-pulse'}`} />
            <span>
              {isTourCompleted ? (
                <>
                  <span className="sm:hidden">Финал тура</span>
                  <span className="hidden sm:inline">{t.model3d.statusDone}</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">3D-обзор</span>
                  <span className="hidden sm:inline">{t.model3d.statusDynamic}</span>
                </>
              )}
            </span>
          </div>

          {/* Central Scroll Progress Indicator (Left Vertical Bar on Desktop) */}
          <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2">
            <div className="w-1 h-32 bg-slate-800 rounded-full overflow-hidden relative">
              <div 
                className="w-full bg-gradient-to-b from-sky-400 to-sky-600 rounded-full transition-all duration-150"
                style={{ height: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Bottom Architectural Info Card & Call to Action */}
        <footer className="relative z-30 pb-[calc(env(safe-area-inset-bottom,16px)+14px)] sm:pb-8 px-3 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900/95 sm:backdrop-blur-md border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            
            {/* Active Phase Information */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-sky-500/30 shrink-0">
                  {activePhase.badge}
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{activePhase.focusPoint}</span>
                </span>
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white leading-tight truncate">
                {activePhase.title}
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-400 mt-0.5 sm:mt-1 max-w-3xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                {activePhase.desc}
              </p>
            </div>

            {/* Actions & Scroll Hint */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full md:w-auto justify-end pt-1 md:pt-0 border-t border-slate-800 md:border-t-0">
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="hidden sm:flex px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] sm:text-xs font-medium border border-slate-700 transition-colors items-center gap-1.5 active:scale-95"
                title={isAutoRotating ? t.model3d.btnAutoStop : t.model3d.btnAutoStart}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <span>{isAutoRotating ? t.model3d.btnAutoStop : t.model3d.btnAutoStart}</span>
              </button>

              {isTourCompleted ? (
                <button
                  onClick={handleScrollToNextSection}
                  className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95 text-center"
                >
                  <span>{t.model3d.btnContinue}</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl sky-gradient-bg text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:brightness-110 active:scale-95 transition-all text-center"
                >
                  {t.model3d.btnBookVisit}
                </button>
              )}
            </div>
          </div>

          {/* Scroll Down Prompt */}
          <div className="mt-2 sm:mt-3 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium">
            {isTourCompleted ? (
              <span className="text-sky-400 font-semibold flex items-center gap-1 cursor-pointer" onClick={handleScrollToNextSection}>
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{t.model3d.scrollHintDone}</span>
              </span>
            ) : (
              <>
                <span className="sm:hidden flex items-center gap-1 text-sky-400/90 font-medium">
                  <RotateCw className="w-3 h-3 text-sky-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{t.model3d.scrollHintMobile}</span>
                </span>
                <span className="hidden sm:inline">{t.model3d.scrollHint}</span>
              </>
            )}
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce text-sky-400 shrink-0" />
          </div>
        </footer>
      </div>
    </section>
  );
};
