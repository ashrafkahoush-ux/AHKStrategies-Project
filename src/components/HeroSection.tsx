"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/ai_videos/ai_hand_activation_v1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      {/* Optional Future Content (centered if added later) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        {/* <h1 className="text-5xl font-bold tracking-wide">AHKStrategies</h1> */}
        {/* <p className="mt-4 text-lg text-gray-200">Where Vision Meets Human Intelligence</p> */}
      </div>
    </section>
  );
}
