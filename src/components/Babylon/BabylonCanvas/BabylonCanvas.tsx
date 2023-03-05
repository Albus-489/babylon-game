import { useEffect, useRef } from "react";
import BasicScene from "../BasicScene";
import styles from "./style.module.css";

export const BabylonCanvas: React.FC = () => {
  const babylonCanvas = useRef(null);
  useEffect(() => {
    const canvas = babylonCanvas.current!;
    new BasicScene(canvas);
  });

  return (
    <>
      <canvas className={styles.canvas} ref={babylonCanvas}></canvas>
    </>
  );
};
