"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch("/api/assets?type=video&latest=true")
      .then(res => res.json())
      .then(d => setVideo(d[0]?.path || null))
      .catch(() => setVideo(null));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 20%, #0a001a, #000)",
      }}
    >
      {video && (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.9,
            filter: "brightness(0.85) contrast(1.1)",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,0,30,0.3), rgba(0,0,0,0.8))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.05, 1], opacity: 1 }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            color: "white",
            fontSize: "2.8rem",
            textAlign: "center",
            fontWeight: "700",
            textShadow: "0 0 20px rgba(255,255,255,0.6)",
          }}
        >
          AHKStrategies — Where Vision Becomes Intelligence
        </motion.h1>
      </div>
    </motion.div>
  );
}
