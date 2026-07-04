"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

type ImageWithFallbackProps = {
  src: string;
  fallback: string;
  alt: string;
  sx?: object;
  style?: React.CSSProperties;
};

const ImageWithFallback = ({
  src,
  fallback,
  alt,
  sx,
  style,
}: ImageWithFallbackProps) => {
  const getFullUrl = (url: string) => {
    if (!url) return "";
    if (
      url.startsWith("http") ||
      url.startsWith("data:") ||
      url.startsWith("/assets") ||
      url.startsWith("blob:")
    ) {
      return url;
    }
    const backendUrl = "https://shoptera-backend.onrender.com";
    return `${backendUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const [imgSrc, setImgSrc] = useState(getFullUrl(src));

  useEffect(() => {
    setImgSrc(getFullUrl(src));
  }, [src]);

  return (
    <Box
      component="img"
      src={imgSrc || fallback || undefined}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      sx={sx}
      style={style}
    />
  );
};

export default ImageWithFallback;
