/* Ocean1Gutters — cinematic 3D story scene (Three.js r128 + bloom). Loaded lazily by main.js.
   A rendered South Florida home with barrel-tile roof, stucco walls, impact windows, seamless gutters,
   palms, storm rain and water running through the gutters. The camera is driven by scroll progress
   (window.O1G_story.progress, 0→1) through five "shots", with pointer parallax and idle drift. */
(function () {
  "use strict";
  if (!window.THREE) return;
  const T = window.THREE;
  const host = document.querySelector("[data-scene]");
  if (!host) return;
  const isMobile = window.innerWidth < 760;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const story = (window.O1G_story = window.O1G_story || { progress: 0 });
  const DBG = location.search; // debug flags: nobloom, noshadow, nofog, noenv, notone

  /* ---------- Procedural textures (canvas) ---------- */
  function canvasTex(w, h, draw, repeat) {
    const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h);
    const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; if (repeat) t.repeat.set(repeat[0], repeat[1]); t.anisotropy = 4; return t;
  }
  const noise = (ctx, w, h, base, amp, n) => { for (let i = 0; i < n; i++) { const v = base + (Math.random() - 0.5) * amp; ctx.fillStyle = `rgb(${v},${v},${v})`; ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2); } };
  const stuccoBump = canvasTex(512, 512, (c, w, h) => { c.fillStyle = "#808080"; c.fillRect(0, 0, w, h); noise(c, w, h, 128, 90, 60000); }, [4, 2]);
  const grassMap = canvasTex(512, 512, (c, w, h) => { c.fillStyle = "#17522f"; c.fillRect(0, 0, w, h); for (let i = 0; i < 40000; i++) { c.fillStyle = `hsl(${112 + Math.random() * 25}, ${38 + Math.random() * 20}%, ${12 + Math.random() * 14}%)`; c.fillRect(Math.random() * w, Math.random() * h, 2, 4); } }, [40, 40]);
  const paverMap = canvasTex(512, 512, (c, w, h) => { c.fillStyle = "#8a8275"; c.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 64) for (let x = (y / 64) % 2 ? 48 : 0; x < w + 96; x += 96) { c.fillStyle = `hsl(30, ${10 + Math.random() * 10}%, ${44 + Math.random() * 12}%)`; c.fillRect(x - 96 + 3, y + 3, 90, 58); } }, [1.2, 5]);
  const tileMap = canvasTex(256, 256, (c, w, h) => { const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, "#6a2f1c"); g.addColorStop(0.5, "#a9512f"); g.addColorStop(1, "#73351f"); c.fillStyle = g; c.fillRect(0, 0, w, h); noise(c, w, h, 150, 120, 6000); }, [1, 1]);
  const barkMap = canvasTex(128, 256, (c, w, h) => { c.fillStyle = "#6e4b2f"; c.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 14) { c.fillStyle = `rgba(40,25,10,${0.25 + Math.random() * 0.3})`; c.fillRect(0, y, w, 5); } }, [1, 3]);
  const frondMap = canvasTex(256, 512, (c, w, h) => { c.clearRect(0, 0, w, h); c.strokeStyle = "#3a7d49"; c.lineWidth = 6; c.beginPath(); c.moveTo(w / 2, h); c.lineTo(w / 2, 10); c.stroke(); for (let y = 20; y < h - 10; y += 11) { const len = 28 + 94 * Math.sin((y / h) * Math.PI); c.fillStyle = `hsl(${116 + Math.random() * 18}, 46%, ${20 + Math.random() * 12}%)`; for (const d of [-1, 1]) { c.beginPath(); c.moveTo(w / 2, y + 5); c.lineTo(w / 2 + d * len, y - 30); c.lineTo(w / 2 + d * (len * 0.9), y - 22); c.lineTo(w / 2, y + 11); c.closePath(); c.fill(); } } });
  frondMap.wrapS = frondMap.wrapT = T.ClampToEdgeWrapping;
  const rainSprite = canvasTex(16, 64, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "rgba(200,235,255,0)"); g.addColorStop(0.5, "rgba(210,240,255,.9)"); g.addColorStop(1, "rgba(200,235,255,0)"); c.fillStyle = g; c.fillRect(6, 0, 4, h); });
  const cloudSprite = canvasTex(256, 256, (c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(0.5, "rgba(255,255,255,.35)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, w, h); });

  /* ---------- Renderer ---------- */
  const renderer = new T.WebGLRenderer({ antialias: !isMobile, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.shadowMap.enabled = !/noshadow/.test(DBG); renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.outputEncoding = T.sRGBEncoding; renderer.toneMapping = /notone/.test(DBG) ? T.NoToneMapping : T.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.78;
  renderer.domElement.className = "hero__canvas"; host.appendChild(renderer.domElement);

  const scene = new T.Scene();
  scene.fog = new T.FogExp2(0x2a5587, 0.024);
  const camera = new T.PerspectiveCamera(32, 1, 0.1, 200);

  /* ---------- Sky ---------- */
  const skyMat = new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false,
    uniforms: { top: { value: new T.Color(0x0b2a52) }, mid: { value: new T.Color(0x3d8ad0) }, bottom: { value: new T.Color(0xf0c9a0) }, sunDir: { value: new T.Vector3(0.55, 0.5, 0.65).normalize() }, storm: { value: 0 } },
    vertexShader: "varying vec3 vW; void main(){ vW = (modelMatrix * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: "uniform vec3 top, mid, bottom, sunDir; uniform float storm; varying vec3 vW; void main(){ vec3 d = normalize(vW); float h = clamp(d.y, -0.05, 1.0); vec3 c = mix(bottom, mid, smoothstep(0.0, 0.25, h)); c = mix(c, top, smoothstep(0.2, 0.9, h)); float s = pow(max(dot(d, sunDir), 0.0), 220.0); c += vec3(1.0, 0.85, 0.6) * s * (1.0 - storm) * 1.6; c = mix(c, vec3(0.30, 0.36, 0.44), storm * 0.7); gl_FragColor = vec4(c, 1.0); }",
  });
  scene.add(new T.Mesh(new T.SphereGeometry(120, 32, 16), skyMat));
  const clouds = new T.Group(); scene.add(clouds);
  for (let i = 0; i < (isMobile ? 6 : 12); i++) {
    const s = new T.Sprite(new T.SpriteMaterial({ map: cloudSprite, transparent: true, opacity: 0.35 + Math.random() * 0.3, depthWrite: false }));
    s.position.set((Math.random() - 0.5) * 80, 14 + Math.random() * 10, -30 - Math.random() * 40); s.scale.set(18 + Math.random() * 16, 7 + Math.random() * 5, 1); clouds.add(s);
  }

  /* ---------- Lights ---------- */
  const hemi = new T.HemisphereLight(0xbcd8f5, 0x24452f, 0.55); scene.add(hemi);
  const sun = new T.DirectionalLight(0xffe9c8, 2.4); sun.position.set(9, 14, 11); sun.castShadow = true;
  const fill = new T.DirectionalLight(0x9fc4ea, 0.35); fill.position.set(-10, 6, 4); scene.add(fill);
  sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048); sun.shadow.radius = 4;
  Object.assign(sun.shadow.camera, { left: -24, right: 24, top: 24, bottom: -24, near: 1, far: 60 }); sun.shadow.bias = -0.0006; scene.add(sun);
  const porch = new T.PointLight(0xffc27a, 0.0, 9, 2); porch.position.set(0.3, 2.3, 2.9); scene.add(porch);
  const rim = new T.PointLight(0x19c3b1, 0.6, 20, 2); rim.position.set(-6, 3, -4); scene.add(rim);

  /* ---------- Environment for reflections ---------- */
  const pmrem = new T.PMREMGenerator(renderer);
  const envScene = new T.Scene(); envScene.add(new T.Mesh(new T.SphereGeometry(50, 16, 8), skyMat.clone()));
  envScene.add(new T.HemisphereLight(0xffffff, 0x444444, 1));
  if (/useenv/.test(DBG)) { scene.environment = pmrem.fromScene(envScene, 0.04).texture; } pmrem.dispose(); // PMREM env disabled by default: unreliable on some GPUs, blacks out lighting

  /* ---------- Materials ---------- */
  const M = {
    wall: new T.MeshStandardMaterial({ color: 0xe9dfcc, roughness: 0.95, bumpMap: stuccoBump, bumpScale: 0.012 }),
    trim: new T.MeshStandardMaterial({ color: 0xfcfaf4, roughness: 0.6 }),
    tile: new T.MeshStandardMaterial({ map: tileMap, roughness: 0.8, metalness: 0.02 }),
    gutter: new T.MeshStandardMaterial({ color: 0xf3f3f0, roughness: 0.35, metalness: 0.25 }),
    glass: new T.MeshStandardMaterial({ color: 0x7fb5dd, roughness: 0.15, metalness: 0.1, emissive: 0x1d4b78, emissiveIntensity: 0.25 }),
    frame: new T.MeshStandardMaterial({ color: 0x2b2f33, roughness: 0.5, metalness: 0.4 }),
    door: new T.MeshStandardMaterial({ color: 0x2c2420, roughness: 0.55, metalness: 0.1 }),
    ground: new T.MeshStandardMaterial({ map: grassMap, roughness: 1 }),
    paver: new T.MeshStandardMaterial({ map: paverMap, roughness: 0.9 }),
    trunk: new T.MeshStandardMaterial({ map: barkMap, roughness: 1 }),
    frond: new T.MeshStandardMaterial({ map: frondMap, transparent: true, alphaTest: 0.4, side: T.DoubleSide, roughness: 0.9 }),
    shrub: new T.MeshStandardMaterial({ color: 0x1f5c36, roughness: 1 }),
    water: new T.MeshStandardMaterial({ color: 0x9ff0e6, emissive: 0x19c3b1, emissiveIntensity: 1.6, roughness: 0.1 }),
  };

  const house = new T.Group(); scene.add(house);
  const add = (geo, mat, x, y, z, parent = house, cast = true) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = true; parent.add(m); return m; };

  /* ---------- Ground, driveway ---------- */
  const ground = add(new T.CircleGeometry(60, 64), M.ground, 0, 0, 0, scene, false); ground.rotation.x = -Math.PI / 2;
  const drive = add(new T.PlaneGeometry(3.2, 9), M.paver, 2.4, 0.01, 6.2, scene, false); drive.rotation.x = -Math.PI / 2;
  const walk = add(new T.PlaneGeometry(1.1, 3.2), M.paver, 0, 0.01, 3.9, scene, false); walk.rotation.x = -Math.PI / 2;

  /* ---------- House body ---------- */
  const W = 7.2, H = 3.1, D = 5.0, RISE = 1.55;
  add(new T.BoxGeometry(W, H, D), M.wall, 0, H / 2, 0);
  add(new T.BoxGeometry(W + 0.5, 0.12, D + 0.5), M.trim, 0, 0.06, 0); // slab edge
  // Gable ends
  const gable = new T.Shape(); gable.moveTo(-D / 2, 0); gable.lineTo(D / 2, 0); gable.lineTo(0, RISE); gable.closePath();
  for (const s of [1, -1]) { const g = add(new T.ExtrudeGeometry(gable, { depth: 0.06, bevelEnabled: false }), M.wall, s * (W / 2 - 0.03), H, 0); g.rotation.y = Math.PI / 2; }
  // Roof slabs with instanced barrel tiles
  const pitch = Math.atan2(RISE, D / 2), slabLen = Math.hypot(RISE, D / 2) + 0.45;
  const tileGeo = new T.CylinderGeometry(0.11, 0.11, 0.3, 10, 1, false, 0, Math.PI); // half barrel
  const cols = Math.ceil((W + 1.0) / 0.2), rows = Math.ceil(slabLen / 0.3);
  for (const s of [1, -1]) {
    const slab = new T.Group(); slab.position.set(0, H + RISE / 2 + 0.1, s * (D / 4 + 0.1)); slab.rotation.x = s * pitch; house.add(slab);
    const deck = add(new T.BoxGeometry(W + 1.0, 0.1, slabLen), M.trim, 0, 0, 0, slab); deck.material = new T.MeshStandardMaterial({ color: 0x6a3a26, roughness: 1 });
    const inst = new T.InstancedMesh(tileGeo, M.tile, cols * rows); inst.castShadow = true; inst.receiveShadow = true;
    const o = new T.Object3D(); let k = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      o.position.set(-(W + 1.0) / 2 + c * 0.2 + 0.1, 0.1, -slabLen / 2 + r * 0.3 + 0.15); o.rotation.set(Math.PI / 2, 0, 0); o.updateMatrix(); inst.setMatrixAt(k++, o.matrix);
    }
    slab.add(inst);
  }
  add(new T.CylinderGeometry(0.14, 0.14, W + 1.1, 12, 1, false, 0, Math.PI), M.tile, 0, H + RISE + 0.12, 0).rotation.z = Math.PI / 2; // ridge cap
  // Fascia + gutters + downspouts
  const gutterParts = [];
  for (const s of [1, -1]) {
    add(new T.BoxGeometry(W + 1.0, 0.24, 0.05), M.trim, 0, H + 0.02, s * (D / 2 + 0.22), house, false);
    gutterParts.push(add(new T.BoxGeometry(W + 1.1, 0.19, 0.24), M.gutter, 0, H - 0.04, s * (D / 2 + 0.36)));
    add(new T.BoxGeometry(W + 1.0, 0.02, 0.16), new T.MeshStandardMaterial({ color: 0x2b3a44, roughness: 0.9 }), 0, H + 0.06, s * (D / 2 + 0.36), house, false);
    for (const x of [-1, 1]) {
      gutterParts.push(add(new T.CylinderGeometry(0.07, 0.07, H - 0.3, 12), M.gutter, x * (W / 2 + 0.5), (H - 0.3) / 2, s * (D / 2 + 0.36)));
      const e = add(new T.CylinderGeometry(0.07, 0.07, 0.55, 12), M.gutter, x * (W / 2 + 0.5), 0.1, s * (D / 2 + 0.62)); e.rotation.x = Math.PI / 2; gutterParts.push(e);
    }
  }
  // Entry: recessed door with frame and sidelights
  add(new T.BoxGeometry(1.4, 2.3, 0.1), M.trim, 0, 1.15, D / 2 + 0.03, house, false);
  add(new T.BoxGeometry(1.0, 2.1, 0.08), M.door, 0, 1.05, D / 2 + 0.06, house, false);
  add(new T.BoxGeometry(0.14, 1.8, 0.06), M.glass, -0.6, 1.1, D / 2 + 0.07, house, false);
  add(new T.BoxGeometry(0.14, 1.8, 0.06), M.glass, 0.6, 1.1, D / 2 + 0.07, house, false);
  add(new T.SphereGeometry(0.04, 8, 8), new T.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 }), 0.36, 1.05, D / 2 + 0.12, house, false);
  // Windows: frame + glass + mullions
  function window_(x, y, z, w, h, rotY = 0) {
    const g = new T.Group(); g.position.set(x, y, z); g.rotation.y = rotY; house.add(g);
    add(new T.BoxGeometry(w + 0.16, h + 0.16, 0.08), M.frame, 0, 0, 0, g, false);
    add(new T.BoxGeometry(w, h, 0.05), M.glass, 0, 0, 0.03, g, false);
    add(new T.BoxGeometry(0.04, h, 0.06), M.frame, 0, 0, 0.04, g, false);
    add(new T.BoxGeometry(w, 0.04, 0.06), M.frame, 0, 0, 0.04, g, false);
  }
  window_(-2.3, 1.75, D / 2 + 0.02, 1.5, 1.2); window_(2.3, 1.75, D / 2 + 0.02, 1.5, 1.2);
  window_(W / 2 + 0.02, 1.75, -1.3, 1.3, 1.1, Math.PI / 2); window_(W / 2 + 0.02, 1.75, 1.3, 1.3, 1.1, Math.PI / 2);
  // Landscaping
  for (const [x, r] of [[-1.5, 0.55], [1.5, 0.55], [-3.1, 0.7], [3.1, 0.7], [-2.3, 0.4], [2.3, 0.4]]) { const b = add(new T.SphereGeometry(r, 12, 10), M.shrub, x, r * 0.75, D / 2 + 0.95, scene); b.scale.y = 0.75; }

  /* ---------- Palms ---------- */
  function palm(x, z, h, lean, fronds = 11) {
    const g = new T.Group(); g.position.set(x, 0, z); scene.add(g);
    const curve = new T.CatmullRomCurve3([new T.Vector3(0, 0, 0), new T.Vector3(lean * 0.3, h * 0.5, 0), new T.Vector3(lean, h, 0)]);
    const trunk = new T.Mesh(new T.TubeGeometry(curve, 10, 0.16, 8, false), M.trunk); trunk.castShadow = true; g.add(trunk);
    const top = curve.getPoint(1);
    for (let i = 0; i < fronds; i++) {
      const pivot = new T.Group(); pivot.position.copy(top); pivot.rotation.y = (i / fronds) * Math.PI * 2 + Math.random() * 0.3; g.add(pivot);
      const f = new T.Mesh(new T.PlaneGeometry(1.1, 2.6), M.frond); f.position.set(0, 0.55, 1.1); f.rotation.x = -Math.PI / 2 + 0.35 + Math.random() * 0.35; f.castShadow = true; pivot.add(f);
      pivot.userData.phase = Math.random() * Math.PI * 2;
    }
    g.userData.pivots = g.children.slice(1);
    return g;
  }
  const palms = [palm(-8.0, -3.0, 4.6, 0.4), palm(8.5, -6.5, 6.4, -0.4), palm(-3.5, -9.0, 5.2, 0.2, 9), palm(14.0, -4.0, 5.0, 0.3, 9)];

  /* ---------- Rain (streak sprites) ---------- */
  const RAIN = reduce ? 0 : isMobile ? 500 : 1800;
  const rainGeo = new T.BufferGeometry(); const rp = new Float32Array(RAIN * 3), rv = new Float32Array(RAIN);
  for (let i = 0; i < RAIN; i++) { rp[i * 3] = (Math.random() - 0.5) * 30; rp[i * 3 + 1] = Math.random() * 16; rp[i * 3 + 2] = (Math.random() - 0.5) * 26; rv[i] = 11 + Math.random() * 7; }
  rainGeo.setAttribute("position", new T.BufferAttribute(rp, 3));
  const rainMat = new T.PointsMaterial({ map: rainSprite, size: 0.32, transparent: true, opacity: 0.0, depthWrite: false, sizeAttenuation: true, blending: T.AdditiveBlending });
  scene.add(new T.Points(rainGeo, rainMat));

  /* ---------- Water through the gutter ---------- */
  const drops = []; const DROPS = reduce ? 0 : 36;
  for (let i = 0; i < DROPS; i++) { const d = new T.Mesh(new T.SphereGeometry(0.05, 8, 8), M.water); d.userData = { t: i / DROPS, side: i % 2 ? 1 : -1, lane: i % 4 < 2 ? 1 : -1 }; d.visible = false; scene.add(d); drops.push(d); }
  function placeDrop(d) {
    const { t, side, lane } = d.userData; const z = side * (D / 2 + 0.36), xEnd = lane * (W / 2 + 0.5);
    if (t < 0.6) { const u = t / 0.6; d.position.set(lane * u * (W / 2 + 0.5), H + 0.05 - u * 0.03, z); }
    else if (t < 0.94) { const u = (t - 0.6) / 0.34; d.position.set(xEnd, (H - 0.15) * (1 - u) + 0.12, z); }
    else { const u = (t - 0.94) / 0.06; d.position.set(xEnd, 0.1 - u * 0.06, z + side * (0.3 + u * 0.6)); }
  }

  /* ---------- Post-processing (bloom) ---------- */
  let composer = null, bloom = null;
  if (T.EffectComposer && !isMobile && !/nobloom/.test(location.search)) {
    composer = new T.EffectComposer(renderer); composer.addPass(new T.RenderPass(scene, camera));
    bloom = new T.UnrealBloomPass(new T.Vector2(1, 1), 0.35, 0.6, 0.85); composer.addPass(bloom);
    if (T.GammaCorrectionShader) composer.addPass(new T.ShaderPass(T.GammaCorrectionShader)); // composer targets are linear: convert to sRGB at the end
  }

  /* ---------- Camera shots (keyframes along the scroll story) ---------- */
  const V = (x, y, z) => new T.Vector3(x, y, z);
  const SHOTS = [
    { at: 0.00, pos: V(13.5, 4.6, 17.0), look: V(1.0, 1.8, 0), fov: 30, storm: 0.05, rain: 0.0, sunI: 1.6, porch: 0.2, fog: 0.022 },
    { at: 0.22, pos: V(7.0, 5.2, 9.0), look: V(0.6, 2.6, 0.5), fov: 30, storm: 0.7, rain: 0.9, sunI: 0.95, porch: 0.6, fog: 0.03 },
    { at: 0.48, pos: V(6.4, 2.7, 7.0), look: V(1.6, 3.05, 2.7), fov: 26, storm: 0.75, rain: 0.8, sunI: 0.9, porch: 0.6, fog: 0.028 },
    { at: 0.72, pos: V(7.6, 1.9, 4.2), look: V(4.2, 0.9, 2.7), fov: 30, storm: 0.55, rain: 0.6, sunI: 1.0, porch: 0.8, fog: 0.026 },
    { at: 1.00, pos: V(-8.0, 3.0, 11.0), look: V(0.2, 1.7, 0.2), fov: 33, storm: 0.15, rain: 0.05, sunI: 1.1, porch: 1.4, fog: 0.025 },
  ];
  const smooth = (x) => x * x * (3 - 2 * x);
  const cur = { pos: V(0, 0, 0), look: V(0, 0, 0), fov: 30, storm: 0, rain: 0, sunI: 1, porch: 0, fog: 0.02 };
  function sample(p) {
    let i = 0; while (i < SHOTS.length - 2 && p > SHOTS[i + 1].at) i++;
    const a = SHOTS[i], b = SHOTS[i + 1], u = smooth(Math.min(1, Math.max(0, (p - a.at) / (b.at - a.at))));
    cur.pos.lerpVectors(a.pos, b.pos, u); cur.look.lerpVectors(a.look, b.look, u);
    for (const k of ["fov", "storm", "rain", "sunI", "porch", "fog"]) cur[k] = a[k] + (b[k] - a[k]) * u;
  }
  sample(0); camera.position.copy(cur.pos);

  /* ---------- Interaction ---------- */
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 }; let visible = true; const t0 = performance.now();
  if (!isMobile) window.addEventListener("pointermove", (e) => { ptr.tx = (e.clientX / window.innerWidth - 0.5) * 2; ptr.ty = (e.clientY / window.innerHeight - 0.5) * 2; }, { passive: true });
  if ("IntersectionObserver" in window) new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(host);
  function resize() {
    const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h, false); if (composer) composer.setSize(w, h);
    camera.aspect = w / h; camera.setViewOffset(w, h, w > 1000 ? -w * 0.08 : 0, h * 0.03, w, h); camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize); resize();

  const skyDay = { top: new T.Color(0x0b2a52), mid: new T.Color(0x2f7cc0), bottom: new T.Color(0xd9b891) };
  const skyDusk = { top: new T.Color(0x0a1a3a), mid: new T.Color(0x2b5f8f), bottom: new T.Color(0xffa36b) };
  const tmpLook = V(0, 0, 0), tmpPos = V(0, 0, 0), tmpC = new T.Color();

  let last = performance.now(), fpsFrames = 0, fpsStart = 0, degraded = false;
  function degrade() {
    degraded = true;
    if (composer) { composer = null; bloom = null; }
    renderer.setPixelRatio(1); resize();
  }
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.1, Math.max(0, (now - last) / 1000)); last = now;
    if (!visible || document.hidden) return;
    if (!degraded) { if (!fpsStart) fpsStart = now; fpsFrames++; const el = now - fpsStart; if (el > 2500) { if (fpsFrames / (el / 1000) < 28) degrade(); else degraded = true; } }
    const k = 1 - Math.pow(1 - 0.08, dt * 60), kp = 1 - Math.pow(1 - 0.05, dt * 60);
    const t = (now - t0) / 1000, p = Math.min(1, Math.max(0, story.progress || 0));
    sample(p);
    ptr.x += (ptr.tx - ptr.x) * kp; ptr.y += (ptr.ty - ptr.y) * kp;
    const drift = reduce ? 0 : 1;
    tmpPos.copy(cur.pos); tmpPos.x += Math.sin(t * 0.17) * 0.5 * drift + ptr.x * 0.9; tmpPos.y += Math.cos(t * 0.13) * 0.18 * drift - ptr.y * 0.4; tmpPos.z += Math.cos(t * 0.1) * 0.35 * drift;
    camera.position.lerp(tmpPos, k);
    tmpLook.copy(cur.look); tmpLook.x += ptr.x * 0.3; tmpLook.y -= ptr.y * 0.18; camera.lookAt(tmpLook);
    if (Math.abs(camera.fov - cur.fov) > 0.02) { camera.fov += (cur.fov - camera.fov) * k; camera.updateProjectionMatrix(); }

    // Weather + light
    skyMat.uniforms.storm.value = cur.storm;
    const dusk = p > 0.8 ? (p - 0.8) / 0.2 : 0;
    skyMat.uniforms.top.value.copy(skyDay.top).lerp(skyDusk.top, dusk); skyMat.uniforms.mid.value.copy(skyDay.mid).lerp(skyDusk.mid, dusk); skyMat.uniforms.bottom.value.copy(skyDay.bottom).lerp(skyDusk.bottom, dusk);
    sun.intensity = cur.sunI * 1.5; sun.color.copy(tmpC.set(0xfff0d8).lerp(new T.Color(0xffb27a), dusk));
    hemi.intensity = 0.55 - cur.storm * 0.15; fill.intensity = 0.35 + cur.porch * 0.2; porch.intensity = cur.porch; if (scene.fog) scene.fog.density = cur.fog;
    if (scene.fog) scene.fog.color.copy(tmpC.set(0x2a5587).lerp(new T.Color(0x4a5866), cur.storm));
    if (/nofog/.test(DBG)) scene.fog = null;
    M.glass.emissiveIntensity = 0.25 + cur.porch * 0.6;
    rainMat.opacity = cur.rain * 0.55;
    if (RAIN && cur.rain > 0.01) { const a = rainGeo.attributes.position.array; for (let i = 0; i < RAIN; i++) { a[i * 3 + 1] -= rv[i] / 60; a[i * 3] -= 1.5 / 60; if (a[i * 3 + 1] < 0) { a[i * 3 + 1] = 15 + Math.random() * 2; a[i * 3] = (Math.random() - 0.5) * 30; } } rainGeo.attributes.position.needsUpdate = true; }
    const flow = cur.rain > 0.15;
    for (const d of drops) { d.visible = flow; if (flow) { d.userData.t = (d.userData.t + 0.005) % 1; placeDrop(d); } }
    for (const pl of palms) for (const pv of pl.userData.pivots) pv.rotation.z = Math.sin(t * 1.6 + pv.userData.phase) * (0.04 + cur.storm * 0.12) * drift;
    clouds.position.x = (t * 0.3) % 20;
    if (bloom) bloom.strength = 0.25 + cur.porch * 0.25;
    if (composer) composer.render(); else renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);

  window.O1G_scene = { setGutterColor(hex) { M.gutter.color.set(hex); M.gutter.metalness = 0.25; } };
  host.classList.add("is-ready");
})();
