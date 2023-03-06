import * as BABYLON from "@babylonjs/core";

export default class BasicScene {
  private scene: BABYLON.Scene;
  private engine: BABYLON.Engine;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createScene(): BABYLON.Scene {
    const scene = new BABYLON.Scene(this.engine);
    const camera: BABYLON.UniversalCamera = new BABYLON.UniversalCamera(
      "camera", //node name
      new BABYLON.Vector3(0, 1, -5), //target
      this.scene
    );
    camera.attachControl(); //connect camera to the peripheral

    const ground: BABYLON.GroundMesh = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10, subdivisions: 20 },
      this.scene
    );

    const ball: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere(
      "ball",
      { diameter: 2 },
      this.scene
    );
    ball.position.y = 1;

    const light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
      "light",
      new BABYLON.Vector3(1, -1, 0),
      this.scene
    );
    return scene;
  }
}
