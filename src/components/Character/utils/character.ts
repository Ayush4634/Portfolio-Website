import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "./models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Colorize based on node name
                const name = child.name || "";

                // Skin color - 0xffcca8 (light peach skin tone)
                // Face = Plane007, Ear = Ear001, Hand, Neck
                if (
                  name.includes("Ear") ||
                  name.includes("Hand") ||
                  name.includes("Neck") ||
                  name === "Plane007" // Face mesh (exact match to avoid other Plane nodes)
                ) {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.color.setHex(0xffcca8);
                  mesh.material = mat;
                }

                // T-shirt to grey
                if (name.includes("SHIRT")) {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.color.setHex(0x808080);
                  mesh.material = mat;
                }

                // Jeans to black
                if (name.includes("Pant")) {
                  const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
                  mat.color.setHex(0x1a1a1a); // dark charcoal black
                  mesh.material = mat;
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
