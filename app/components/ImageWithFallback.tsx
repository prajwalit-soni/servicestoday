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
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Box
      component="img"
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      sx={sx}
      style={style}
    />
  );
};

export default ImageWithFallback;
