"use client";
import React from "react";
import Link from "next/link";

export default function Legacy() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/assets/backgrounds/legacy-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-32 space-y-10 bg-black/60">
        <h1 className="text-5xl font-bold text-indigo-300 drop-shadow-lg">
          Legacy & Continuity
        </h1>
        <p className="max-w-4xl text-center text-indigo-100 text-lg leading-relaxed">
          Legacy is not what we leave behind — it’s what continues to grow
          because of what we’ve built. At <strong>AHKStrategies</strong>, we
          design systems that endure beyond generations — rooted in purpose,
          guided by progress.
        </p>
        <Link
          href="/"
          className="mt-10 text-indigo-200 underline hover:text-white transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
