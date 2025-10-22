"use client";

import Link from "next/link";
import ParticleBG from "../components/ParticleBG";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      {/* === HERO SECTION === */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Layer 1: Hero video (AI Hand → AHKStrategies grid) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        >
          <source src="/assets/ai_videos/robot-hand.mp4" type="video/mp4" />
        </video>

        {/* Layer 2: Subtle moving particle background */}
        <div className="absolute inset-0 z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-25 mix-blend-lighten"
          >
            <source src="/assets/ai_videos/background-o3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Layer 3: Particle effect */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <ParticleBG />
        </div>

        {/* Layer 4: Hero Text */}
        <div className="relative z-30 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-indigo-200 drop-shadow-[0_0_25px_rgba(120,120,255,0.7)] animate-[fadeIn_2s_ease-out]">
            AHKStrategies
          </h1>
          <p className="mt-6 text-2xl md:text-3xl font-medium text-indigo-300 tracking-wide animate-[fadeIn_3s_ease-out]">
            Where Vision Meets Human Intelligence
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6 animate-[fadeIn_4s_ease-out]">
            <Link
              href="/divisions"
              className="px-8 py-3 rounded-full bg-indigo-600/80 hover:bg-indigo-500/90 
                        text-white font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(120,120,255,0.6)] 
                        transition-all duration-500"
            >
              Explore Divisions
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 rounded-full bg-slate-700/80 hover:bg-slate-600/90 
                        text-white font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(150,150,255,0.5)] 
                        transition-all duration-500"
            >
              Discover Opportunities
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-purple-700/80 hover:bg-purple-600/90 
                        text-white font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(180,130,255,0.5)] 
                        transition-all duration-500"
            >
              Let’s Collaborate
            </Link>
          </div>
        </div>
      </section>

      {/* === SIX PILLARS SECTION === */}
      <section className="relative z-30 bg-transparent pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-indigo-300">
            Vision Pillars
          </h2>
          <div className="relative">
            {/* Import the Pillar grid */}
            {/* It will automatically pull from /components/HeroSection.tsx */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
