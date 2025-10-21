"use client";

import dynamic from "next/dynamic";
const Particles = dynamic(() => import("react-tsparticles"), { ssr: false });

export default function ParticleBG() {
  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 60 },
            color: { value: "#9b87f5" },
            links: { enable: true, color: "#9b87f5", distance: 150 },
            move: { enable: true, speed: 1 },
            size: { value: 2 },
            opacity: { value: 0.6 },
          },
        }}
      />
    </div>
  );
}
