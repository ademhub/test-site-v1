/**
 * model3d.js — Chargeur 3D avec animation d'entrée cinématique
 *
 * POUR UTILISER TON MODELE :
 *   1. Place ton fichier dans  public/
 *   2. Renomme-le  model.glb   (ou change MODEL_PATH ci-dessous)
 *   Formats supportés : .glb  .gltf
 */

import * as THREE            from 'three';
import { GLTFLoader }        from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls }     from 'three/addons/controls/OrbitControls.js';

const MODEL_PATH = 'public/model.glb';

const wrap = document.getElementById('model3d-wrap');
if (wrap) init(wrap);

/* ─── Easing ─────────────────────────────────── */
function easeOutExpo(t)  { return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOutSine(t){ return -(Math.cos(Math.PI * t) - 1) / 2; }

/* ─── Main ───────────────────────────────────── */
function init(wrap) {

  /* Renderer — fond transparent (le dégradé CSS reste visible) */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace   = THREE.SRGBColorSpace;
  renderer.toneMapping        = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled  = true;
  renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
  wrap.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  /* ── Caméra ── */
  const CAM_START  = new THREE.Vector3(1.8, -0.8, 1.4); // angle dramatique initial
  const CAM_TARGET = new THREE.Vector3(0,  0.2,  4.6);  // position finale (plus loin = modèle plus petit)
  const CAM_LOOK   = new THREE.Vector3(0,  0.15, 0);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 200);
  camera.position.copy(CAM_START);
  camera.lookAt(CAM_LOOK);

  /* ── Lumières — palette rose/violet brand ── */
  scene.add(new THREE.AmbientLight(0xfff0ff, 0.5));

  const keyLight = new THREE.DirectionalLight(0xfff0ff, 1.3);
  keyLight.position.set(1.5, 3, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  /* Lumières colorées — intensité 0 au départ, montent pendant l'entrée */
  const pinkLight = new THREE.PointLight(0xff79a1, 0, 12);
  pinkLight.position.set(-2.8, 1.8, 2.2);
  scene.add(pinkLight);

  const purpleLight = new THREE.PointLight(0xc084fc, 0, 12);
  purpleLight.position.set(2.8, -1.2, 2.2);
  scene.add(purpleLight);

  const backLight = new THREE.PointLight(0xa78bfa, 1.1, 9);
  backLight.position.set(0, 0, -3);
  scene.add(backLight);

  /* ── OrbitControls — désactivés pendant l'entrée ── */
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled       = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enableZoom    = false;
  controls.enablePan     = false;
  controls.autoRotate    = true;
  controls.autoRotateSpeed = 1.5;
  controls.minPolarAngle = Math.PI * 0.18;
  controls.maxPolarAngle = Math.PI * 0.75;
  controls.target.copy(CAM_LOOK);

  /* ── Champ de particules flottantes ── */
  const particles = createParticles();
  scene.add(particles.points);

  /* ── Chargement du modèle ── */
  const loadingEl = document.getElementById('model3d-loading');
  const state = {
    modelLoaded:    false,
    entranceStart:  null,   // horodatage Three.js du début de l'entrée modèle
    modelMats:      [],
    modelTargetY:   0,
    mixer:          null,
  };

  new GLTFLoader().load(
    MODEL_PATH,

    /* onLoad */
    function (gltf) {
      const model = gltf.scene;

      /* Centrage + mise à l'échelle automatique */
      const box    = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 1.8 / maxDim;

      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      model.position.y -= size.y * scale * 0.08;

      /* Position de départ : sous le cadre */
      state.modelTargetY  = model.position.y;
      model.position.y   -= 2.8;

      /* Matériaux : départ transparent, se révèlent pendant l'entrée */
      model.traverse(function (node) {
        if (!node.isMesh) return;
        node.castShadow    = true;
        node.receiveShadow = true;
        const arr = Array.isArray(node.material) ? node.material : [node.material];
        arr.forEach(function (m) {
          m.transparent = true;
          m.opacity     = 0;
          state.modelMats.push(m);
        });
      });

      scene.add(model);
      state.model = model;

      /* Animations intégrées au modèle, si présentes */
      if (gltf.animations && gltf.animations.length) {
        state.mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(function (clip) {
          state.mixer.clipAction(clip).play();
        });
      }

      state.modelLoaded = true;

      if (loadingEl) {
        loadingEl.style.transition = 'opacity .4s';
        loadingEl.style.opacity    = '0';
        setTimeout(function () { if (loadingEl.parentNode) loadingEl.remove(); }, 500);
      }
    },

    /* onProgress */
    function (xhr) {
      if (loadingEl && xhr.total) {
        loadingEl.textContent = Math.round(xhr.loaded / xhr.total * 100) + '%';
      }
    },

    /* onError */
    function (err) {
      console.warn('[model3d] Fichier introuvable :', MODEL_PATH, err);
      if (loadingEl) {
        loadingEl.innerHTML =
          '<span style="color:#ff79a1;font-size:.8rem;line-height:1.6;text-align:center">' +
          '⚠️ Place ton fichier<br><strong>public/model.glb</strong></span>';
      }
    }
  );

  /* ── Redimensionnement ── */
  function resize() {
    var w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── Boucle de rendu ── */
  var clock        = new THREE.Clock();
  var camProgress  = 0;
  var CAM_DURATION = 2.4;  /* durée du mouvement de caméra en secondes */
  var lightsIn     = 0;

  function animate() {
    requestAnimationFrame(animate);
    var dt = clock.getDelta();
    var t  = clock.getElapsedTime();

    /* Phase 1 — Mouvement de caméra cinématique */
    if (camProgress < 1) {
      camProgress = Math.min(1, camProgress + dt / CAM_DURATION);
      var camEase = easeOutExpo(camProgress);
      camera.position.lerpVectors(CAM_START, CAM_TARGET, camEase);
      camera.lookAt(CAM_LOOK);

      if (camProgress >= 1) {
        /* Passe le contrôle aux OrbitControls */
        controls.enabled = true;
        controls.update();
      }
    } else {
      controls.update();
    }

    /* Phase 2 — Révélation du modèle (déclenché dès qu'il est chargé) */
    if (state.modelLoaded) {
      if (state.entranceStart === null) state.entranceStart = t;
      var ep    = Math.min(1, (t - state.entranceStart) / 1.5);
      var eased = easeOutCubic(ep);

      /* Opacité 0 → 1 */
      state.modelMats.forEach(function (m) { m.opacity = eased; });

      /* Élévation depuis le bas */
      if (state.model) {
        state.model.position.y = (state.modelTargetY - 2.8) + 2.8 * eased;
      }

      /* Lumières colorées montent progressivement */
      if (lightsIn < 1) {
        lightsIn = ep;
        pinkLight.intensity   = lightsIn * 4.2;
        purpleLight.intensity = lightsIn * 3.2;
      }

      /* Animation mixer (animations intégrées au .glb) */
      if (state.mixer) state.mixer.update(dt);
    }

    /* Phase 3 — Dérive des particules (en continu) */
    var pos  = particles.points.geometry.attributes.position.array;
    var orig = particles.origPositions;
    for (var i = 0; i < particles.count; i++) {
      pos[i*3]   = orig[i*3]   + Math.cos(t * 0.32 + i * 0.25) * 0.08;
      pos[i*3+1] = orig[i*3+1] + Math.sin(t * 0.38 + i * 0.29) * 0.10;
    }
    particles.points.geometry.attributes.position.needsUpdate = true;
    particles.points.rotation.y = t * 0.055;

    renderer.render(scene, camera);
  }
  animate();
}

/* ─── Création du champ de particules ───────── */
function createParticles() {
  var COUNT   = 90;
  var pos     = new Float32Array(COUNT * 3);
  var colors  = new Float32Array(COUNT * 3);

  /* Palette brand */
  var palette = [
    [1, 0.47, 0.63],      /* rose   #ff79a1 */
    [0.75, 0.51, 0.99],   /* violet #c084fc */
    [0.38, 0.65, 0.98],   /* bleu   #60a5fa */
    [1,  0.72, 0.85],     /* rose clair */
    [0.87, 0.64, 1],      /* violet clair */
  ];

  for (var i = 0; i < COUNT; i++) {
    /* Distribution en ellipsoïde autour du modèle */
    var theta = Math.random() * Math.PI * 2;
    var phi   = Math.acos(2 * Math.random() - 1);
    var r     = 1.3 + Math.random() * 1.7;

    pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.cos(phi) * 0.52;
    pos[i*3+2] = r * Math.sin(phi) * Math.sin(theta) * 0.38;

    var c = palette[Math.floor(Math.random() * palette.length)];
    colors[i*3] = c[0]; colors[i*3+1] = c[1]; colors[i*3+2] = c[2];
  }

  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,    3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

  var mat = new THREE.PointsMaterial({
    size:          0.048,
    vertexColors:  true,
    transparent:   true,
    opacity:       0.72,
    sizeAttenuation: true,
  });

  return {
    points:        new THREE.Points(geo, mat),
    origPositions: pos.slice(),
    count:         COUNT,
  };
}
