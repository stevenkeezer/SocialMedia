import { useEffect, useState } from "react";

export const useDefaultUserImage = (username: string) => {
  const [defaultUserImage, setDefaultUserImage] = useState<string>("");

  const generateColor = (username: string) => {
    const hash = username.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const color = Math.abs(hash) % 360;
    return `hsl(${color - 110}, 80%, 45%)`;
  };

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  ctx.fillStyle = generateColor(username);
  ctx.fillRect(0, 0, size, size);
  ctx.font = "44px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";

  ctx.fillText(username.slice(0, 2).toUpperCase(), size / 2, size / 2);

  useEffect(() => {
    console.log(generateColor(username));
    const data = canvas.toDataURL("image/png");
    setDefaultUserImage(data);
  }, [username]);

  console.log(defaultUserImage);
  return defaultUserImage;
};
