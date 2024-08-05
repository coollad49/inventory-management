"use client";
import { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import Image from "next/image";
import { Button } from "./ui/button";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
const AIModel = async (baseimg) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "Return a JSON structure based on the requirements of the user. only return the JSON structure, nothing else. Do not return ```json",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "create a json structure which contains the object or pastry or product name, description, category in the image for an inventory app. return only the JSON structure ",
          },
          {
            type: "image_url",
            image_url: {
              url: baseimg,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0];
};

const CameraModule = () => {
  const [productData, setProductData] = useState({});
  const camera = useRef(null);
  const handleCapture = async () => {
    const imageData = camera.current.takePhoto();
    const response = AIModel(imageData);
    setProductData(response);
    console.log(response);
    console.log(productData);
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
