import { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import Image from "next/image";
import { Button } from "./ui/button";

const CameraModule = () => {
  const camera = useRef(null);
  const handleCapture = async () => {
    const imageData = camera.current.takePhoto();
  };
  return (
    <div className="relative">
      <Camera ref={camera} aspectRatio={4 / 2} />
      <div className="absolute bottom-7 left-[50%] translate-x-[-50%] translate-y-[50%]">
        <Button onClick={handleCapture}>Take photo</Button>
      </div>
    </div>
  );
};

export default CameraModule;
