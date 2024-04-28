import React, { useState, useEffect, useMemo } from "react";

const TreeComponent = ({ duration, isActive, isComplete }) => {
  const images = useMemo(
    () => ["flower-1.png", "flower-2.png", "flower-3.png"],
    []
  );
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    let interval;
    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setCurrentImage((currentImage) => {
          const currentIndex = images.indexOf(currentImage);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });
      }, duration / images.length);
    }

    if (isComplete) {
      clearInterval(interval);
      setCurrentImage("flower-3.png");
    }

    return () => clearInterval(interval);
  }, [isActive, duration, images, isComplete]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "180px",
        height: "180px",
      }}
    >
      {images.map((image, index) => (
        <img
          key={image}
          src={`${process.env.PUBLIC_URL}/${image}`}
          alt="flower"
          style={{
            position: "absolute",
            bottom: "0",
            height: "100%",
            opacity: currentImage === image ? 1 : 0,
            transition: "opacity 5s",
          }}
        />
      ))}
    </div>
  );
};

export default TreeComponent;
