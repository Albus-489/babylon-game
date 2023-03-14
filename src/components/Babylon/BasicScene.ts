import * as BABYLON from "@babylonjs/core";

export default class BasicScene {
  private scene?: BABYLON.Scene;
  private engine?: BABYLON.Engine;
  private uvScale: number = 2;

  start(canvas: HTMLCanvasElement) {
    if (this.engine) return;
    this.engine = new BABYLON.Engine(canvas);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene?.render();
    });
  }

  createScene(): BABYLON.Scene {
    const scene = new BABYLON.Scene(this.engine!);
    const camera: BABYLON.UniversalCamera = new BABYLON.UniversalCamera(
      "camera", //node name
      new BABYLON.Vector3(0, 1, -5), //target
      scene // attach the camera to the scene
    );
    camera.attachControl(); //connect camera to the peripheral

    const light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
      "light",
      new BABYLON.Vector3(1, -1, 0),
      scene
    );

    const ground: BABYLON.GroundMesh = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10, subdivisions: 100, updatable: true },
      scene
    );
    ground.applyDisplacementMap("/textures/park_sand_disp_1k.png", 0, 0.3);
    ground.material = this.createGroundMaterial();

    const ball: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere(
      "ball",
      { diameter: 2 },
      scene
    );
    ball.position.y = 1;

    return scene;
  }

  createGroundMaterial(): BABYLON.StandardMaterial {
    const groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
    const textureArray: Array<BABYLON.Texture> = [];

    const diffuseTex = new BABYLON.Texture(
      "/textures/park_sand_diff_1k.png",
      this.scene
    );
    groundMaterial.diffuseTexture = diffuseTex;
    textureArray.push(diffuseTex);

    const AOTex = new BABYLON.Texture(
      "/textures/park_sand_ao_1k.png",
      this.scene
    );
    groundMaterial.ambientTexture = AOTex;
    textureArray.push(AOTex);

    const normalTex = new BABYLON.Texture(
      "/textures/park_sand_nor_gl_1k.png",
      this.scene
    );
    groundMaterial.bumpTexture = normalTex;
    textureArray.push(normalTex);
    groundMaterial.invertNormalMapX = true;
    groundMaterial.invertNormalMapY = true;

    const roughTex = new BABYLON.Texture(
      "/textures/park_sand_rough_1k.png",
      this.scene
    );
    groundMaterial.useGlossinessFromSpecularMapAlpha = true;
    groundMaterial.specularTexture = roughTex;
    textureArray.push(normalTex);
    groundMaterial.specularPower = 1000;

    for (let i = 0; i < textureArray.length; i++) {
      textureArray[i].uScale = this.uvScale;
      textureArray[i].vScale = this.uvScale;
    }

    return groundMaterial;
  }

  // createBallMaterial(){

  // }
}
