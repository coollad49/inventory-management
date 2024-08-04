"use client";
import { useState, createContext, useContext } from "react";

const ImageContext = createContext();
function base64ToBlob(base64, mime) {
  const sliceSize = 512;
  const byteCharacters = atob(base64);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex++) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);
    const bytes = new Array(end - begin);

    for (let offset = begin, i = 0; offset < end; offset++, i++) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }

    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }

  return new Blob(byteArrays, { type: mime });
}
const ImageProvider = ({ children }) => {
  return <ImageContext.Provider>{children}</ImageContext.Provider>;
};

export { ImageContext, ImageProvider };
