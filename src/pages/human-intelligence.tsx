"use client";
import React from "react";
import Link from "next/link";

export default function HumanIntelligence() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/assets/backgrounds/human-intelligence-base.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-32 space-y-10 bg-black/60">
        <h1 className="text-5xl font-bold text-indigo-300 drop-shadow-lg">
          Human Intelligence
        </h1>
        <p className="max-w-4xl text-center text-indigo-100 text-lg leading-relaxed">
          Human intelligence is not artificial — it’s authentic, intuitive, and
          ethical. It is the heartbeat of progress, the silent architect of
          innovation, and the compass that guides every intelligent system we
          build.
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
