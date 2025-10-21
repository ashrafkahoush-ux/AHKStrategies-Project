"use client";
import React from "react";
import Link from "next/link";

export default function Vision() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/assets/backgrounds/vision-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-32 space-y-10 bg-black/60">
        <h1 className="text-5xl font-bold text-indigo-300 drop-shadow-lg">
          Vision & Foresight
        </h1>
        <p className="max-w-4xl text-center text-indigo-100 text-lg leading-relaxed">
          “An alliance between intuition and computation — the symphony of
          humanity and intelligence — is what the next era of creation will be
          built upon.”
        </p>
        <p className="max-w-4xl text-center text-indigo-100 text-lg leading-relaxed">
          At <strong>AHKStrategies</strong>, our vision is not to chase trends
          but to design the frameworks that create them — bridging human
          intuition with digital intelligence.
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
