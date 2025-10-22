"use client";

import Link from "next/link";
import ParticleBG from "../components/ParticleBG";
import Footer from "../components/Footer";

export default function HomePage() {
  const topRow = [
    {
      title: "Projects & Business Opportunities",
      mediaType: "video",
      media: "/assets/ai_videos/projects.mp4",
      href: "/projects",
    },
  ];

  const bottomRow = [
    { title: "Legacy", mediaType: "video", media: "/assets/ai_videos/legacy.mp4", href: "/legacy" },
    { title: "People", mediaType: "video", media: "/assets/ai_videos/people.mp4", href: "/people" },
    { title: "Innovation", mediaType: "video", media: "/assets/ai_videos/innovation.mp4", href: "/innovation" },
    { title: "Vision", mediaType: "video", media: "/assets/ai_videos/vision.mp4", href: "/vision" },
    {
      title: "Human Intelligence",
      mediaType: "image",
      media: "/assets/ai_images/pillars/human-intelligence.jpg",
      href: "/human-intelligence",
    },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-auto text-white bg-black">
      {/* Particle Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBG />
      </div>

      {/* Background Video Container */}
      <div className="relative z-10 w-[75vw] max-w-[1280px] aspect-video mx-auto mt-12 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(120,120,255,0.4)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-[1.03]"
        >
          <source src="/assets/ai_videos/hero-hand-final.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 py-16 space-y-12">
        <header className="text-center bg-transparent">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-indigo-200 drop-shadow-[0_0_12px_rgba(120,120,255,0.7)]">
            AHKStrategies
          </h1>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-indigo-400 tracking-wider drop-shadow-[0_0_8px_rgba(100,100,255,0.6)]">
            Vision Pillars
          </h2>
        </header>

        {/* Top Row - Projects */}
        <div className="flex justify-center w-full mb-16">
          {topRow.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative w-[60%] min-w-[350px] aspect-[16/9] overflow-hidden rounded-3xl border border-white/20 
              shadow-[0_0_25px_rgba(120,120,255,0.4)] hover:shadow-[0_0_45px_rgba(180,180,255,0.6)] 
              transition-all duration-500 hover:scale-[1.04]"
            >
              {item.mediaType === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <source src={item.media} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.media}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500 rounded-3xl"></div>
              <h3 className="absolute top-6 left-6 text-2xl font-semibold tracking-wide text-indigo-200 group-hover:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Bottom Row - Four Pillars */}
        <div className="flex justify-center flex-wrap gap-10 max-w-7xl w-[95%] mx-auto pb-20">
          {bottomRow.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group relative w-[22%] min-w-[230px] aspect-[16/9] overflow-hidden rounded-3xl border border-white/20 
              shadow-[0_0_15px_rgba(120,120,255,0.3)] hover:shadow-[0_0_35px_rgba(180,180,255,0.5)] 
              transition-all duration-500 hover:scale-[1.05]"
            >
              {pillar.mediaType === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <source src={pillar.media} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={pillar.media}
                  alt={pillar.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500 rounded-3xl"></div>
              <h3 className="absolute top-5 left-5 text-lg font-semibold tracking-wide text-indigo-200 group-hover:text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]">
                {pillar.title}
              </h3>
            </Link>
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}
