"use client";
import Link from "next/link";

export default function Innovation() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/assets/backgrounds/innovation-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-32 space-y-10 bg-black/60">
        <h1 className="text-5xl font-bold text-indigo-300 drop-shadow-lg">
          Innovation
        </h1>
        <p className="max-w-4xl text-center text-indigo-100 text-lg leading-relaxed">
          Innovation is not about invention alone — it’s about reimagining what
          already exists. At <strong>AHKStrategies</strong>, we cultivate ideas
          that challenge conventions and turn possibility into practice.
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
