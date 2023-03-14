import { useEffect, useRef, useState } from "react";
import BasicScene from "../BasicScene";
import styles from "./style.module.css";

export const BabylonCanvas: React.FC = () => {
  const babylonCanvas = useRef(null);
  const [basicScene] = useState<BasicScene>(new BasicScene());

  useEffect(() => {
    const canvas = babylonCanvas.current!;
    basicScene.start(canvas);
  });

  return (
    <>
      <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
    </>
  );
};
