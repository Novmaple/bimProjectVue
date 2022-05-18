<template>
  <div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      let scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      let renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const aspect = window.innerWidth / window.innerHeight;
      let camera = new THREE.PerspectiveCamera(60, aspect, 0.01, 5000);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", renderer);

      // light
      const ambientLight = new THREE.AmbientLight(0xaaaaaa, 20);
      scene.add(ambientLight);

      const loader = new GLTFLoader();
      loader.load(
        "/static/3Dmodel/bim_-_cosari_romania/scene.gltf",
        (result) => {
          scene.add(result.scene);
          animate();
        }
      );
      const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
    },
  },
};
</script>

<style scoped>
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>