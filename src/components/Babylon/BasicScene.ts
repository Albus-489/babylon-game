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
      new BABYLON.Vector3(0, 5, -10), //target
      this.scene
    );
    camera.attachControl(); //connect camera to the peripheral
    return scene;
  }
}
