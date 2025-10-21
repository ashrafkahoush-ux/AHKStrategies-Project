"use client";
import React from "react";
import Link from "next/link";

export default function People() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/assets/backgrounds/people-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-32 space-y-10 bg-black/60">
        <h1 className="text-5xl font-bold text-indigo-300 drop-shadow-lg">
          People & Culture
        </h1>
        <p className="max-w-4xl text-center text-indigo-100 text-lg leading-relaxed">
          Behind every breakthrough are people who dare to dream. Our strength
          lies in the diversity of minds, the creativity of teams, and the
          collective drive to shape a smarter tomorrow.
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
